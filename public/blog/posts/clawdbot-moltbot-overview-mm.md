---
title: Moltbot/Clawdbot ဆိုတာဘာလဲ? (Burmese အကျဉ်းချုပ်)
date: 2026-01-29
excerpt: Moltbot (Clawdbot) အကြောင်းကို docs.molt.bot မှ ဖတ်ပြီး Burmese နဲ့ သဘာဝကျ ပြန်လည်ရှင်းပြထားတဲ့ အကျဉ်းချုပ်ပါ။
---

# Moltbot / Clawdbot ကို Burmese နဲ့နားလည်အောင်

ဒီပို့စ်မှာ **docs.molt.bot** ကို reference လုပ်ပြီး Moltbot (Clawdbot) ကို Burmese နဲ့ သဘာဝကျ ရှင်းပြထားပါတယ်။

---

## Moltbot (Clawdbot) ဆိုတာဘာလဲ?
Moltbot က **WhatsApp / Telegram / Discord / iMessage** စတာတွေကို **Gateway တစ်ခုတည်း**ကနေ ချိတ်ဆက်ပြီး AI agent (ဥပမာ Pi) နဲ့ အလုပ်လုပ်နိုင်အောင် ပြုလုပ်ပေးတဲ့ system ပါ။

အတိုချုပ်ပြောရမယ်ဆိုရင်:
- သင် messaging app ထဲကနေ **စာပို့လိုက်ရုံ**နဲ့
- AI agent က **ပြန်ဖြေ/လုပ်ဆောင်**ပေးနိုင်တဲ့ framework ပါ။

Moltbot က Clawd (space‑lobster assistant) ကိုလည်း power လုပ်နေတဲ့ backend ဖြစ်ပါတယ်။

---

## Architecture အကြမ်းဖျင်း
**Gateway** က အဓိကပဲ — channel တွေ (WhatsApp/Telegram/etc.) အားလုံးကို ဒီ process တစ်ခုက ကိုင်ထားတယ်။

```
Messaging Apps
   │
   ▼
Gateway (moltbot gateway)
   │
   ├─ Pi agent (RPC)
   ├─ Web UI / Dashboard
   ├─ iOS/Android nodes
   └─ CLI tools
```

အဓိက concept က **“One Gateway per host”** ဖြစ်တယ်။
WhatsApp Web session ကို တစ်ခုတည်းဖြင့် ထိန်းချုပ်ထားလို့ stable ဖြစ်ပါတယ်။

---

## အဓိက Features (အကျဉ်းချုပ်)
- 📱 WhatsApp integration (Baileys)
- ✈️ Telegram bot (grammY)
- 🎮 Discord bot (channels.discord.js)
- 💬 iMessage (imsg CLI)
- 🧩 Plugins (Mattermost လို service တွေ)
- 🧠 Multi‑agent routing (user/agent ခွဲခြားနိုင်)
- 💬 Sessions management (DM/group ခွဲခြား)
- 📎 Media support (images/audio/docs)
- 🖥️ Dashboard UI (Control UI)
- 📱 iOS/Android node support (Canvas + Camera)

---

## Quick Start (အကျဉ်းချုပ်)
```bash
npm install -g moltbot@latest
moltbot onboard --install-daemon
moltbot channels login  # WhatsApp QR
moltbot gateway --port 18789
```

Dashboard (local):
```
http://127.0.0.1:18789/
```

---

## Network Model အကြောင်း
- Gateway သည် **loopback-first** (127.0.0.1) ဖြစ်ပြီး default အနေနဲ့ local machine ပေါ်မှာ run လုပ်တယ်
- Remote access ကို **SSH tunnel** သို့ **Tailnet/VPN** နဲ့ ထိန်းချုပ်နိုင်တယ်
- Nodes (iOS/Android) က Gateway WebSocket ကို pair လုပ်ပြီး connect လုပ်တယ်

---

## ဘာကြောင့် အသုံးဝင်လဲ?
- **One inbox**: messaging app မျိုးစုံကို AI agent တစ်ခုနဲ့ ချိတ်နိုင်
- **Automations**: reminders, workflows, tooling integrations
- **Multi‑agent**: လူအရေအတွက် (သို့) project အလိုက် agent များ ခွဲနိုင်
- **Portability**: iOS/Android nodes, web UI အားလုံးပါ

---

## နိဂုံးချုပ်
Moltbot (Clawdbot) က **messaging platform အားလုံးကို AI agent နဲ့ bridge လုပ်ပေးတဲ့ gateway** လို ဖြစ်ပါတယ်။
အလုပ်ခက်ခဲမှုတွေကို message တစ်ကြောင်းပဲ ပို့လို့ ပြီးမြောက်နိုင်တဲ့ အားသာချက်ရှိပြီး,
DevOps/Automation အတွက် အသုံးဝင်တဲ့ tool တစ်ခုပါ။

ပိုပြီးလေ့လာချင်ရင် docs.molt.bot ကို တိုက်ရိုက်သွားဖတ်နိုင်ပါတယ်။
