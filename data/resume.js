// Single source of truth for résumé content.
// Used by the About app, the /about page, Terminal, Files app and the TARS chatbot context.
// CommonJS so build scripts (node scripts/*.js) can require it as well as the Next.js app.

const profile = {
    name: "Win Yan Naing Htut",
    username: "winyan",
    title: "Cloud & DevOps Engineer | Platform Automation",
    shortTitle: "Cloud & DevOps Engineer",
    location: "Singapore",
    yearsOfExperience: "9+",
    summary: "Cloud & DevOps Engineer with 9+ years of IT experience, combining AWS infrastructure engineering in Singapore GCC/GCC+ environments with a strong enterprise networking foundation. Deliver Terraform-based infrastructure automation, GitLab CI/CD, IAM/OIDC integration, cloud security and operational monitoring. CNCF Kubestronaut with independent Kubernetes, HCP Vault/Boundary and policy-as-code platform projects."
};

const links = {
    email: "winyannainghtut98@gmail.com",
    linkedin: "https://www.linkedin.com/in/wynh/",
    gitlab: "https://gitlab.com/winyannainghtut",
    github: "https://github.com/winyannainghtut",
    portfolio: "https://portfolio.winyan.dev",
    resume: "./files/WinYanNaingHtut_2026.pdf"
};

const gitlabRepoUrl = (repo) => `${links.gitlab}/${repo}`;

// About Me cards: each card is a list of text segments; `strong` / `highlight` style a segment
const aboutCards = [
    {
        icon: "☁️",
        segments: [
            { text: "Cloud & DevOps Engineer", strong: true },
            { text: " with 9+ years of IT experience, combining AWS infrastructure engineering in Singapore GCC/GCC+ environments with a strong enterprise networking foundation." }
        ]
    },
    {
        icon: "💼",
        segments: [
            { text: "Currently a Cloud Engineer at " },
            { text: "NCS PTE Ltd (Singapore)", highlight: true },
            { text: ", delivering Terraform-based infrastructure automation, GitLab CI/CD, IAM/OIDC integration, cloud security and operational monitoring." }
        ]
    },
    {
        icon: "🏅",
        segments: [
            { text: "CNCF Kubestronaut", strong: true },
            { text: " (CKA, CKAD, CKS, KCNA, KCSA), AWS Certified DevOps Engineer – Professional, AWS Solutions Architect – Associate, HashiCorp Terraform Associate and Cisco CCNP Enterprise." }
        ]
    },
    {
        icon: "🧪",
        segments: [
            { text: "I also build independent platform projects — Kubernetes, HCP Vault/Boundary and policy-as-code with OPA/Rego. Check out the Projects section!" }
        ]
    }
];

