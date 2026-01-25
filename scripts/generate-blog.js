const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(__dirname, '..', 'public', 'blog', 'posts');
const outputFile = path.join(__dirname, '..', 'public', 'blog', 'posts.json');

try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
        console.log('Blog posts directory does not exist. Creating empty posts.json.');
        fs.writeFileSync(outputFile, '[]');
        return;
    }

    // Get all markdown files
    const filenames = fs.readdirSync(postsDirectory).filter(
        (file) => file.endsWith('.md') && file !== 'README.md'
    );

    const posts = filenames.map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        // Normalize line endings for cross-platform compatibility
        const normalizedContent = fileContents.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        // Extract front matter (if present) and content
        let frontMatter = {};
        let content = normalizedContent;
        
        // Simple front matter parser
        const frontMatterMatch = normalizedContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
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

    // Write to JSON file
    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
    
    console.log(`✅ Generated ${posts.length} blog posts to ${outputFile}`);
} catch (error) {
    console.error('Error generating blog posts:', error);
    process.exit(1);
}
