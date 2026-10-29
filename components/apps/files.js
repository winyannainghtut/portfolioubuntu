import React, { useState } from 'react';
import { useAssetPath } from '../../lib/asset-path';
import { homeDirectory, nodeAt } from '../../data/filesystem';

const ICONS = {
    dir: "themes/Yaru/system/folder.png",
    file: "themes/Yaru/apps/gedit.png",
    link: "themes/Yaru/apps/gitlab.svg",
    pdf: "themes/Yaru/mimetypes/application-pdf.svg",
};

function iconFor(node) {
    if (node.type === "dir") return ICONS.dir;
    if (node.name.endsWith(".pdf")) return ICONS.pdf;
    return node.type === "link" ? ICONS.link : ICONS.file;
}

// Nautilus-style browser for the same virtual home directory the Terminal uses
export function Files() {
    const asset = useAssetPath();
    const [cwd, setCwd] = useState([]);
    const [selected, setSelected] = useState(null);
    const [viewing, setViewing] = useState(null);
    const [denied, setDenied] = useState(null);

    const current = nodeAt(cwd);
    const selectedNode = selected && current.children.find((child) => child.name === selected);

    const navigate = (parts) => {
        setCwd(parts);
        setSelected(null);
        setViewing(null);
        setDenied(null);
    };

    const openUrl = (url) => {
        window.open(url.startsWith("./") ? asset(url) : url, "_blank", "noopener,noreferrer");
    };

    const openNode = (node) => {
        if (node.type === "dir") {
            if (node.locked) setDenied(node.name);
            else navigate([...cwd, node.name]);
        } else if (node.type === "link") {
            openUrl(node.url);
        } else {
            setViewing(node);
        }
    };

    const breadcrumbs = [{ label: "Home", parts: [] }, ...cwd.map((name, i) => ({ label: name, parts: cwd.slice(0, i + 1) }))];
    const places = homeDirectory.children.filter((child) => child.type === "dir" && !child.locked);

    return (
        <div className="w-full h-full flex flex-col bg-ub-cool-grey text-white select-none text-sm">
            {/* Header bar: up button + breadcrumb path */}
            <div className="flex items-center gap-2 px-2 py-1.5 bg-ub-window-title border-b border-black/50">
                <button
                    onClick={() => (viewing ? setViewing(null) : navigate(cwd.slice(0, -1)))}
                    disabled={!viewing && cwd.length === 0}
                    className="w-7 h-7 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-center"
                    aria-label="Back"
                >
                    ←
                </button>
                <div className="flex items-center gap-1 bg-black/30 rounded px-2 py-1 flex-1 overflow-x-auto whitespace-nowrap">
                    {breadcrumbs.map((crumb, i) => (
                        <React.Fragment key={crumb.label + i}>
                            {i > 0 && <span className="text-gray-500">/</span>}
                            <button onClick={() => navigate(crumb.parts)} className="px-1 rounded hover:bg-white/10">
                                {crumb.label}
                            </button>
                        </React.Fragment>
                    ))}
                    {viewing && (
                        <>
                            <span className="text-gray-500">/</span>
                            <span className="px-1 text-ub-orange">{viewing.name}</span>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-1 min-h-0">
                {/* Sidebar */}
                <div className="hidden sm:flex flex-col w-40 py-2 bg-ub-grey/60 border-r border-black/40">
                    {[{ name: "Home", parts: [] }, ...places.map((place) => ({ name: place.name, parts: [place.name] }))].map((place) => {
                        const active = !viewing && place.parts.join("/") === cwd.join("/");
                        return (
                            <button
                                key={place.name}
                                onClick={() => navigate(place.parts)}
                                className={`flex items-center gap-2 px-3 py-1.5 text-left capitalize ${active ? "bg-ub-orange" : "hover:bg-white/10"}`}
                            >
                                <img src={asset(ICONS.dir)} alt="" className="w-4 h-4" />
                                {place.name}
                            </button>
                        );
                    })}
                </div>

                {/* Main area */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex-1 overflow-y-auto windowMainScreen">
                        {viewing ? (
                            <div className="p-4">
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <h3 className="font-semibold">{viewing.name}</h3>
                                    {viewing.url && (
                                        <button onClick={() => openUrl(viewing.url)} className="btn-secondary !py-1 !px-3 text-xs">
                                            Open link ↗
                                        </button>
                                    )}
                                </div>
                                <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed bg-black/30 rounded p-4 select-text">{viewing.content}</pre>
                            </div>
                        ) : denied ? (
                            <div className="h-full flex flex-col items-center justify-center text-center px-6 text-gray-300">
                                <span className="text-4xl mb-3">🔒</span>
                                <p>You don't have the permissions necessary to view the contents of “{denied}”.</p>
                                <button onClick={() => setDenied(null)} className="mt-4 text-ub-orange hover:underline">OK 🙃</button>
                            </div>
                        ) : (
                            <div className="flex flex-wrap content-start gap-1 p-3" onClick={() => setSelected(null)}>
                                {current.children.map((node) => (
                                    <div
                                        key={node.name}
                                        role="button"
                                        tabIndex={0}
                                        data-name={node.name}
                                        onClick={(e) => { e.stopPropagation(); setSelected(node.name); }}
                                        onDoubleClick={() => openNode(node)}
                                        onKeyDown={(e) => { if (e.key === "Enter") openNode(node); }}
                                        onFocus={() => setSelected(node.name)}
                                        className={`w-24 p-2 rounded flex flex-col items-center gap-1 outline-none cursor-default ${selected === node.name ? "bg-ub-orange/60" : "hover:bg-white/10"}`}
                                    >
                                        <div className="relative w-12 h-12 flex items-center justify-center">
                                            <img src={asset(iconFor(node))} alt="" className={`max-w-full max-h-full ${node.locked ? "opacity-60" : ""}`} />
                                            {node.locked && <span className="absolute -bottom-1 -right-1 text-xs">🔒</span>}
                                        </div>
                                        <span className="text-xs text-center break-all line-clamp-2">{node.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status bar */}
                    <div className="px-3 py-1 text-xs text-gray-400 border-t border-black/40 truncate">
                        {selectedNode && !viewing
                            ? (selectedNode.description || `“${selectedNode.name}” selected — double-click or press Enter to open`)
                            : `${current.children.length} items`}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Files;

export const displayFiles = () => {
    return <Files />;
}