const experiences = [
    {
        id: "cloud-engineer-ncs",
        title: "Cloud Engineer",
        company: "NCS PTE Ltd (Contract via Avensys Consulting)",
        location: "Singapore",
        start: "2024-01",
        end: null,
        period: "Jan 2024 – Present",
        current: true,
        highlights: [
            "Operate AWS infrastructure in Singapore GCC/GCC+ environments, including VPC, load balancers, VPC endpoints, API Gateway, WAF, IAM and CloudWatch",
            "Develop Terraform modules for CSV-driven Security Group/NACL rules in GCC+, with remote state and Git-based version control",
            "Engineered AWS ACM and GitLab CI/CD certificate lifecycle workflows for 12 public-facing and intranet applications across UAT and production, including ALB-attached TLS certificates and SHIP-HATS/GovTech CTS automation",
            "Built EventBridge-triggered GitLab/Ansible certificate rotation for 197 Windows IIS and Linux Nginx servers, using IAM role-authorized ACM exports, PFX conversion, IIS binding updates and resource-group-specific child pipelines",
            "Provision Terraform-managed GitLab Runners and AWS CLI/Terraform container images for infrastructure CI/CD pipelines",
            "Configure IAM Identity Center (SSO) and GitLab OIDC trust for secure, automated AWS deployments",
            "Integrate API Gateway, Lambda and Nginx reverse proxy for partner agency APIs; configure CloudWatch/SNS alerts and StackOps (ELK/Kibana) monitoring",
            "Manage AWS WAF, Trend Micro Vision One and EC2-hosted Fortinet firewalls with FortiManager/FortiAnalyzer"
        ]
    },
    {
        id: "infra-engineer-gain-city",
        title: "Infra Engineer",
        company: "Gain City Electronic PTE Ltd",
        location: "Singapore",
        start: "2023-02",
        end: "2023-12",
        period: "Feb 2023 – Dec 2023",
        highlights: [
            "Maintained hybrid AWS/on-premises connectivity via Direct Connect; diagnosed VPC routing, firewall, load-balancer and application access issues",
            "Operated L2/L3 enterprise networks, Fortinet firewalls, Secure SD-WAN, Active Directory and Darktrace NDR",
            "Maintained NetBox/Cacti/Zabbix inventory and monitoring, plus operational documentation"
        ]
    },
    {
        id: "network-engineer-frontiir",
        title: "Network Engineer",
        company: "Frontiir Co., Ltd.",
        location: "Yangon, Myanmar",
        start: "2021-04",
        end: "2023-01",
        period: "Apr 2021 – Jan 2023",
        highlights: [
            "Designed IP addressing and implemented BGP, MPLS, OSPF and IS-IS across Cisco, Juniper and Extreme networks, including carrier-grade NAT infrastructure",
            "Implemented TACACS+/AAA access controls, led regional network migrations and maintained HLD/LLD, MOP and SOP documentation"
        ]
    },
    {
        id: "internet-core-engineer-mytel",
        title: "Internet Core Engineer",
        company: "Mytel Myanmar",
        location: "Yangon, Myanmar",
        start: "2020-07",
        end: "2021-02",
        period: "Jul 2020 – Feb 2021",
        highlights: [
            "Troubleshot fixed-broadband core networks and supported BRAS/OLT deployments across Juniper, Huawei and ZTE platforms; maintained monitoring and operational procedures"
        ]
    },
    {
        id: "associate-network-engineer-frontiir",
        title: "Associate Network Engineer",
        company: "Frontiir Co., Ltd.",
        location: "Yangon, Myanmar",
        start: "2018-05",
        end: "2020-06",
        period: "May 2018 – Jun 2020",
        highlights: [
            "Configured distribution/access networks and OSPF/IS-IS on Linux-based routers; resolved network faults and supported new township deployments"
        ]
    },
    {
        id: "assistant-network-engineer-frontiir",
        title: "Assistant Network Engineer",
        company: "Frontiir Co., Ltd.",
        location: "Yangon, Myanmar",
        start: "2017-04",
        end: "2018-05",
        period: "Apr 2017 – May 2018",
        highlights: [
            "Installed switches, routers, wireless links and public Wi-Fi systems using Ubiquiti, Ruckus and Cambium devices; maintained network documentation"
        ]
    }
];

const projects = [
    {
        title: "Boundary Worker Autoscaling on Kubernetes",
        description: "Designed a Datadog-driven Kubernetes HPA/StatefulSet PoC for HCP Boundary workers. Automated worker registration and scale-in deregistration using Vault Kubernetes authentication and pod lifecycle hooks.",
        repo: "boundary-k8s-autoscaling-poc"
    },
    {
        title: "HCP Terraform VCS & OPA Policy Guardrails",
        description: "Built GitLab-linked HCP Terraform workspaces with remote-state dependencies and run triggers; authored OPA/Rego rules for EC2 sizing, subnet CIDRs, and Security Group/NACL configuration with test fixtures.",
        repo: "tf-vcs"
    },
    {
        title: "ECS Fargate, VPC Lattice & Envoy mTLS",
        description: "Created Terraform for ECS Fargate services connected via VPC Lattice TLS passthrough and Envoy sidecar mTLS, integrating ACM Private CA, AWS Secrets Manager, SSM Parameter Store and private DNS.",
        repo: "tf-ecs"
    },
    {
        title: "GitLab CI + Ansible: Vault SSH CA Trust",
        description: "Automated deployment of Vault SSH CA trust and TrustedUserCAKeys to private Linux targets using an in-cluster GitLab Runner and Ansible, including idempotent updates, sshd validation and deployment checks.",
        repo: "ansible-lab"
    }
];

const moreLabs = [
    { title: "EKS infrastructure with Terraform", repo: "eks-terraform" },
    { title: "Kong API Gateway on EKS", repo: "eks-kong-apigw" },
    { title: "HCP Vault Dedicated on AWS", repo: "hcp-aws-vault-dedicated-cluster" }
];

