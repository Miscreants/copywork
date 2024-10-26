import Store from 'store';

import { ThemeSet } from 'store/key/theme';

// -----------------------------------------------------------------------------

export function updateTheme(theme: 'light' | 'dark'): void {
	Store.dispatch(ThemeSet, theme);
}
