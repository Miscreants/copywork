declare module '*.md' {
    const attributes: {
        id: string;
        title: string;
        author: string;
        category: string;
        url: string;
    };
    const body: string;
    export { attributes, body };
}

// Add webpack require.context type
interface WebpackContext {
    keys(): string[];
    (id: string): any;
    <T>(id: string): T;
    resolve(id: string): string;
    /** The module id of the context module. This may be useful for module.hot.accept. */
    id: string;
}

interface NodeRequire {
    context(
        directory: string,
        useSubdirectories: boolean,
        regExp: RegExp
    ): WebpackContext;
}