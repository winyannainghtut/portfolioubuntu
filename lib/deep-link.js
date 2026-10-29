// Hand-off for deep links like /?post=<slug>: the Desktop reads the URL once at
// startup and opens the Blog app, which then claims the pending post.
let pendingPost = null;

export function setPendingPost(slug) {
    pendingPost = slug;
}

export function takePendingPost() {
    const slug = pendingPost;
    pendingPost = null;
    return slug;
}
