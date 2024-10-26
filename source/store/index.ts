import { createStoreon, StoreonStore } from 'storeon';
import { persistState } from '@storeon/localstorage';

import wireUpEvents from './event';

// -----------------------------------------------------------------------------

let storeonDevtools = () => {};
if (ENVIRONMENT === 'development') {
	storeonDevtools = require('storeon/devtools').storeonDevtools;
}

// -----------------------------------------------------------------------------

const Store = createStoreon([
	initialStore,
	wireUpEvents,
	persistState(['theme', 'font', 'settings']),
	storeonDevtools,
]);

export default Store;

// -----------------------------------------------------------------------------

function initialStore(store: StoreonStore): void {
	store.on('@init', initialStoreState);
}

// -----------------------------------------------------------------------------

function initialStoreState() {
	return {
		theme: document.documentElement.getAttribute('data-preferred-theme') || 'light',
		font: 'Copse',
		sidebar_show: false,
		passages_show: false,
		settings: {
			spellcheck: false,
			ignore_punctuation: true,
			autocorrect: true,
		},
	};
}
