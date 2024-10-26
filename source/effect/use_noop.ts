import { useEffect } from 'react';
import noop from 'lodash/noop';

import { orArr } from 'lib/or';

// -----------------------------------------------------------------------------

export default function useNoop(deps: any[]): void {
	useEffect(noop, orArr(deps));
}
