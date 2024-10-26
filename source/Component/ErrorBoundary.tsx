import { Component, ReactFragment } from 'react';

import { thisIf } from 'lib/or';

// -----------------------------------------------------------------------------

export default class ErrorBoundary extends Component {
	props: ErrorBoundaryProps;
	state: ErrorBoundaryState;

	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): GenericObject {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: GenericObject): void {
		this.setState({ hasError: true });
	}

	render(): JSX.Element {
		const { children } = this.props;
		const { hasError } = this.state;

		//
		return thisIf(hasError, <DefaultErrorMessage />, children);
	}
}

// -----------------------------------------------------------------------------

function DefaultErrorMessage() {
	return <div>There was an error loading part of the website</div>;
}

// -----------------------------------------------------------------------------

interface ErrorBoundaryProps {
	children: ReactFragment;
}

interface ErrorBoundaryState {
	hasError: boolean;
}
