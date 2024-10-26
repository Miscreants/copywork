import Store from 'store';

import { SidebarShow } from 'store/key/sidebar';

// -----------------------------------------------------------------------------

export function showSidebar(): void {
	toggleSidebar(true);
}

export function hideSidebar(): void {
	toggleSidebar(false);
}

export function toggleSidebar(show: boolean): void {
	Store.dispatch(SidebarShow, show);
}
