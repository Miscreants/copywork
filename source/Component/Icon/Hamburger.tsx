import { memo } from 'react';

import AbstractIcon from 'Component/Icon/Abstract';

// -----------------------------------------------------------------------------

const HamburgerIcon = memo(function HamburgerIcon(): JSX.Element {
	return (
		<AbstractIcon viewBox="0 0 18 14">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0.46875 0.90625C0.244384 0.90625 0.0625 0.724366 0.0625 0.5C0.0625 0.275634 0.244384 0.09375 0.46875 0.09375L17.5312 0.0937515C17.7556 0.0937515 17.9375 0.275636 17.9375 0.500002C17.9375 0.724367 17.7556 0.906252 17.5312 0.906252L0.46875 0.90625ZM0.0625 7C0.0625 7.22437 0.244384 7.40625 0.46875 7.40625L17.5312 7.40625C17.7556 7.40625 17.9375 7.22437 17.9375 7C17.9375 6.77564 17.7556 6.59375 17.5312 6.59375L0.46875 6.59375C0.244384 6.59375 0.0625 6.77563 0.0625 7ZM0.0625 13.5C0.0625 13.7244 0.244384 13.9062 0.46875 13.9062L17.5312 13.9063C17.7556 13.9063 17.9375 13.7244 17.9375 13.5C17.9375 13.2756 17.7556 13.0938 17.5312 13.0938L0.46875 13.0938C0.244384 13.0938 0.0625 13.2756 0.0625 13.5Z"
			/>
		</AbstractIcon>
	);
});

export default HamburgerIcon;