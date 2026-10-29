import { useRouter } from 'next/router';

/**
 * Returns a function that builds root-relative URLs for files in /public, honouring
 * `basePath` (set automatically when GitHub Pages serves the site from a subpath).
 * Use it in components shared between the desktop and nested pages like /about/,
 * where a plain "./images/..." would resolve against the wrong directory.
 */
export function useAssetPath() {
    const { basePath } = useRouter();
    return (path) => `${basePath}/${path.replace(/^\.?\//, '')}`;
}
