import React, { Component } from 'react'

export class UbuntuApp extends Component {

    openApp = () => {
        if (this.props.isExternalApp && this.props.url) {
            // Open external URL with security attributes to prevent reverse tabnabbing
            const newWindow = window.open(this.props.url, '_blank', 'noopener,noreferrer');
            if (newWindow) {
                newWindow.opener = null;
            }
        } else {
            this.props.openApp(this.props.id);
        }
    }

    render() {
        return (
            <div
                className="
                    desktop-icon p-2 m-px z-10 
                    bg-white/0 hover:bg-white/10 
                    focus:bg-ub-orange/50 focus:ring-2 focus:ring-ub-orange/50
                    border border-transparent 
                    outline-none rounded-lg 
                    select-none w-24 h-24 
                    flex flex-col justify-center items-center 
                    text-center text-xs font-normal text-white 
                    relative cursor-pointer
                    transition-all duration-200
                    group
                "
                id={"app-" + this.props.id}
                onDoubleClick={this.openApp}
                tabIndex={0}
            >
                {/* Icon Container */}
                <div className="relative mb-2 transform group-hover:scale-110 transition-transform duration-200">
                    <img 
                        width="48px" 
                        height="48px" 
                        className="w-12 drop-shadow-lg" 
                        src={this.props.icon} 
                        alt={"Ubuntu " + this.props.name} 
                    />
                    {this.props.isExternalApp && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                            <img 
                                src="./themes/Yaru/status/arrow-up-right.svg" 
                                alt="External Link" 
                                className="w-2.5 h-2.5"
                            />
                        </div>
                    )}
                </div>
                
                {/* App Name */}
                <span className="
                    text-white text-xs font-medium 
                    leading-tight max-w-full 
                    px-1 py-0.5 rounded
                    bg-black/30 backdrop-blur-sm
                    group-hover:bg-black/50
                    transition-colors duration-200
                    truncate
                ">
                    {this.props.name}
                </span>
            </div>
        )
    }
}

export default UbuntuApp
