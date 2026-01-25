# Blog Posts

This folder contains markdown files for the blog.

## Adding a New Blog Post

To add a new blog post, create a new `.md` file in this folder with the following format:

```markdown
---
title: Your Post Title
date: YYYY-MM-DD
excerpt: A brief description of your post.
---

# Your Post Title

Your content goes here. You can use standard markdown formatting.

## Subheadings

Add as many sections as you need.

### Code Blocks

```bash
# Your code here
```

### Lists

- Item 1
- Item 2
- Item 3

### Links

[Link text](https://example.com)

### Images

![Alt text](/path/to/image.png)
```

## Naming Convention

Use kebab-case for filenames:
- `getting-started-with-kubernetes.md` ✓
- `aws-security-best-practices.md` ✓
- `My Blog Post.md` ✗

## Front Matter

Each post should include front matter with:
- `title`: The display title of the post
- `date`: Publication date (YYYY-MM-DD format)
- `excerpt`: A brief description shown in the post list

## Content Guidelines

- Use clear, descriptive headings
- Include code examples when applicable
- Add relevant images or diagrams
- Keep paragraphs concise
- Use bullet points for lists
- Include a conclusion section
