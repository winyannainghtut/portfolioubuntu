import React, { Component } from 'react';
import ReactGA from 'react-ga4';
import dynamic from 'next/dynamic';
import { formatPostDate } from '../../lib/format';
import { takePendingPost } from '../../lib/deep-link';

// Markdown + syntax highlighting only loads when a post is opened, keeping the desktop's first load small
const PostContent = dynamic(() => import('../blog/PostContent'), {
    loading: () => <div className="text-gray-400">Loading post...</div>,
});

export class Blog extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            selectedPost: null,
            postsLoaded: false,
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchBlogPosts();
        ReactGA.send({ hitType: "pageview", page: "/blog", title: "Blog" });
    }

    fetchBlogPosts = async () => {
        try {
            // Relative path so it also resolves when served from a GitHub Pages subpath
            const response = await fetch('./blog/posts.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const posts = await response.json();
            this.setState({
                posts: posts,
                loading: false,
                postsLoaded: true
            });

            // Opened from a /?post=<slug> link
            const pendingSlug = takePendingPost();
            const pendingPost = pendingSlug && posts.find((post) => post.slug === pendingSlug);
            if (pendingPost) this.selectPost(pendingPost);
        } catch (error) {
            // Fall through to the "No Blog Posts Yet" screen
            console.warn('Error fetching blog posts:', error);
            this.setState({
                posts: [],
                loading: false,
                postsLoaded: true
            });
        }
    }

    selectPost = (post) => {
        this.setState({ selectedPost: post });
        ReactGA.event({
            category: 'Blog',
            action: `Read post: ${post.title}`
        });
    }

    backToList = () => {
        this.setState({ selectedPost: null });
    }


    renderPostList = () => {
        if (this.state.loading) {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="spinner mb-4"></div>
                    <div className="text-gray-400">Loading posts...</div>
                </div>
            );
        }

        if (this.state.posts.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-ub-orange/20 flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-ub-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <div className="text-white text-xl font-semibold mb-2">No Blog Posts Yet</div>
                    <div className="text-gray-400 text-sm">
                        Check back later for updates!
                    </div>
                </div>
            );
        }

        return (
            <div className="h-full overflow-y-auto p-4 md:p-6 windowMainScreen select-none">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Blog</h1>
                    <p className="text-gray-400">
                        Thoughts, tutorials, and insights on Cloud, DevOps, and Technology
                    </p>
                </div>
                
                {/* Posts Grid */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {this.state.posts.map((post, index) => (
                        <article
                            key={index}
                            onClick={() => this.selectPost(post)}
                            className="glass-card p-5 cursor-pointer hover-lift group"
                        >
                            <div className="flex items-start gap-4">
                                {/* Post Icon */}
                                <div className="w-12 h-12 rounded-lg bg-ub-orange/20 flex items-center justify-center flex-shrink-0 group-hover:bg-ub-orange/30 transition-colors">
                                    <svg className="w-6 h-6 text-ub-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                
                                {/* Post Content */}
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg md:text-xl font-semibold text-white group-hover:text-ub-orange transition-colors mb-1">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-gray-400 mb-2">{formatPostDate(post.date)} · {post.readingTime} min read</p>
                                    <p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
                                </div>
                                
                                {/* Arrow */}
                                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-5 h-5 text-ub-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        );
    }

    renderPost = () => {
        const post = this.state.selectedPost;
        if (!post) return null;

        return (
            <div className="h-full overflow-y-auto p-4 md:p-6 windowMainScreen">
                <div className="max-w-3xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={this.backToList}
                        className="mb-6 text-ub-orange hover:text-orange-300 flex items-center gap-2 text-sm font-medium transition-colors group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Posts
                    </button>
                    
                    {/* Post Header */}
                    <header className="mb-8">
                        <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">{post.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatPostDate(post.date)}
                            </span>
                            <span>{post.readingTime} min read</span>
                            <a
                                href={`./blog/${post.slug}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-ub-orange hover:underline"
                            >
                                Permalink ↗
                            </a>
                        </div>
                    </header>
                    
                    {/* Post Content */}
                    <PostContent content={post.content} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-grey text-white">
                {this.state.selectedPost ? this.renderPost() : this.renderPostList()}
            </div>
        );
    }
}

export const displayBlog = () => {
    return <Blog />;
}

export default Blog;
