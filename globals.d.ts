interface Window extends GenericObject {}

type Environment = 'development' | 'production';

type GenericObject = { [key: string]: any };

// -----------------------------------------------------------------------------

declare var ENVIRONMENT: Environment;

declare module '*.scss' {
	export const content: { [className: string]: string };
	export default content;
}

declare module '*.css' {
	export const content: { [className: string]: string };
	export default content;
}

// -----------------------------------------------------------------------------

type Method = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE';
