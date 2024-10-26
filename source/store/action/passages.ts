import Store from 'store';

import { PassagesShow } from 'store/key/passages';

// -----------------------------------------------------------------------------

export function showPassages(): void {
	togglePassages(true);
}

export function hidePassages(): void {
	togglePassages(false);
}

export function togglePassages(show: boolean): void {
	Store.dispatch(PassagesShow, show);
}
