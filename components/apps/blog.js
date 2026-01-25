import React, { Component } from 'react';
import ReactGA from 'react-ga4';
import ReactMarkdown from 'react-markdown';

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
        // google analytics
        ReactGA.send({ hitType: "pageview", page: "/blog", title: "Blog" });
    }

    fetchBlogPosts = async () => {
        try {
            // Try to fetch from generated JSON file (static export)
            const response = await fetch('/blog/posts.json');
            if (response.ok) {
                const posts = await response.json();
                this.setState({ 
                    posts: posts, 
                    loading: false, 
                    postsLoaded: true 
                });
            } else {
                // Fallback to sample posts
                this.setState({ 
                    posts: this.getSamplePosts(), 
                    loading: false, 
                    postsLoaded: true 
                });
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            // Fallback to sample posts
            this.setState({ 
                posts: this.getSamplePosts(), 
                loading: false, 
                postsLoaded: true 
            });
        }
    }

    getSamplePosts = () => {
        return [
            {
                slug: 'getting-started-with-kubernetes',
                title: 'Getting Started with Kubernetes',
                date: '2025-01-15',
                excerpt: 'A comprehensive guide to deploying your first application on Kubernetes.',
                content: '# Getting Started with Kubernetes\n\nKubernetes is an open-source container orchestration platform. In this post, we\'ll cover the basics of getting started with K8s.\n\n## What is Kubernetes?\n\nKubernetes (often abbreviated as K8s) is an open-source container orchestration platform designed to automate deploying, scaling, and managing containerized applications.\n\n## Key Concepts\n\n- **Pods**: The smallest deployable units in Kubernetes\n- **Services**: A way to expose an application running on a set of Pods\n- **Deployments**: Manages the deployment and scaling of a set of Pods\n\nStay tuned for more in-depth tutorials!'
            },
            {
                slug: 'aws-best-practices',
                title: 'AWS Security Best Practices',
                date: '2025-01-10',
                excerpt: 'Learn about the most important security practices when working with AWS.',
                content: '# AWS Security Best Practices\n\nSecurity is paramount when working with cloud infrastructure. Here are some essential AWS security practices.\n\n## IAM Best Practices\n\n- Use the principle of least privilege\n- Enable MFA for root account and IAM users\n- Regularly rotate access keys\n\n## Network Security\n\n- Use VPCs and subnets effectively\n- Implement security groups and NACLs\n- Enable VPC flow logs'
            },
            {
                slug: 'terraform-infrastructure',
                title: 'Building Infrastructure with Terraform',
                date: '2025-01-05',
                excerpt: 'How to use Terraform for Infrastructure as Code to manage your cloud resources.',
                content: '# Building Infrastructure with Terraform\n\nTerraform is a powerful Infrastructure as Code tool that allows you to define and provision cloud infrastructure.\n\n## Why Terraform?\n\n- Declarative configuration\n- Multi-cloud support\n- State management\n- Great community\n\n## Basic Workflow\n\n```hcl\nprovider "aws" {\n  region = "us-east-1"\n}\n\nresource "aws_instance" "example" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "t2.micro"\n}\n```'
            }
        ];
    }

    selectPost = (post) => {
        this.setState({ selectedPost: post });
        // google analytics
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
                <div className="flex items-center justify-center h-full">
                    <div className="text-white text-lg">Loading posts...</div>
                </div>
            );
        }

        if (this.state.posts.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <div className="text-white text-xl font-semibold mb-2">No Blog Posts Yet</div>
                    <div className="text-gray-400 text-sm">
                        Check back later for updates, or add markdown files to public/blog/posts/
                    </div>
                </div>
            );
        }

        return (
            <div className="h-full overflow-y-auto p-4 md:p-6">
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Blog</h1>
                    <p className="text-gray-400 text-sm">Thoughts, tutorials, and insights on cloud, DevOps, and technology</p>
                </div>
                <div className="space-y-4">
                    {this.state.posts.map((post, index) => (
                        <div
                            key={index}
                            onClick={() => this.selectPost(post)}
                            className="cursor-pointer bg-ub-warm-grey bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all duration-200 border border-transparent hover:border-ub-orange border-opacity-0 hover:border-opacity-50"
                        >
                            <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 hover:text-ub-orange transition-colors">
                                {post.title}
                            </h2>
                            <div className="text-sm text-gray-400 mb-2">{post.date}</div>
                            <p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderPost = () => {
        const post = this.state.selectedPost;
        if (!post) return null;

        return (
            <div className="h-full overflow-y-auto p-4 md:p-6">
                <button
                    onClick={this.backToList}
                    className="mb-4 text-ub-orange hover:text-orange-300 flex items-center text-sm font-medium transition-colors"
                >
                    <span className="text-lg mr-1">←</span> Back to Posts
                </button>
                <article className="prose prose-invert max-w-none">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
                    <div className="text-sm text-gray-400 mb-6">{post.date}</div>
                    <div className="text-gray-200 prose-headings:text-white prose-a:text-ub-orange prose-a:hover:text-orange-300 prose-strong:text-white prose-code:text-ub-orange prose-pre:bg-ub-cool-grey">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </article>
            </div>
        );
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-cool-grey text-white select-none">
                {this.state.selectedPost ? this.renderPost() : this.renderPostList()}
            </div>
        );
    }
}

export const displayBlog = () => {
    return <Blog />;
}

export default Blog;
