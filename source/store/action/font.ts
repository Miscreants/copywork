import Store from 'store';

import { FontSet } from 'store/key/font';

// -----------------------------------------------------------------------------

export function setFont(font: string): void {
	Store.dispatch(FontSet, font);
}
