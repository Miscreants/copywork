import { StoreonStore } from 'storeon';

import { FontSet } from 'store/key/font';
import { PassagesShow } from 'store/key/passages';
import { SettingsSet } from 'store/key/settings';
import { SidebarShow } from 'store/key/sidebar';
import { ThemeSet } from 'store/key/theme';

// -----------------------------------------------------------------------------

export default function wireUpEvents(store: StoreonStore): void {
	store.on(SettingsSet, onSettingsSet);
	store.on(ThemeSet, onThemeSet);
	store.on(FontSet, onFontSet);
	store.on(SidebarShow, onSidebarShow);
	store.on(PassagesShow, onPassagesShow);
}

// -----------------------------------------------------------------------------

function onSettingsSet(store: StoreonStore, settings: GenericObject): GenericObject {
	return { settings };
}

// -----------------------------------------------------------------------------

function onThemeSet(store: StoreonStore, theme: 'light' | 'dark'): GenericObject {
	document.documentElement.setAttribute('data-theme', theme);

	//
	return { theme };
}

// -----------------------------------------------------------------------------

function onFontSet(store: StoreonStore, font: string): GenericObject {
	return { font };
}

// -----------------------------------------------------------------------------

function onSidebarShow(store: StoreonStore, show: boolean): GenericObject {
	return { sidebar_show: show };
}

// -----------------------------------------------------------------------------

function onPassagesShow(store: StoreonStore, show: boolean): GenericObject {
	return { passages_show: show };
}