// `badge` image URLs come from each Credly badge's Open Badges metadata
const certifications = [
    {
        id: "kubestronaut",
        title: "CNCF Kubestronaut",
        subtitle: "Includes CKA, CKAD, CKS, KCNA, KCSA",
        org: "Cloud Native Computing Foundation",
        featured: true,
        tag: "★ All 5 Kubernetes Certifications!",
        link: "https://www.credly.com/badges/45647b96-2c2b-4a83-ad6d-785a518f7447",
        badge: "https://images.credly.com/images/cd6c6449-6814-4613-a2d3-13cf4ac5be4f/image.png"
    },
    {
        id: "aws-devops-pro",
        title: "AWS Certified DevOps Engineer – Professional",
        org: "Amazon Web Services (AWS)",
        link: "https://www.credly.com/badges/7c5b9f4d-0404-4ae6-8afb-d47b5ce0b64a",
        badge: "https://images.credly.com/images/bd31ef42-d460-493e-8503-39592aaf0458/image.png"
    },
    {
        id: "aws-saa",
        title: "AWS Certified Solutions Architect – Associate",
        org: "Amazon Web Services (AWS)",
        link: "https://www.credly.com/badges/60a9411e-2b4d-4e2e-9289-493873092b3e",
        badge: "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
    },
    {
        id: "terraform-associate",
        title: "HashiCorp Certified: Terraform Associate (003)",
        org: "HashiCorp",
        link: "https://www.credly.com/badges/2f155a8d-f50e-4f05-859a-941168083eb0",
        badge: "https://images.credly.com/images/0dc62494-dc94-469a-83af-e35309f27356/blob"
    },
    {
        id: "cka",
        title: "CKA: Certified Kubernetes Administrator",
        org: "The Linux Foundation",
        link: "https://www.credly.com/badges/0e1cfe79-4b8a-46b7-8354-80a7476772d9",
        badge: "https://images.credly.com/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png"
    },
    {
        id: "ckad",
        title: "CKAD: Certified Kubernetes Application Developer",
        org: "The Linux Foundation",
        link: "https://www.credly.com/badges/75574523-1bd7-4dfa-9cf4-f3680df2cd98",
        badge: "https://images.credly.com/images/cc8adc83-1dc6-4d57-8e20-22171247e052/blob"
    },
    {
        id: "cks",
        title: "CKS: Certified Kubernetes Security Specialist",
        org: "The Linux Foundation",
        link: "https://www.credly.com/badges/441015bc-92a7-4bdf-8394-7fd6bbfa74a7",
        badge: "https://images.credly.com/images/9945dfcb-1cca-4529-85e6-db1be3782210/kubernetes-security-specialist-logo2.png"
    },
    {
        id: "kcna",
        title: "KCNA: Kubernetes and Cloud Native Associate",
        org: "The Linux Foundation",
        link: "https://www.credly.com/badges/20eaa565-273f-4f81-b0dc-761caf55df99",
        badge: "https://images.credly.com/images/f28f1d88-428a-47f6-95b5-7da1dd6c1000/KCNA_badge.png"
    },
    {
        id: "kcsa",
        title: "KCSA: Kubernetes and Cloud Native Security Associate",
        org: "The Linux Foundation",
        link: "https://www.credly.com/badges/faeb5e3f-e270-4072-a3cb-31a6852f21db",
        badge: "https://images.credly.com/images/67dd8a95-8876-4051-9cb9-3d97c204f85a/image.png"
    },
    {
        id: "ccnp-enterprise",
        title: "Cisco CCNP Enterprise",
        subtitle: "Includes ENCOR & ENARSI",
        org: "Cisco",
        link: "https://www.credly.com/badges/b43a52a9-8f21-4508-9a90-6e8c9f969de2",
        badge: "https://images.credly.com/images/07f70c56-f067-458e-bbe5-736f055f0cce/linkedin_thumb_CCNP_Enterprise_large.png"
    },
    {
        id: "cisco-specialist-enterprise-core",
        title: "Cisco Certified Specialist – Enterprise Core",
        subtitle: "ENCOR",
        org: "Cisco",
        link: "https://www.credly.com/badges/37710967-29c3-466b-9eee-50a9b36199bc",
        badge: "https://images.credly.com/images/e544ac8f-cd4e-4262-9de1-1174680b3bb4/blob"
    },
    {
        id: "cisco-specialist-enterprise-advanced-infrastructure",
        title: "Cisco Certified Specialist – Enterprise Advanced Infrastructure",
        subtitle: "ENARSI",
        org: "Cisco",
        link: "https://www.credly.com/badges/3c447397-0189-4563-9be5-fec0c06054de",
        badge: "https://images.credly.com/images/79bdda6a-bac2-4549-805c-2c3b3c2d2c44/blob"
    },
    {
        id: "ccna",
        title: "Cisco Certified Network Associate (CCNA)",
        subtitle: "Routing and Switching",
        org: "Cisco",
        link: "https://www.credly.com/badges/9f2034db-b590-48a2-99b1-7db88e31aa6a",
        badge: "https://images.credly.com/images/a31c0301-ff96-4cee-9435-0a4b40ce6e66/cisco_ccna_R_26S.png"
    }
];

