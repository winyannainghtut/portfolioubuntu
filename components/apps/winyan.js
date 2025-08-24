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
            "education": <Education />,
            "skills": <Skills />,
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
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="win yan's education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Certifications</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="win yan's skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
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
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">Network Engineer & Cloud Specialist!</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">I'm a <span className=" font-medium">Network Engineer & Cloud Specialist</span> with extensive experience in cloud infrastructure, Kubernetes, and DevOps practices. I hold multiple professional certifications including CKAD, CKA, Terraform Associate, AWS Solutions Architect, and Cisco CCNP Enterprise.</li>
                <li className=" mt-3 list-building"> I enjoy building scalable cloud solutions and automating infrastructure that solve real-world problems.</li>
                <li className=" mt-3 list-time"> When I am not working on cloud architectures, I like to spend my time learning new technologies, contributing to open source projects, and staying updated with the latest in cloud computing.</li>
                <li className=" mt-3 list-star"> I have a passion for DevOps, Infrastructure as Code, and container orchestration technologies!</li>
            </ul>
            <div className="mt-4 flex flex-wrap justify-center">
                <a href="https://www.linkedin.com/in/wynh/" target="_blank" rel="noreferrer" className="mx-2 my-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">LinkedIn</a>
                <a href="https://github.com/winyannainghtut" target="_blank" rel="noreferrer" className="mx-2 my-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded text-white text-sm">GitHub</a>
                <a href="mailto:winyannainghtut98@gmail.com" className="mx-2 my-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm">Email</a>
            </div>
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
                        Cisco CCNP Enterprise
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">Dec 2022 – Dec 2025</div>
                    <div className=" text-sm md:text-base">Cisco</div>
                    <div className="text-sm text-gray-300 mt-1">
                        <a href="https://www.credly.com/badges/b43a52a9-8f21-4508-9a90-6e8c9f969de2/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Verify Credential</a>
                    </div>
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
        <iframe className="h-full w-full" src="./files/WinYanNaingHtut_Resume_2025.pdf" title="win yan naing htut resume" frameBorder="0"></iframe>
    )
}