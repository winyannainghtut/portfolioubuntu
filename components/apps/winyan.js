import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutWinYan extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "experience": <Experience />,
            "education": <Education />,
            "skills": <Skills />,
            "contact": <Contact />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });


        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about win yan" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="experience" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "experience" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="win yan's experience" src="./themes/Yaru/status/experience.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Experience</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="win yan's education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="win yan's skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="contact" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "contact" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="contact win yan" src="./themes/Yaru/status/contact.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Contact</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="win yan's resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutWinYan;

export const displayAboutWinYan = () => {
    return <AboutWinYan />;
}


function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/bitmoji.png" alt="Win Yan Naing Htut Logo" />
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>my name is <span className="font-bold">Win Yan Naing Htut</span> ,</div>
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">Cloud Engineer & Kubestronaut!</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">I'm a <span className=" font-medium">Cloud Engineer & CNCF Kubestronaut</span> with extensive experience in AWS architecture, network engineering, and Kubernetes orchestration. I hold all 5 Kubernetes certifications (CKA, CKAD, CKS, KCNA, KCSA), Terraform Associate, AWS Solutions Architect, and Cisco CCNP Enterprise certifications.</li>
                <li className=" mt-3 list-building"> Currently working at NCS PTE Ltd (Singapore) managing cloud-based firewalls, implementing IaC with Terraform, and maintaining AWS infrastructure components including Security Groups, WAF, Load Balancers, Lambda, and more.</li>
                <li className=" mt-3 list-time"> When I am not working on cloud architectures, I like to spend my time learning new technologies, contributing to open source projects, and staying updated with the latest in cloud computing and DevOps practices.</li>
                <li className=" mt-3 list-star"> I have a passion for bridging traditional networking with cloud-native workflows, Infrastructure as Code, and container orchestration technologies!</li>
            </ul>
            <div className="mt-4 flex flex-wrap justify-center">
                <a href="https://www.linkedin.com/in/wynh/" target="_blank" rel="noreferrer" className="mx-2 my-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">LinkedIn</a>
                <a href="https://github.com/winyannainghtut" target="_blank" rel="noreferrer" className="mx-2 my-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded text-white text-sm">GitHub</a>
                <a href="mailto:winyannainghtut98@gmail.com" className="mx-2 my-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm">Email</a>
                <a href="tel:+6594209940" className="mx-2 my-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white text-sm">+65 9420 9940</a>
            </div>
        </>
    )
}
function Experience() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Work Experience
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-11/12 mt-4 px-0 md:px-1">
                <li className="mb-6">
                    <div className="text-lg md:text-xl font-bold text-white">
                        Cloud Engineer
                    </div>
                    <div className="text-md text-ubt-gedit-orange mt-1">
                        NCS PTE Ltd (Contract via Avensys Consulting) • Singapore
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">Jan/2024 – Present</div>
                    <ul className="mt-2 text-sm text-gray-300 list-disc ml-5 space-y-1">
                        <li>Managed cloud-based firewalls using FortiOS, FortiAnalyzer, and FortiManager deployed as EC2 NIPS</li>
                        <li>Administered infrastructure in GCC and GCC+ cloud environments</li>
                        <li>Implemented IaC using Terraform and GitLab CI/CD pipelines for AWS resource automation</li>
                        <li>Maintained AWS components including NACLs, Security Groups, WAF, Load Balancers, Route Tables, API Gateway, SNS, Lambda, CloudWatch, System Manager, and S3</li>
                        <li>Supported troubleshooting sessions and incident response for AWS infrastructure issues</li>
                        <li>Led migration projects for Red Hat servers supporting critical proxy services (Squid forward proxy and Nginx reverse proxy)</li>
                        <li>Collaborated with application teams to diagnose and resolve AWS connectivity issues</li>
                        <li>Ensured compliance with security standards through regular audits and best practices implementation</li>
                        <li>Enhanced observability by configuring alarms and SNS notifications using CloudWatch and StackOps (Kibana)</li>
                        <li>Developed SOPs for day-1 deployment of common infrastructure components</li>
                        <li>Deployed web protection using AWS WAF and Trend Micro Vision One endpoint solution</li>
                    </ul>
                </li>
                <li className="mb-6">
                    <div className="text-lg md:text-xl font-bold text-white">
                        Infra Engineer
                    </div>
                    <div className="text-md text-ubt-gedit-orange mt-1">
                        Gain City Electronic PTE • Singapore
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">Feb/2023 – Dec/2023</div>
                    <ul className="mt-2 text-sm text-gray-300 list-disc ml-5 space-y-1">
                        <li>Managed enterprise network infrastructure including L2-L3 switches, routers, firewalls, CCTVs, and IP/digital phone systems</li>
                        <li>Implemented security solutions including Fortinet firewalls (100F, 300D, 400F), VPN, Active Directory, and Darktrace NDR</li>
                        <li>Operated AWS networking services including VPC, Direct Connect, Elastic Load Balancing, and Auto Scaling</li>
                        <li>Deployed SD-WAN solution using Fortinet Secure SD-WAN to optimize WAN connectivity</li>
                        <li>Developed network asset management and monitoring systems including Netbox IPAM/DCIM, Cacti, and Zabbix</li>
                        <li>Resolved complex WAN/LAN/WiFi network issues while providing technical support for business applications</li>
                        <li>Managed IT assets and maintained comprehensive technical documentation</li>
                    </ul>
                </li>
                <li className="mb-6">
                    <div className="text-lg md:text-xl font-bold text-white">
                        Network Engineer
                    </div>
                    <div className="text-md text-ubt-gedit-orange mt-1">
                        Frontiir Co., Ltd. • Yangon, Myanmar
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">April/2021 – Jan/2023</div>
                    <ul className="mt-2 text-sm text-gray-300 list-disc ml-5 space-y-1">
                        <li>Designed IP addressing schemes and configured routing protocols (OSPF, ISIS, MPLS, BGP) on Cisco, Juniper, and Extreme platforms</li>
                        <li>Enhanced network security by implementing TACACS+ and AAA authentication systems</li>
                        <li>Deployed enterprise network solutions and managed carrier-grade NAT infrastructure (A10 TH7440-11)</li>
                        <li>Created technical documentation including MOPs, SOPs, HLD, and LLD for network projects</li>
                        <li>Monitored network performance using Nagios, Cacti, and Smoke-Ping to address bandwidth issues</li>
                        <li>Led migration projects for control networks in regional townships</li>
                        <li>Collaborated with cross-functional teams to implement network improvements</li>
                    </ul>
                </li>
                <li className="mb-6">
                    <div className="text-lg md:text-xl font-bold text-white">
                        Internet Core Engineer
                    </div>
                    <div className="text-md text-ubt-gedit-orange mt-1">
                        Mytel Myanmar • Yangon, Myanmar
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">July/2020 – Feb/2021</div>
                    <ul className="mt-2 text-sm text-gray-300 list-disc ml-5 space-y-1">
                        <li>Resolved issues in fixed broadband networks to ensure optimal performance</li>
                        <li>Administered enterprise network equipment including Juniper MX960, Huawei SRT, ZTE OLT C320/C610, and Huawei OLT MA5680T</li>
                        <li>Managed service requests for BRAS and OLT system deployments</li>
                        <li>Developed MOPs, SOPs, and network diagrams documentation</li>
                        <li>Monitored network devices using U2000 and Net Numen tools</li>
                        <li>Collaborated with field maintenance engineers for OLT integration and customer issue resolution</li>
                    </ul>
                </li>
                <li className="mb-6">
                    <div className="text-lg md:text-xl font-bold text-white">
                        Associate Network Engineer
                    </div>
                    <div className="text-md text-ubt-gedit-orange mt-1">
                        Frontiir Co., Ltd. • Yangon, Myanmar
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">May/2018 – June/2020</div>
                    <ul className="mt-2 text-sm text-gray-300 list-disc ml-5 space-y-1">
                        <li>Designed IP addressing schemes for distribution and access layer networks</li>
                        <li>Configured routing protocols (OSPF, ISIS) on Linux-based routing devices</li>
                        <li>Performed end-to-end troubleshooting of network issues</li>
                        <li>Analyzed network traffic to identify congestion points and performance bottlenecks</li>
                        <li>Developed network diagrams and IP allocation documentation</li>
                        <li>Designed and tested network infrastructure for new township deployments</li>
                        <li>Collaborated with cross-functional teams (NOC, LAN-ops, Implementation, Customer Service)</li>
                    </ul>
                </li>
                <li className="mb-6">
                    <div className="text-lg md:text-xl font-bold text-white">
                        Assistant Network Engineer
                    </div>
                    <div className="text-md text-ubt-gedit-orange mt-1">
                        Frontiir Co., Ltd. • Yangon, Myanmar
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">April/2017 – May/2018</div>
                    <ul className="mt-2 text-sm text-gray-300 list-disc ml-5 space-y-1">
                        <li>Configured and installed network hardware including switches, routers, and wireless devices (Ubiquiti, Ruckus, Cambium)</li>
                        <li>Implemented Point-to-Point wireless network installations</li>
                        <li>Collaborated with implementation teams to meet project deadlines</li>
                        <li>Deployed public Wi-Fi solutions for commercial environments</li>
                        <li>Coordinated with inventory teams for device provisioning</li>
                        <li>Created network diagrams and device inventories documentation</li>
                    </ul>
                </li>
            </ul>
        </>
    )
}
function Education() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Certifications
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        CNCF Kubestronaut (Includes CKA, CKAD, CKS, KCNA, KCSA)
                    </div>
                    <div className=" text-sm md:text-base">Cloud Native Computing Foundation</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <span className="text-yellow-400 font-semibold">★ Kubestronaut - All 5 Kubernetes certifications achieved!</span>
                    </div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/45647b96-2c2b-4a83-ad6d-785a518f7447/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Kubestronaut Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        CKAD: Certified Kubernetes Application Developer
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">Dec 2024 – Dec 2026</div>
                    <div className=" text-sm md:text-base">The Linux Foundation</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/75574523-1bd7-4dfa-9cf4-f3680df2cd98/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        CKS: Certified Kubernetes Security Specialist
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2024 – 2026</div>
                    <div className=" text-sm md:text-base">The Linux Foundation</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/441015bc-92a7-4bdf-8394-7fd6bbfa74a7/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        KCNA: Kubernetes and Cloud Native Associate
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2024 – 2026</div>
                    <div className=" text-sm md:text-base">Cloud Native Computing Foundation</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/20eaa565-273f-4f81-b0dc-761caf55df99/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        KCSA: Kubernetes and Cloud Native Security Associate
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2024 – 2026</div>
                    <div className=" text-sm md:text-base">Cloud Native Computing Foundation</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/faeb5e3f-e270-4072-a3cb-31a6852f21db/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        HashiCorp Certified: Terraform Associate (003)
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">Oct 2024 – Oct 2026</div>
                    <div className=" text-sm md:text-base">HashiCorp</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/2f155a8d-f50e-4f05-859a-941168083eb0/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        CKA: Certified Kubernetes Administrator
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">Aug 2024 – Aug 2026</div>
                    <div className=" text-sm md:text-base">The Linux Foundation</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/0e1cfe79-4b8a-46b7-8354-80a7476772d9/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        AWS Certified Solutions Architect – Associate
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">Oct 2023 – Oct 2026</div>
                    <div className=" text-sm md:text-base">Amazon Web Services (AWS)</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/60a9411e-2b4d-4e2e-9289-493873092b3e/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Cisco CCNP Enterprise (Includes ENARSI & ENCOR)
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">Dec 2022 – Dec 2025</div>
                    <div className=" text-sm md:text-base">Cisco</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/b43a52a9-8f21-4508-9a90-6e8c9f969de2/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Cisco CCNA (Certified Network Associate)
                    </div>
                    <div className=" text-sm md:text-base">Cisco</div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Cisco Certified Specialist - Enterprise Advanced Infrastructure Implementation
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">Dec 2022 – Dec 2025</div>
                    <div className=" text-sm md:text-base">Cisco</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/656341b3-3ce0-4e4c-b290-5efa304ac352/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Cisco Certified Specialist - Enterprise Core
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">Jun 2022 – Jun 2025</div>
                    <div className=" text-sm md:text-base">Cisco</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/510ebf94-f27d-4559-9d6f-1ae2a6b4276b?source=linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        ICSI CNSS Certified Network Security Specialist
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">May 2020</div>
                    <div className=" text-sm md:text-base">ICSI (International CyberSecurity Institute), UK</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credential.net/16727451-0fc8-4405-9a8e-21cbd9ed14f3" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Cisco Introduction to Cybersecurity
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">May 2020</div>
                    <div className=" text-sm md:text-base">Cisco</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.youracclaim.com/badges/85e38098-0e9e-4d98-9540-f39e58d078c0/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
                </li>
            </ul>
        </>
    )
}
function Education() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Bachelor of Art in English
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2015 – 2019</div>
                    <div className=" text-sm md:text-base">University of Distance Education, Myanmar</div>
                    <div className="text-sm text-gray-300 mt-1">
                        Distance Education Program
                    </div>
                </li>
            </ul>
            <div className=" font-medium relative text-2xl mt-8 md:mt-10 mb-4">
                Personal Information
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className=" text-sm md:text-base">
                        <strong className="text-white">Age:</strong> 28
                    </div>
                </li>
                <li className="list-disc mt-2">
                    <div className=" text-sm md:text-base">
                        <strong className="text-white">Nationality:</strong> Myanmar
                    </div>
                </li>
                <li className="list-disc mt-2">
                    <div className=" text-sm md:text-base">
                        <strong className="text-white">Marital Status:</strong> Single
                    </div>
                </li>
                <li className="list-disc mt-2">
                    <div className=" text-sm md:text-base">
                        <strong className="text-white">Location:</strong> Singapore
                    </div>
                </li>
            </ul>
        </>
    )
}
function Contact() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Get In Touch
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1 space-y-4">
                <li className="list-disc">
                    <div className="text-white font-semibold">Email</div>
                    <a href="mailto:winyannainghtut98@gmail.com" className="text-blue-400 hover:text-blue-300">winyannainghtut98@gmail.com</a>
                </li>
                <li className="list-disc">
                    <div className="text-white font-semibold">Phone</div>
                    <a href="tel:+6594209940" className="text-blue-400 hover:text-blue-300">+65 9420 9940</a>
                </li>
                <li className="list-disc">
                    <div className="text-white font-semibold">LinkedIn</div>
                    <a href="https://www.linkedin.com/in/wynh/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">linkedin.com/in/wynh</a>
                </li>
                <li className="list-disc">
                    <div className="text-white font-semibold">GitHub</div>
                    <a href="https://github.com/winyannainghtut" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">github.com/winyannainghtut</a>
                </li>
                <li className="list-disc">
                    <div className="text-white font-semibold">GitLab</div>
                    <a href="https://gitlab.com/winyannainghtut" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">gitlab.com/winyannainghtut</a>
                </li>
                <li className="list-disc">
                    <div className="text-white font-semibold">Portfolio</div>
                    <a href="https://portfolio.winyan.dev" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">portfolio.winyan.dev</a>
                </li>
            </ul>
            <div className="mt-8 text-sm text-gray-400 w-10/12">
                <p>I'm always open to discussing new opportunities, cloud architecture projects, or collaboration on DevOps initiatives. Feel free to reach out!</p>
            </div>
        </>
    )
}
function Skills() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    I've worked with a wide variety of cloud platforms, networking technologies & infrastructure tools.
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div> My areas of expertise are <strong className="text-ubt-gedit-orange">cloud infrastructure, Kubernetes, network engineering & DevOps!</strong></div>
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div>Here are my most frequently used technologies</div>
                </li>
            </ul>
            <div className="w-full md:w-10/12 flex mt-4">
                <div className=" text-sm text-center md:text-base w-1/2 font-bold">Cloud & Infrastructure</div>
                <div className=" text-sm text-center md:text-base w-1/2 font-bold">Networking & DevOps</div>
            </div>
            <div className="w-full md:w-10/12 flex justify-center items-start font-bold text-center">
                <div className="px-2 w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=flat&logo=amazonaws&logoColor=white" alt="win yan aws" />
                        <img className="m-1" src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white" alt="win yan kubernetes" />
                        <img className="m-1" src="https://img.shields.io/badge/Docker-2CA5E0?style=flat&logo=docker&logoColor=white" alt="win yan docker" />
                        <img className="m-1" src="https://img.shields.io/badge/Terraform-7B42BC?style=flat&logo=terraform&logoColor=white" alt="win yan terraform" />
                        <img className="m-1" src="https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black" alt="win yan linux" />
                        <img className="m-1" src="https://img.shields.io/badge/Ansible-EE0000?style=flat&logo=ansible&logoColor=white" alt="win yan ansible" />
                        <img src="https://img.shields.io/badge/-Git-%23F05032?style=flat&logo=git&logoColor=%23ffffff" alt="win yan git" className="m-1" />
                        <img src="https://img.shields.io/badge/Helm-0F1689?style=flat&logo=helm&logoColor=white" alt="win yan helm" className="m-1" />
                        <img className="m-1" src="https://img.shields.io/badge/Fortinet-EE3124?style=flat&logo=fortinet&logoColor=white" alt="win yan fortinet" />
                        <img className="m-1" src="https://img.shields.io/badge/GitLab-FC6D26?style=flat&logo=gitlab&logoColor=white" alt="win yan gitlab" />
                    </div>
                </div>
                <div className="px-2 flex flex-wrap items-start w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className=" m-1" src="https://img.shields.io/badge/Cisco-1BA0D7?style=flat&logo=cisco&logoColor=white" alt="win yan cisco" />
                        <img className=" m-1" src="https://img.shields.io/badge/Python-FFD43B?style=flat&logo=python&logoColor=blue" alt="win yan python" />
                        <img className="m-1" src="https://img.shields.io/badge/Jenkins-D24939?style=flat&logo=jenkins&logoColor=white" alt="win yan jenkins" />
                        <img className="m-1" src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white" alt="win yan github actions" />
                        <img src="https://img.shields.io/badge/Prometheus-E6522C?style=flat&logo=prometheus&logoColor=white" alt="win yan prometheus" className="m-1" />
                        <img src="https://img.shields.io/badge/Grafana-F46800?style=flat&logo=grafana&logoColor=white" alt="win yan grafana" className="m-1" />
                        <img className="m-1" src="https://img.shields.io/badge/YAML-CB171E?style=flat&logo=yaml&logoColor=white" alt="win yan yaml" />
                        <img className="m-1" src="https://img.shields.io/badge/Kibana-005571?style=flat&logo=kibana&logoColor=white" alt="win yan kibana" />
                        <img className="m-1" src="https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white" alt="win yan nginx" />
                    </div>
                </div>
            </div>
            <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <span> And of course, certified in</span> <img className=" inline ml-1" src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white" alt="win yan kubernetes certified" /> <span>and</span> <img className=" inline ml-1" src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=flat&logo=amazonaws&logoColor=white" alt="win yan aws certified" /> <span>!</span>
                </li>
            </ul>
        </>
    )
}

function Resume() {
    return (
        <iframe className="h-full w-full" src="./files/WinYanNaingHtut_2026.pdf" title="win yan naing htut resume" frameBorder="0"></iframe>
    )
}