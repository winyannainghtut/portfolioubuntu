import React from 'react'

function BootingScreen(props) {

    return (
        <div 
            style={(props.visible || props.isShutDown ? { zIndex: "100" } : { zIndex: "-20" })} 
            className={`
                ${props.visible || props.isShutDown ? " visible opacity-100" : " invisible opacity-0 "}
                absolute duration-500 select-none flex flex-col justify-center items-center 
                top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen 
                bg-gradient-to-br from-gray-900 via-black to-gray-900
            `}
        >
            {/* Background Glow Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ub-orange/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Ubuntu Logo */}
                <div className="mb-8">
                    <img 
                        width="160" 
                        height="160" 
                        className="w-32 md:w-40 drop-shadow-2xl" 
                        src="./themes/Yaru/status/cof_orange_hex.svg" 
                        alt="Ubuntu Logo" 
                    />
                </div>
                
                {/* Loading / Power Button */}
                <div className="mb-8">
                    {props.isShutDown ? (
                        <button 
                            onClick={props.turnOn}
                            className="
                                w-16 h-16 rounded-full 
                                bg-white hover:bg-gray-100 
                                flex items-center justify-center 
                                shadow-lg hover:shadow-xl
                                transform hover:scale-105 active:scale-95
                                transition-all duration-200
                                cursor-pointer
                                focus:outline-none focus:ring-4 focus:ring-ub-orange/50
                            "
                        >
                            <img 
                                width="32" 
                                height="32" 
                                className="w-8 h-8" 
                                src="./themes/Yaru/status/power-button.svg" 
                                alt="Power Button" 
                            />
                        </button>
                    ) : (
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-ub-orange animate-spin"></div>
                        </div>
                    )}
                </div>
                
                {/* Welcome Text */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-light text-white mb-2">
                        Win Yan Naing Htut
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        Cloud Engineer & Kubestronaut
                    </p>
                </div>
                
                {/* Ubuntu Wordmark */}
                <div className="mb-8">
                    <img 
                        width="120" 
                        height="24" 
                        className="w-24 md:w-32 opacity-60" 
                        src="./themes/Yaru/status/ubuntu_white_hex.svg" 
                        alt="Ubuntu" 
                    />
                </div>
            </div>
            
            {/* Footer Links */}
            <div className="absolute bottom-8 text-white text-sm flex items-center gap-4">
                <a 
                    className="hover:text-ub-orange transition-colors flex items-center gap-1.5" 
                    href="https://www.linkedin.com/in/wynh/" 
                    rel="noreferrer noopener" 
                    target="_blank"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                </a>
                <span className="text-gray-600">•</span>
                <a 
                    href="https://github.com/winyannainghtut/portfolioubuntu" 
                    rel="noreferrer noopener" 
                    target="_blank" 
                    className="hover:text-ub-orange transition-colors flex items-center gap-1.5"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                </a>
            </div>
        </div>
    )
}

export default BootingScreen
