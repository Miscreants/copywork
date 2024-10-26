import { memo } from 'react';

import AbstractIcon from 'Component/Icon/Abstract';

// -----------------------------------------------------------------------------

const NewDocumentIcon = memo(function NewDocumentIcon(): JSX.Element {
	return (
		<AbstractIcon viewBox="0 0 76 88">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M46.817 6.31953L58.333 17.7396L69.5342 28.4702C71.1093 29.9791 72 32.0658 72 34.2471V76C72 80.4183 68.4183 84 64 84H12C7.58172 84 4 80.4183 4 76V12C4 7.58172 7.58172 4 12 4H41.1838C43.294 4 45.3186 4.83369 46.817 6.31953ZM49.6335 3.47929L61.125 14.875L72.3013 25.5817C74.664 27.8451 76 30.9752 76 34.2471V76C76 82.6274 70.6274 88 64 88H12C5.37258 88 0 82.6274 0 76V12C0 5.37258 5.37258 0 12 0H41.1838C44.349 0 47.386 1.25054 49.6335 3.47929ZM14 42C12.8954 42 12 42.8954 12 44C12 45.1046 12.8954 46 14 46L62 46C63.1046 46 64 45.1046 64 44C64 42.8954 63.1046 42 62 42L14 42ZM12 64C12 62.8954 12.8954 62 14 62L62 62C63.1046 62 64 62.8954 64 64C64 65.1046 63.1046 66 62 66L14 66C12.8954 66 12 65.1046 12 64ZM14 22C12.8954 22 12 22.8954 12 24C12 25.1046 12.8954 26 14 26L36 26C37.1046 26 38 25.1046 38 24C38 22.8954 37.1046 22 36 22L14 22Z"
			/>
		</AbstractIcon>
	);
});

export default NewDocumentIcon;