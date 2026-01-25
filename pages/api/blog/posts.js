import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const postsDirectory = path.join(process.cwd(), 'public', 'blog', 'posts');
        
        // Check if directory exists
        if (!fs.existsSync(postsDirectory)) {
            return res.status(200).json([]);
        }

        // Get all markdown files
        const filenames = fs.readdirSync(postsDirectory).filter(
            (file) => file.endsWith('.md')
        );

        const posts = filenames.map((filename) => {
            const filePath = path.join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            
            // Extract front matter (if present) and content
            let frontMatter = {};
            let content = fileContents;
            
            // Simple front matter parser
            const frontMatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
            if (frontMatterMatch) {
                const frontMatterContent = frontMatterMatch[1];
                content = frontMatterMatch[2];
                
                // Parse front matter properties
                const titleMatch = frontMatterContent.match(/title:\s*(.+)/);
                const dateMatch = frontMatterContent.match(/date:\s*(.+)/);
                const excerptMatch = frontMatterContent.match(/excerpt:\s*(.+)/);
                
                if (titleMatch) frontMatter.title = titleMatch[1].trim();
                if (dateMatch) frontMatter.date = dateMatch[1].trim();
                if (excerptMatch) frontMatter.excerpt = excerptMatch[1].trim();
            }

            // Extract slug from filename
            const slug = filename.replace(/\.md$/, '');

            return {
                slug,
                title: frontMatter.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                date: frontMatter.date || '',
                excerpt: frontMatter.excerpt || content.substring(0, 150).replace(/[#*`]/g, '') + '...',
                content,
            };
        });

        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error reading blog posts:', error);
        res.status(500).json({ error: 'Failed to read blog posts' });
    }
}
