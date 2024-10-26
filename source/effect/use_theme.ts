import { useStoreon } from 'storeon/react';

import { darkModeTheme, lightModeTheme } from 'data/theme';

// -----------------------------------------------------------------------------

export default function useTheme() {
	const { theme, font } = useStoreon('theme', 'font');
	
	if (theme) {
		return getModeTheme(theme, font);
	}

	//
	const html = document.querySelector('html');
	const preferredTheme = html.getAttribute('data-preferred-theme') || 'light';

	//
	return getModeTheme(preferredTheme, font);
}

// -----------------------------------------------------------------------------

function getModeTheme(mode: string, fontName: string): GenericObject {
	const theme = mode === 'dark' ? darkModeTheme : lightModeTheme;

	//
	return {
		...theme,
		font: fontName || 'Copse',
	};
}