import { useEffect } from 'react';

// -----------------------------------------------------------------------------

export default function useScrollToTop(deps: any[]): void {
	useEffect(ofScrollingToTop, deps);
}

// -----------------------------------------------------------------------------

function ofScrollingToTop() {
	window.scrollTo(0, 0);
}
