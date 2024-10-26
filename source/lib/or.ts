const EmptyString: '' = '';

// -----------------------------------------------------------------------------

export function or(value: any, defaultValue?: any): any {
	return value || defaultValue;
}

export function orArr(value: any[]): any[] {
	return or(value, []);
}

export function orObj(value: GenericObject): GenericObject {
	return or(value, {});
}

export function orEmptyString(value: any): string {
	return String(or(value, EmptyString));
}

export function or0(value: any): number {
	return or(value, 0);
}

export function orNotDefined(value: any, defaultValue: any): any {
	return value !== undefined && value !== null ? value : defaultValue;
}

// -----------------------------------------------------------------------------

export function thisIf(truthy: any, value: any, otherwise?: any): any {
	return truthy ? value : otherwise;
}

export function ifNot(truthy?: any, value?: any): any {
	return truthy ? undefined : value;
}
