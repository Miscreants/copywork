import { memo } from 'react';

import AbstractIcon from 'Component/Icon/Abstract';

// -----------------------------------------------------------------------------

const CreateIcon = memo(function CreateIcon(): JSX.Element {
	return (
		<AbstractIcon viewBox="0 0 200 200">
			<path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm30-72.5H110v-20a10,10,0,0,0-20,0v20H70a10,10,0,0,0,0,20H90v20a10,10,0,0,0,20,0v-20h20a10,10,0,0,0,0-20Z" />
		</AbstractIcon>
	);
});

export default CreateIcon;
