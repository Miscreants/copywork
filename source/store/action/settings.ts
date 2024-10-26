import Store from 'store';

import { SettingsSet } from 'store/key/settings';

// -----------------------------------------------------------------------------

export function updateSettings(settings: GenericObject = {}): void {
	Store.dispatch(SettingsSet, settings || {});
}
