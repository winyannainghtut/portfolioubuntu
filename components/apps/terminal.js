import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga4';
import { profile, links, experiences, certifications, skillCategories } from '../../data/resume';
import { resolvePath, displayPath, HOME_PATH } from '../../data/filesystem';

// `<command>` or `<command> .` opens the app with that id
const APP_COMMANDS = {
    "about": "about-winyan",
    "about-winyan": "about-winyan",
    "blog": "blog",
    "calc": "calc",
    "chrome": "chrome",
    "code": "vscode",
    "files": "files",
    "settings": "settings",
    "spotify": "spotify",
    "tars": "tars",
    "terminal": "terminal",
    "trash": "trash",
};

// neofetch's Ubuntu logo
const UBUNTU_LOGO = [
    "            .-/+oossssoo+/-.",
    "        `:+ssssssssssssssssss+:`",
    "      -+ssssssssssssssssssyyssss+-",
    "    .ossssssssssssssssssdMMMNysssso.",
    "   /ssssssssssshdmmNNmmyNMMMMhssssss/",
    "  +ssssssssshmydMMMMMMMNddddyssssssss+",
    " /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/",
    ".ssssssssdMMMNhsssssssssshNMMMdssssssss.",
    "+sssshhhyNMMNyssssssssssssyNMMMysssssss+",
    "ossyNMMMNyMMhsssssssssssssshmmmhssssssso",
    "ossyNMMMNyMMhsssssssssssssshmmmhssssssso",
    "+sssshhhyNMMNyssssssssssssyNMMMysssssss+",
    ".ssssssssdMMMNhsssssssssshNMMMdssssssss.",
    " /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/",
    "  +sssssssssdmydMMMMMMMMddddyssssssss+",
    "   /ssssssssssshdmNNNNmyNMMMMhssssss/",
    "    .ossssssssssssssssssdMMMNysssso.",
    "      -+sssssssssssssssssyyyssss+-",
    "        `:+ssssssssssssssssss+:`",
    "            .-/+oossssoo+/-.",
].join("\n");

const LS_CLASSES = {
    dir: "font-bold text-ubt-blue",
    file: "text-white",
    link: "font-bold text-ubt-gedit-blue",
};

/**
 * Escapes a string for safe insertion into the innerHTML-based command output.
 */
