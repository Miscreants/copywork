export function throwIf(
	truthy: any,
	message: string = 'There was an error',
	data?: GenericObject,
): void {
	if (truthy) {
		throw new Error(message);
	}
}
