import React, { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import {
    profile,
    links,
    experiences,
    projects,
    certifications,
    education,
    skillCategories
} from '../../data/resume';

// Chat backend (workers/tars), inlined at build time from the repo variable.
// When unset, TARS answers from a small offline index of the résumé instead.
const TARS_API_URL = process.env.NEXT_PUBLIC_TARS_API_URL;
const MAX_HISTORY = 20;
const firstName = profile.name.split(" ").slice(0, 2).join(" ");

const SUGGESTIONS = [
    "What does Win Yan do at NCS?",
    "Which certifications does Win Yan hold?",
    "Tell me about the Kubernetes projects",
    "How can I get in touch?",
];

const GREETING = `Hi, I'm TARS. Ask me about ${firstName}'s experience, projects, certifications or skills. Humor setting: 75%.`;

// Offline mode: keyword lookup over the résumé data
function offlineAnswer(question) {
    const q = question.toLowerCase();
    const has = (...words) => words.some((word) => q.includes(word));

    if (has("contact", "email", "reach", "hire", "linkedin", "touch")) {
        return `Best way to reach ${firstName}: ${links.email}. Also on LinkedIn (${links.linkedin}) and GitLab (${links.gitlab}).`;
    }
    if (has("cert", "kubestronaut", "cka", "ckad", "cks", "ccnp", "ccna", "credential")) {
        return `${firstName} holds:\n${certifications.map((c) => `- ${c.title}`).join("\n")}`;
    }
    if (has("project", "lab", "repo", "poc", "gitlab", "built", "build")) {
        return `Selected projects:\n${projects.map((p) => `- ${p.title}: ${p.description}`).join("\n")}`;
    }
    if (has("educat", "degree", "study", "studies", "university", "msc", "master", "bachelor")) {
        return education.map((e) => `- ${e.title}, ${e.school} (${e.period})`).join("\n");
    }
    const skillMatch = skillCategories.find((category) =>
        category.skills.some((skill) => q.includes(skill.toLowerCase().split(/[ /(]/)[0]))
    );
    if (has("skill", "stack", "tech", "tool") || skillMatch) {
        const categories = skillMatch ? [skillMatch] : skillCategories;
        return categories.map((c) => `- ${c.title}: ${c.skills.join(", ")}`).join("\n");
    }
    if (has("experience", "job", "work", "role", "ncs", "career", "company", "current", "do ")) {
        const current = experiences.find((exp) => exp.current);
        return `${firstName} is currently a ${current.title} at ${current.company} (${current.period}). Highlights:\n${current.highlights.slice(0, 3).map((h) => `- ${h}`).join("\n")}\n\nBefore that: ${experiences.slice(1).map((exp) => `${exp.title} at ${exp.company}`).join("; ")}.`;
    }
    return `${profile.summary}\n\nTry asking about experience, projects, certifications, skills, education or contact details.`;
}

export function Tars() {
    const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const listRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, sending]);

    const send = async (text) => {
        const question = text.trim();
        if (!question || sending) return;

        const history = [...messages, { role: "user", content: question }];
        setMessages(history);
        setInput("");
        ReactGA.event({ category: "TARS", action: "Asked a question" });

        if (!TARS_API_URL) {
            setMessages([...history, { role: "assistant", content: offlineAnswer(question) }]);
            return;
        }

        setSending(true);
        try {
            // The API conversation must start with a user turn, so drop the greeting
            const apiMessages = history.filter((m, i) => !(i === 0 && m.role === "assistant")).slice(-MAX_HISTORY);
            const response = await fetch(TARS_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages }),
            });
            const data = await response.json().catch(() => ({}));
            const reply = response.ok && data.reply
                ? data.reply
                : `${data.error || "TARS lost the signal."} Here's what I know offline:\n\n${offlineAnswer(question)}`;
            setMessages([...history, { role: "assistant", content: reply }]);
        } catch {
            setMessages([...history, { role: "assistant", content: `Lost the signal. Here's what I know offline:\n\n${offlineAnswer(question)}` }]);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-ub-grey text-white text-sm">
            <div className="flex items-center gap-3 px-4 py-2 border-b border-white/10 bg-ub-cool-grey">
                <img src="./themes/Yaru/apps/tars.svg" alt="" className="w-7 h-7" />
                <div>
                    <p className="font-semibold">TARS</p>
                    <p className="text-xs text-gray-400">
                        {TARS_API_URL ? "AI assistant · answers come from the résumé on this site" : "Offline mode · answers from a built-in résumé index"}
                    </p>
                </div>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto windowMainScreen px-4 py-3 space-y-3">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] rounded-lg px-3 py-2 whitespace-pre-wrap leading-relaxed select-text ${message.role === "user" ? "bg-ub-orange text-white" : "glass-card text-gray-200"}`}>
                            {message.content}
                        </div>
                    </div>
                ))}
                {sending && <div className="text-xs text-gray-400 animate-pulse">TARS is thinking…</div>}
            </div>

            {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                        <button key={suggestion} onClick={() => send(suggestion)} className="skill-badge">
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}

            <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex gap-2 p-3 border-t border-white/10"
            >
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    maxLength={2000}
                    placeholder="Ask TARS about Win Yan…"
                    aria-label="Message TARS"
                    className="flex-1 bg-black/30 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-ub-orange"
                />
                <button type="submit" disabled={sending || !input.trim()} className="btn-primary !py-2 disabled:opacity-50">
                    Send
                </button>
            </form>
        </div>
    );
}

export default Tars;

export const displayTars = () => {
    return <Tars />;
}
