import React, { useState } from 'react'
import SideBarApp from '../base/side_bar_app';

let renderApps = (props) => {
    let sideBarAppsJsx = [];
    props.apps.forEach((app, index) => {
        if (props.favourite_apps[app.id] === false) return;
        sideBarAppsJsx.push(
            <SideBarApp 
                key={index} 
                id={app.id} 
                title={app.title} 
                icon={app.icon} 
                isClose={props.closed_windows} 
                isFocus={props.focused_windows} 
                openApp={props.openAppByAppId} 
                isMinimized={props.isMinimized} 
                openFromMinimised={props.openFromMinimised} 
            />
        );
    });
    return sideBarAppsJsx;
}

export default function SideBar(props) {

    function showSideBar() {
        props.hideSideBar(null, false);
    }

    function hideSideBar() {
        setTimeout(() => {
            props.hideSideBar(null, true);
        }, 2000);
    }

    return (
        <>
            <div 
                className={`
                    ${props.hide ? " -translate-x-full " : ""}
                    absolute transform duration-300 ease-out select-none z-40 
                    left-0 top-0 h-full pt-8 w-auto 
                    flex flex-col justify-start items-center 
                    bg-black/60 backdrop-blur-md
                    border-r border-white/5
                `}
            >
                {/* App Icons */}
                <div className="flex flex-col gap-1 px-1">
                    {Object.keys(props.closed_windows).length !== 0 && renderApps(props)}
                </div>
                
                {/* All Apps Button at bottom */}
                <AllApps showApps={props.showAllApps} />
            </div>
            
            {/* Hover trigger area */}
            <div 
                onMouseEnter={showSideBar} 
                onMouseLeave={hideSideBar} 
                className="w-1 h-full absolute top-0 left-0 bg-transparent z-50"
            />
        </>
    )
}

export function AllApps(props) {
    const [title, setTitle] = useState(false);

    return (
        <div
            className="
                w-12 h-12 rounded-xl m-2 
                hover:bg-white/10 
                flex items-center justify-center 
                cursor-pointer transition-all duration-200
                hover:scale-105 active:scale-95
                group
            "
            style={{ marginTop: 'auto', marginBottom: '1rem' }}
            onMouseEnter={() => setTitle(true)}
            onMouseLeave={() => setTitle(false)}
            onClick={props.showApps}
        >
            <div className="relative">
                <img 
                    width="28" 
                    height="28" 
                    className="w-7 opacity-80 group-hover:opacity-100 transition-opacity" 
                    src="./themes/Yaru/system/view-app-grid-symbolic.svg" 
                    alt="Show Applications" 
                />
                {/* Tooltip */}
                <div
                    className={`
                        ${title ? "visible opacity-100 translate-x-0" : "invisible opacity-0 -translate-x-2"}
                        w-max py-1.5 px-3 absolute top-1/2 -translate-y-1/2 left-full ml-4 
                        text-white text-sm font-medium
                        bg-ub-grey/95 backdrop-blur-sm
                        border border-white/10 rounded-lg shadow-xl
                        transition-all duration-200
                    `}
                >
                    Show Applications
                </div>
            </div>
        </div>
    );
}