function escapeHtml(str) {
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    return String(str ?? '').replace(/[&<>"'`=]/g, char => entityMap[char]);
}

const pre = (html, extraClasses = "") => `<pre class="font-normal whitespace-pre-wrap ${extraClasses}">${html}</pre>`;

// Inclusive months from "YYYY-MM" to "YYYY-MM" (or now), formatted like kubectl's AGE column
function experienceAge(start, end) {
    const now = new Date();
    const [startYear, startMonth] = start.split('-').map(Number);
    const [endYear, endMonth] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
    const months = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
    const years = Math.floor(months / 12);
    const rest = months % 12;
    return years ? `${years}y${rest ? `${rest}m` : ''}` : `${rest}m`;
}

function commonPrefix(words) {
    return words.reduce((prefix, word) => {
        let i = 0;
        while (i < prefix.length && prefix[i] === word[i]) i++;
        return prefix.slice(0, i);
    });
}

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.cwd = []; // path segments below ~
        this.prev_commands = [];
        this.commands_index = -1;
        this.state = {
            terminal: [],
        }

        // Each command returns HTML for its output row ("" for none); every
        // interpolated value must go through escapeHtml.
        this.commands = {
            help: { help: "show this help", run: this.help },
            cd: { help: "change directory (cd, cd .., cd ~/projects)", run: this.cd },
            ls: { help: "list directory contents", run: this.ls },
            cat: { help: "print a file, e.g. cat resume", run: this.cat },
            open: { help: "open a link or file, e.g. open resume.pdf", run: this.open },
            pwd: { help: "print working directory", run: () => escapeHtml(HOME_PATH + this.cwd.map((p) => `/${p}`).join('')) },
            whoami: { help: "who is this?", run: this.whoami },
            neofetch: { help: "system information", run: this.neofetch },
            kubectl: { help: "try: kubectl get pods", run: this.kubectl },
            k: { help: "alias for kubectl", run: this.kubectl },
            terraform: { help: "try: terraform plan", run: this.terraform },
            history: { help: "command history", run: this.history },
            echo: { help: "print text", run: (args) => escapeHtml(args.join(" ")) },
            mkdir: { help: "create a folder on the desktop", run: this.mkdir },
            sudo: { help: "don't.", run: this.sudo },
            clear: { help: "clear the terminal" },
            exit: { help: "close the terminal" },
        };
    }

    componentDidMount() {
        this.reStartTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        this.setState({ terminal: [] }, this.appendTerminalRow);
    }

    appendTerminalRow = () => {
        const row = this.terminalRow(this.terminal_rows);
        this.terminal_rows += 2;
        this.setState((state) => ({ terminal: [...state.terminal, row] }));
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-ubt-green">{profile.username}@Dell</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className=" text-ubt-blue">{displayPath(this.cwd)}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    setInputValue = (id, value) => {
        $(`input#terminal-input-${id}`).val(value);
        $(`#show-${id}`).text(value);
    }

    checkKey = (e) => {
        const terminal_row_id = $(e.target).data("row-id");

        if (e.key === "Enter") {
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length === 0) return;

            // push to history (before running, so `history` lists itself like bash)
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.removeCursor(terminal_row_id);
            this.handleCommands(command, terminal_row_id);
            this.clearInput(terminal_row_id);
        }
        else if (e.key === "Tab") {
            e.preventDefault();
            const completed = this.completeInput($(e.target).val());
            if (completed !== null) this.setInputValue(terminal_row_id, completed);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            this.setInputValue(terminal_row_id, prev_command);
            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            this.setInputValue(terminal_row_id, prev_command);
            this.commands_index++;
        }
    }

    // Tab completion: command names for the first word, paths after that
    completeInput = (value) => {
        const words = value.split(' ');
        const last = words[words.length - 1];
        let base = '';
        let prefix = last;
        let candidates;

        if (words.length === 1) {
            const names = new Set([...Object.keys(this.commands), ...Object.keys(APP_COMMANDS)]);
            candidates = [...names].map((name) => ({ name, suffix: ' ' }));
        } else {
            const slash = last.lastIndexOf('/');
            base = last.slice(0, slash + 1);
            prefix = last.slice(slash + 1);
            const resolved = resolvePath(this.cwd, base || '.');
            if (!resolved || resolved.node.type !== 'dir' || resolved.node.locked) return null;
            candidates = resolved.node.children.map((child) => ({ name: child.name, suffix: child.type === 'dir' ? '/' : ' ' }));
        }

        const matches = candidates.filter((candidate) => candidate.name.startsWith(prefix));
        if (matches.length === 0) return null;

        const completion = matches.length === 1
            ? matches[0].name + matches[0].suffix
            : commonPrefix(matches.map((match) => match.name));
        words[words.length - 1] = base + completion;
        return words.join(' ');
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    handleCommands = (command, rowId) => {
        const [name, ...args] = command.split(' ').filter(Boolean);

        if (name === "clear") {
            this.reStartTerminal();
            return;
        }
        if (name === "exit") {
            this.closeTerminal();
            return;
        }

        let result;
        if (this.commands[name]) {
            result = this.commands[name].run(args);
        } else if (APP_COMMANDS[name]) {
            result = this.launchApp(name, args);
        } else {
            result = `Command '${escapeHtml(name)}' not found. Type <span class="text-ubt-green">help</span> to see available commands.`;
        }

        // Output is either escaped user input or static markup built above
        this.setResultHTML(`row-result-${rowId}`, result);
        this.appendTerminalRow();
    }

    launchApp = (name, args) => {
        if (args.length === 0 || (args.length === 1 && args[0] === ".")) {
            this.props.openApp(APP_COMMANDS[name]);
            return "";
        }
        return `${escapeHtml(name)}: unexpected argument '${escapeHtml(args.join(" "))}'`;
    }

    help = () => {
        const rows = Object.entries(this.commands)
            .map(([name, { help }]) => `  <span class="text-ubt-green">${name.padEnd(10)}</span> ${escapeHtml(help)}`);
        return pre([
            "Commands:",
            ...rows,
            "",
            "Open an app:",
            `  ${Object.keys(APP_COMMANDS).join(", ")}`,
            "",
            "Tips: Tab completes commands and paths; ↑/↓ browse history.",
            "Shortcuts: Ctrl+Alt+T terminal · Alt+F1 or Super app grid · Ctrl+Alt+W close window",
        ].join("\n"));
    }

    cd = (args) => {
        if (args.length > 1) return "bash: cd: too many arguments";
        const target = args[0] || "~";
        const resolved = resolvePath(this.cwd, target);

        if (!resolved) return `bash: cd: ${escapeHtml(target)}: No such file or directory`;
        if (resolved.node.type !== "dir") return `bash: cd: ${escapeHtml(target)}: Not a directory`;
        if (resolved.node.locked) return `bash: cd: ${escapeHtml(target)}: Permission denied 😏`;

        this.cwd = resolved.parts;
        return "";
    }

    ls = (args) => {
        if (args.length > 1) return "ls: too many arguments";
        const target = args[0] || ".";
        const resolved = resolvePath(this.cwd, target);

        if (!resolved) return `ls: cannot access '${escapeHtml(target)}': No such file or directory`;
        const { node } = resolved;
        if (node.locked) return "Nope! 🙃";
        if (node.type !== "dir") return escapeHtml(node.name);

        const entries = node.children
            .map((child) => `<span class="mr-4 ${LS_CLASSES[child.type]}">${escapeHtml(child.name)}</span>`)
            .join("");
        return `<div class="flex justify-start flex-wrap">${entries}</div>`;
    }

    // `cat resume` finds resume.txt
    findFile = (target) => {
        return resolvePath(this.cwd, target) || (!target.includes(".") && resolvePath(this.cwd, `${target}.txt`));
    }

    cat = (args) => {
        if (args.length === 0) return "cat: missing file operand. Try: cat resume";
        return args.map((target) => {
            const resolved = this.findFile(target);
            if (!resolved) return `cat: ${escapeHtml(target)}: No such file or directory`;
            const { node } = resolved;
            if (node.type === "dir") return `cat: ${escapeHtml(target)}: Is a directory`;
            if (node.type === "link") return `cat: ${escapeHtml(target)}: not a text file. Try: open ${escapeHtml(target)}`;
            return pre(escapeHtml(node.content));
        }).join("");
    }

    open = (args) => {
        if (args.length !== 1) return "open: usage: open &lt;file&gt;";
        const resolved = this.findFile(args[0]);
        if (!resolved) return `open: ${escapeHtml(args[0])}: No such file or directory`;
        const { node } = resolved;
        if (!node.url) return `open: ${escapeHtml(args[0])}: nothing to open. Try: cat ${escapeHtml(args[0])}`;

        window.open(node.url, "_blank", "noopener,noreferrer");
        return `Opening ${escapeHtml(node.name)}…`;
    }

    whoami = () => {
        return `${escapeHtml(profile.username)}<br><span class="text-gray-400">${escapeHtml(`${profile.name} — ${profile.title}`)}</span>`;
    }

    neofetch = () => {
        const current = experiences.find((exp) => exp.current);
        const info = [
            ["OS", "Ubuntu 20.04 LTS (Next.js edition)"],
            ["Host", links.portfolio.replace(/^https?:\/\//, "")],
            ["Role", profile.shortTitle],
            ["Employer", current ? current.company : "-"],
            ["Location", profile.location],
            ["Experience", `${profile.yearsOfExperience} years`],
            ["Certs", `${certifications.length} (ls ~/certifications)`],
            ["Shell", "bash (portfolio)"],
            ["Contact", links.email],
        ];
        const title = `${profile.username}@portfolio`;
        const lines = [
            `<span class="text-ub-orange font-bold">${escapeHtml(title)}</span>`,
            "-".repeat(title.length),
            ...info.map(([key, value]) => `<span class="text-ub-orange font-bold">${key}</span>: ${escapeHtml(value)}`),
        ];
        return `<div class="flex flex-wrap gap-6 font-normal">${pre(escapeHtml(UBUNTU_LOGO), "text-ub-orange leading-tight text-xs")}${pre(lines.join("\n"), "leading-relaxed")}</div>`;
    }

    // My career as pods: current role Running, past roles Completed
    kubectl = (args) => {
        const [verb, resource] = args;
        if (verb !== "get" || !["pods", "pod", "po"].includes(resource)) {
            return `error: unknown command "${escapeHtml(args.join(" "))}"<br>Try: kubectl get pods`;
        }

        const rows = [["NAME", "READY", "STATUS", "RESTARTS", "AGE"]].concat(
            experiences.map((exp) => [
                exp.id,
                exp.current ? "1/1" : "0/1",
                exp.current ? "Running" : "Completed",
                "0",
                experienceAge(exp.start, exp.end),
            ])
        );
        const widths = rows[0].map((_, col) => Math.max(...rows.map((row) => row[col].length)));
        const table = rows
            .map((row) => row.map((cell, col) => cell.padEnd(widths[col] + 3)).join("").trimEnd())
            .map((line) => escapeHtml(line).replace("Running", '<span class="text-ubt-green">Running</span>'))
            .join("\n");
        return pre(table);
    }

    // My skills as a Terraform plan
    terraform = (args) => {
        if (args[0] !== "plan") {
            if (args[0] === "apply") {
                return `Error: this plan requires approval from a hiring manager 😉<br>Reach out: <a class="underline" href="mailto:${escapeHtml(links.email)}">${escapeHtml(links.email)}</a>`;
            }
            return "Usage: terraform plan";
        }

        const plus = '<span class="text-ubt-green">+</span>';
        const blocks = skillCategories.map((category) => {
            const name = category.id.replace(/-/g, "_");
            return [
                `  <span class="font-bold"># skill_set.${name}</span> will be created`,
                `  ${plus} resource "skill_set" "${name}" {`,
                `      ${plus} title  = "${escapeHtml(category.title)}"`,
                `      ${plus} skills = [${category.skills.map((skill) => `"${escapeHtml(skill)}"`).join(", ")}]`,
                "    }",
            ].join("\n");
        });

        return pre([
            "Terraform will perform the following actions:",
            "",
            blocks.join("\n\n"),
            "",
            `<span class="font-bold">Plan:</span> ${skillCategories.length} to add, 0 to change, 0 to destroy.`,
        ].join("\n"));
    }

    history = () => {
        return pre(this.prev_commands
            .map((command, i) => `${String(i + 1).padStart(4)}  ${escapeHtml(command)}`)
            .join("\n"));
    }

    mkdir = (args) => {
        if (args[0] === undefined || args[0] === "") return "mkdir: missing operand";
        this.props.addFolder(args[0]);
        return "";
    }

    sudo = () => {
        ReactGA.event({
            category: "Sudo Access",
            action: "lol",
        });
        return "<img class=' w-2/5' src='./images/memes/used-sudo-command.webp' />";
    }

    /**
     * Safely sets innerHTML for trusted content only
     * Used for controlled HTML output like command results
     * @param {string} elementId - The element ID
     * @param {string} content - The HTML content (must be from trusted source)
     */
    setResultHTML(elementId, content) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = content;
        }
    }

    render() {
        return (
            <div className="h-full w-full px-1.5 bg-ub-drk-abrgn text-white text-sm font-bold" id="terminal-body">
                {
                    this.state.terminal
                }
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
