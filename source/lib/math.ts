export function mod(n: number, o: number): number {
	return ((n % o) + o) % o;
}

export function clampMin(n: number, min: number): number {
	return Math.max(n, min);
}

export function clampMax(n: number, max: number): number {
	return Math.min(n, max);
}