const education = [
    {
        id: "msc-cyber-security",
        title: "Master of Science (MSc) in Cyber Security",
        school: "University of West London, UK · Aventis School of Management, Singapore",
        period: "Mar 2025 – Jul 2026",
        tag: "Part-time"
    },
    {
        id: "ba-english",
        title: "Bachelor of Arts (BA) in English",
        school: "Yangon University of Distance Education, Myanmar",
        period: "2014 – 2018"
    }
];

const skillCategories = [
    {
        id: "aws-and-cloud",
        title: "AWS & Cloud",
        icon: "☁️",
        skills: ["GCC/GCC+", "EC2", "VPC", "ALB/NLB", "API Gateway", "VPC endpoints", "S3", "WAF", "CloudWatch", "ACM", "EventBridge"]
    },
    {
        id: "iac-and-cicd",
        title: "IaC & CI/CD",
        icon: "🏗️",
        skills: ["Terraform", "Reusable modules", "Remote state", "GitLab CI/CD", "SHIP-HATS", "GitLab Runners", "OIDC", "Ansible"]
    },
    {
        id: "platform-labs",
        title: "Platform (labs)",
        icon: "☸️",
        skills: ["Kubernetes", "EKS", "ECS/Fargate", "Docker", "Helm", "HPA", "Kong Gateway API", "VPC Lattice", "Envoy"]
    },
    {
        id: "security-and-governance",
        title: "Security & Governance",
        icon: "🔐",
        skills: ["IAM Identity Center (SSO)", "Security Groups/NACLs", "Fortinet", "Vault/Boundary (labs)", "PKI", "OPA/Rego (labs)"]
    },
    {
        id: "observability-and-ops",
        title: "Observability & Ops",
        icon: "📈",
        skills: ["CloudWatch", "SNS", "StackOps (ELK/Kibana)", "Datadog (labs)", "Zabbix", "NetBox", "Bash", "PowerShell"]
    },
    {
        id: "network-engineering",
        title: "Network Engineering",
        icon: "🌐",
        skills: ["Cisco", "Juniper", "BGP", "MPLS", "OSPF", "IS-IS", "Routing", "SD-WAN", "FortiManager", "FortiAnalyzer"]
    }
];

/**
 * Plain-text résumé, used by `cat resume.txt` in the Terminal and as the TARS chatbot context.
 */
function resumeToText() {
    const lines = [];
    lines.push(profile.name.toUpperCase(), profile.title, `${profile.location} · ${links.email}`, "");
    lines.push("PROFILE", profile.summary, "");
    lines.push("EXPERIENCE");
    experiences.forEach((exp) => {
        lines.push(`${exp.title} — ${exp.company}, ${exp.location} (${exp.period})`);
        exp.highlights.forEach((h) => lines.push(`  - ${h}`));
    });
    lines.push("", "PROJECTS (personal labs & PoCs)");
    projects.forEach((p) => lines.push(`${p.title} (${gitlabRepoUrl(p.repo)})`, `  ${p.description}`));
    lines.push(`More labs: ${moreLabs.map((l) => `${l.title} (${gitlabRepoUrl(l.repo)})`).join("; ")}`);
    lines.push("", "CERTIFICATIONS");
    certifications.forEach((c) => lines.push(`  - ${c.title}${c.subtitle ? ` (${c.subtitle})` : ""} — ${c.org}`));
    lines.push("", "EDUCATION");
    education.forEach((e) => lines.push(`  - ${e.title}, ${e.school} (${e.period})${e.tag ? `, ${e.tag}` : ""}`));
    lines.push("", "SKILLS");
    skillCategories.forEach((c) => lines.push(`  ${c.title}: ${c.skills.join(", ")}`));
    lines.push("", "LINKS", `  LinkedIn: ${links.linkedin}`, `  GitLab: ${links.gitlab}`, `  GitHub: ${links.github}`, `  Portfolio: ${links.portfolio}`);
    return lines.join("\n");
}

module.exports = {
    profile,
    links,
    gitlabRepoUrl,
    aboutCards,
    experiences,
    projects,
    moreLabs,
    certifications,
    education,
    skillCategories,
    resumeToText
};
