import { memo } from 'react';
import styled from 'styled-components';

// -----------------------------------------------------------------------------

const NotFoundScreen = memo(function NotFoundScreen(): JSX.Element {
	return (
		<Container>
			<Content>
				<h1>Page Not Found</h1>
			</Content>
		</Container>
	);
});

export default NotFoundScreen;

// -----------------------------------------------------------------------------

const Container = styled.div`
	flex-grow: 1;
	padding: 5vw;
	padding-top: max(52px, 5vw);
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: 512px;
	width: 100%;
`;
