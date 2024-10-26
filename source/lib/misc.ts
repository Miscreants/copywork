const EmptyString: '' = '';
const One: 1 = 1;
const S: 's' = 's';

// -----------------------------------------------------------------------------

export function s(number: number, suffix = S): string {
	return number === One ? EmptyString : suffix;
}

export function randomId(prefix = 'id'): string {
	return `${prefix}-${Math.round(Date.now() * Math.random())}`;
}
