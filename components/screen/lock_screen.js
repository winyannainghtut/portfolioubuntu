import React from 'react';
import Clock from '../util components/clock';

export default function LockScreen(props) {

    const wallpapers = {
        "wall-1": "./images/wallpapers/wall-1.webp",
        "wall-2": "./images/wallpapers/wall-2.webp",
        "wall-3": "./images/wallpapers/wall-3.webp",
        "wall-4": "./images/wallpapers/wall-4.webp",
        "wall-5": "./images/wallpapers/wall-5.webp",
        "wall-6": "./images/wallpapers/wall-6.webp",
        "wall-7": "./images/wallpapers/wall-7.webp",
        "wall-8": "./images/wallpapers/wall-8.webp",
    };

    if (props.isLocked) {
        window.addEventListener('click', props.unLockScreen);
        window.addEventListener('keypress', props.unLockScreen);
    };

    return (
        <div 
            id="ubuntu-lock-screen" 
            style={{ zIndex: "100" }} 
            className={`
                ${props.isLocked ? " visible translate-y-0 " : " invisible -translate-y-full "}
                absolute outline-none bg-black bg-opacity-90 
                transform duration-500 select-none 
                top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen
            `}
        >
            {/* Blurred Background */}
            <div 
                style={{ 
                    backgroundImage: `url(${wallpapers[props.bgImgName]})`, 
                    backgroundSize: "cover", 
                    backgroundRepeat: "no-repeat", 
                    backgroundPosition: "center" 
                }} 
                className="absolute top-0 left-0 w-full h-full transform z-20 blur-xl scale-110"
            ></div>
            
            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-30"></div>
            
            {/* Content */}
            <div className="w-full h-full z-50 overflow-hidden relative flex flex-col justify-center items-center text-white">
                {/* Avatar */}
                <div className="mb-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center overflow-hidden">
                        <img 
                            className="w-full h-full object-cover" 
                            src="./images/logos/bitmoji.png" 
                            alt="Win Yan" 
                        />
                    </div>
                </div>
                
                {/* Name */}
                <div className="mb-8 text-center">
                    <h2 className="text-xl md:text-2xl font-medium text-white mb-1">Win Yan Naing Htut</h2>
                    <p className="text-sm text-white/60">Cloud Engineer</p>
                </div>
                
                {/* Time */}
                <div className="text-center mb-4">
                    <div className="text-6xl md:text-8xl font-light tracking-tight">
                        <Clock onlyTime={true} />
                    </div>
                    <div className="mt-3 text-lg md:text-xl font-medium text-white/80">
                        <Clock onlyDay={true} />
                    </div>
                </div>
                
                {/* Unlock Hint */}
                <div className="absolute bottom-12 left-0 right-0 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-white/60 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full animate-pulse">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        Click or press any key to unlock
                    </div>
                </div>
            </div>
        </div>
    )
}
