---
title: Istio Ambient + Waypoint (L7) & ztunnel (L4) စမ်းသပ်ခြင်း Runbook
date: 2026-01-28
excerpt: KIND v1.35 ပေါ်မှာ Istio Ambient Mode ဖြင့် Bookinfo ကို တည်ဆောက်ပြီး Waypoint L7 routing နဲ့ ztunnel L4 policy စမ်းသပ်ခဲ့သည့် လုပ်ငန်းစဉ်အပြည့်အစုံ။
---

# Istio Ambient + Waypoint (L7) & ztunnel (L4) စမ်းသပ်ခြင်း Runbook

ဒီပို့စ်မှာ KIND v1.35 cluster ပေါ်မှာ **Istio Ambient Mode** ကိုတင်၊ **Bookinfo** app ကိုသွင်းပြီး
**Waypoint (L7)** နဲ့ **ztunnel (L4)** traffic behavior ကို စမ်းသပ်ခဲ့တဲ့ လုပ်ငန်းစဉ်ကို အပြည့်အစုံ ရေးထားပါတယ်။

> အဓိကရည်ရွယ်ချက်:
> - **L7 (HTTP)** routing ကို Waypoint နဲ့ ထိန်းချုပ်နိုင်တာကို ပြသခြင်း
> - **L4 policy** ကို ztunnel နဲ့ enforce လုပ်နိုင်တာကို စမ်းသပ်ခြင်း

---

## 1) Cluster & Istio အခြေအနေ
- **Cluster**: kind-135 (Kubernetes v1.35.0)
- **Istio**: 1.28.3, **ambient profile**
- **Bookinfo Namespace**: `bookinfo`
- **Addons**: Kiali + Prometheus
- **MetalLB IP Pool**: `172.18.255.200-172.18.255.219`

---

## 2) Istio Ambient Mode တင်ခြင်း
```bash
/home/winyan/clawd/istio-1.28.3/bin/istioctl install \
  --set profile=ambient -y \
  --context kind-135
```

Istio core, CNI, ztunnel တွေ Ready ဖြစ်တာကို စစ်ရန်:
```bash
kubectl --context kind-135 -n istio-system get pods
```

---

## 3) Bookinfo ထည့်ခြင်း
```bash
kubectl --context kind-135 create namespace bookinfo
kubectl --context kind-135 -n bookinfo apply -f \
  /home/winyan/clawd/istio-1.28.3/samples/bookinfo/platform/kube/bookinfo.yaml
```

Ambient Mode ကို namespace ပေါ်မှာ enable လုပ်:
```bash
kubectl --context kind-135 label namespace bookinfo \
  istio.io/dataplane-mode=ambient --overwrite
```

---

## 4) LoadBalancer အတွက် MetalLB IP Pool ပြင်ဆင်ခြင်း
Bookinfo `productpage` ကို LoadBalancer အဖြစ်ပြောင်းလိုက်ချိန်မှာ EXTERNAL-IP `<pending>` ဖြစ်နေတာကို
MetalLB IP pool မရှိလို့ဖြစ်ပါတယ်။ အောက်က YAML ဖြင့် IP pool ကို ဖန်တီးလိုက်ပါတယ်။

```bash
kubectl --context kind-135 apply -f - <<'EOF'
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: example
  namespace: metallb-system
spec:
  addresses:
  - 172.18.255.200-172.18.255.219
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: empty
  namespace: metallb-system
EOF
```

Productpage LoadBalancer:
```bash
kubectl --context kind-135 -n bookinfo patch svc productpage \
  -p '{"spec":{"type":"LoadBalancer"}}'
```

---

## 5) LAN မှာ ဝင်ရန် Port‑Forward
MetalLB IP က Docker network ဖြစ်လို့ LAN ကနေ မရောက်နိုင်ပါ။
`--address 0.0.0.0` နဲ့ port-forward လုပ်ပါတယ်။

```bash
kubectl --context kind-135 -n bookinfo port-forward --address 0.0.0.0 svc/productpage 9080:9080
kubectl --context kind-135 -n istio-system port-forward --address 0.0.0.0 svc/kiali 20001:20001
```

- Productpage: `http://192.168.18.41:9080/productpage`
- Kiali: `http://192.168.18.41:20001`

---

