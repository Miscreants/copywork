import { memo } from 'react';

import AbstractIcon from 'Component/Icon/Abstract';

// -----------------------------------------------------------------------------

const LeftArrowIcon = memo(function LeftArrowIcon(): JSX.Element {
	return (
		<AbstractIcon viewBox="0 0 46 88">
			<path d="M45.1641 0.585784C44.383 -0.195265 43.1167 -0.195265 42.3357 0.585784L2.457 40.4644C0.504377 42.4171 0.504387 45.5829 2.45701 47.5355L42.3356 87.4141C43.1167 88.1952 44.383 88.1952 45.164 87.4141C45.9451 86.6331 45.9451 85.3667 45.164 84.5857L5.28543 44.7071C4.8949 44.3166 4.89491 43.6834 5.28543 43.2929L45.1641 3.41421C45.9451 2.63316 45.9451 1.36683 45.1641 0.585784Z" />
		</AbstractIcon>
	);
});

export default LeftArrowIcon;
