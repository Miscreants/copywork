import { Post } from './types';
import path from 'path';

// Import all markdown files automatically
const markdownContext = require.context('./posts', true, /\.md$/);

// Helper to extract author from file path
const getAuthorFromPath = (filePath: string): string => {
    // Remove leading './' that require.context adds
    const cleanPath = filePath.replace(/^\.\//, '');
    const parts = cleanPath.split('/');
    // Author should be the first directory name
    return parts[0];
};

// Helper to generate a unique ID from path
const generateUniqueId = (filePath: string): string => {
    // Remove leading './' and '.md' extension
    return filePath.replace(/^\.\//, '').replace(/\.md$/, '');
};

// Process posts with additional validation
export const posts: Post[] = Array.from(
    new Map(
        markdownContext.keys()
            .map(key => {
                const post = markdownContext(key);
                const author = getAuthorFromPath(key);
                
                // Create a unique ID based on the full path if one isn't provided
                const id = post.attributes.id || generateUniqueId(key);
                
                // Validate author consistency
                if (post.attributes.author && post.attributes.author !== author) {
                    console.warn(
                        `Warning: Author mismatch in ${key}. ` +
                        `Directory: ${author}, Frontmatter: ${post.attributes.author}`
                    );
                }

                return {
                    id,
                    title: post.attributes.title,
                    author: post.attributes.author || author, // Fallback to directory name
                    category: post.attributes.category,
                    url: post.attributes.url || key.replace(/^\.\/|\.md$/g, ''), // Generate URL from path if not provided
                    content: post.body,
                    filePath: key // Store original path for debugging
                };
            })
            .map(post => [post.id, post])
    )
    .values()
);

// Debug utilities
export const debugPosts = {
    // List all found files
    listAllFiles: () => markdownContext.keys(),
    
    // Find posts with duplicate IDs
    findDuplicateIds: () => {
        const seen = new Map();
        markdownContext.keys().forEach(key => {
            const post = markdownContext(key);
            const id = post.attributes.id || generateUniqueId(key);
            if (seen.has(id)) {
                seen.set(id, [...seen.get(id), key]);
            } else {
                seen.set(id, [key]);
            }
        });
        return Array.from(seen.entries())
            .filter(([_, paths]) => paths.length > 1)
            .reduce((acc, [id, paths]) => ({...acc, [id]: paths}), {});
    },
    
    // Check for author consistency
    checkAuthorConsistency: () => {
        return markdownContext.keys()
            .map(key => {
                const post = markdownContext(key);
                const dirAuthor = getAuthorFromPath(key);
                const frontmatterAuthor = post.attributes.author;
                return {
                    path: key,
                    directoryAuthor: dirAuthor,
                    frontmatterAuthor,
                    isConsistent: !frontmatterAuthor || frontmatterAuthor === dirAuthor
                };
            })
            .filter(result => !result.isConsistent);
    },

    // Get full post data for debugging
    getPostData: (filePath: string) => {
        if (!markdownContext.keys().includes(filePath)) {
            return null;
        }
        const post = markdownContext(filePath);
        return {
            path: filePath,
            attributes: post.attributes,
            content: post.body
        };
    }
};