# ✅ L7 Waypoint စမ်းသပ်ချက် (User Based Routing)

**ရည်ရွယ်ချက်:**
- `?u=normal` သုံးတဲ့ user ကို **reviews-v2 (black stars)** သာပို့ချင်
- `?u=test` သုံးတဲ့ user ကို **reviews-v1 (no stars)** ပို့ချင်

### 1) Gateway API CRDs တင်
```bash
kubectl --context kind-135 apply -k \
  "github.com/kubernetes-sigs/gateway-api/config/crd?ref=v1.0.0"
```

### 2) Waypoint ဖန်တီးပြီး reviews service ကို attach
```bash
/home/winyan/clawd/istio-1.28.3/bin/istioctl waypoint apply \
  -n bookinfo --name reviews-waypoint --context kind-135

kubectl --context kind-135 -n bookinfo label svc reviews \
  istio.io/use-waypoint=reviews-waypoint --overwrite
```

### 3) reviews-v1 / reviews-v2 services ဖန်တီး
```bash
kubectl --context kind-135 apply -f - <<'EOF'
apiVersion: v1
kind: Service
metadata:
  name: reviews-v1
  namespace: bookinfo
spec:
  ports:
  - port: 9080
    name: http
  selector:
    app: reviews
    version: v1
---
apiVersion: v1
kind: Service
metadata:
  name: reviews-v2
  namespace: bookinfo
spec:
  ports:
  - port: 9080
    name: http
  selector:
    app: reviews
    version: v2
EOF
```

### 4) HTTPRoute ဖြင့် `end-user` header ကို route ခွဲခြင်း
Bookinfo က query param `?u=<name>` ကို `end-user` header အဖြစ်ပို့တယ်။

```bash
kubectl --context kind-135 apply -f - <<'EOF'
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: reviews-by-user
  namespace: bookinfo
spec:
  parentRefs:
  - name: reviews
    kind: Service
    group: ""
  rules:
  - matches:
    - headers:
      - name: end-user
        value: normal
    backendRefs:
    - name: reviews-v2
      port: 9080
      weight: 100
  - backendRefs:
    - name: reviews-v1
      port: 9080
      weight: 100
EOF
```

### ✅ Test
- **Normal user (black stars)**
  `http://192.168.18.41:9080/productpage?u=normal`
- **Test user (no stars)**
  `http://192.168.18.41:9080/productpage?u=test`

---

# ✅ L4 ztunnel စမ်းသပ်ချက် (AuthorizationPolicy)

ztunnel က **L4 policy** ကို enforce လုပ်ပေးနိုင်ပါတယ်။
အောက်က policy က reviews service ကို **productpage** မှသာ access ခွင့်ပေးပါတယ်။

```bash
kubectl --context kind-135 apply -f - <<'EOF'
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: reviews-l4-only-productpage
  namespace: bookinfo
spec:
  selector:
    matchLabels:
      app: reviews
  action: ALLOW
  rules:
  - from:
    - source:
        principals:
        - cluster.local/ns/bookinfo/sa/bookinfo-productpage
EOF
```

### ✅ Test
```bash
kubectl --context kind-135 -n bookinfo exec deploy/details-v1 -c details -- \
  curl -sS http://reviews:9080/reviews/1
```
Expected: **deny** (403/connection failure)

> L7 policy များကို Waypoint မရှိပဲ apply လုပ်ရင် ztunnel က fail‑safe DENY လုပ်နိုင်ပါတယ်။

---

## Kiali မှာ စစ်ဆေးရန်
Kiali: `http://192.168.18.41:20001`

- ztunnel workload → **Ztunnel tab** (ztunnel config ကြည့်ရန်)
- waypoint workload → **Waypoint/L7 routing info**
- Graph တွင် Ambient + Waypoint အမြင် စစ်နိုင်

---

## နိဂုံးချုပ်
ဒီစမ်းသပ်မှုက **Ambient Mode + Waypoint** ဖြင့် L7 routing လုပ်နိုင်ခြင်းနဲ့
**ztunnel L4 policy** တို့ကို စနစ်တကျ စမ်းသပ်ပြခဲ့ပါတယ်။

နောက်ထပ် စမ်းသပ်ချင်တာများရှိရင် ပြောပါ 🙌
