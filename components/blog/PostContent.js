import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import bash from 'highlight.js/lib/languages/bash';
import diff from 'highlight.js/lib/languages/diff';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import go from 'highlight.js/lib/languages/go';
import ini from 'highlight.js/lib/languages/ini';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import nginx from 'highlight.js/lib/languages/nginx';
import plaintext from 'highlight.js/lib/languages/plaintext';
import powershell from 'highlight.js/lib/languages/powershell';
import python from 'highlight.js/lib/languages/python';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

// Only the languages a cloud/DevOps blog is likely to use, to keep the bundle small.
// Fenced blocks in other languages still render, just without colours.
const highlightOptions = {
    languages: { bash, diff, dockerfile, go, ini, javascript, json, nginx, plaintext, powershell, python, shell, sql, typescript, xml, yaml },
    aliases: { bash: ['sh', 'zsh'], ini: ['toml', 'conf'], javascript: ['js'], typescript: ['ts'], yaml: ['yml'], xml: ['html'], plaintext: ['text', 'txt'] },
};

// Shared by the desktop Blog app and the static /blog/<slug>/ pages
export default function PostContent({ content }) {
    return (
        <article className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-semibold
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-ub-orange prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-code:text-ub-orange prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-ub-cool-grey prose-pre:border prose-pre:border-white/10
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:marker:text-ub-orange
        ">
            <ReactMarkdown rehypePlugins={[[rehypeHighlight, highlightOptions]]}>{content}</ReactMarkdown>
        </article>
    );
}
