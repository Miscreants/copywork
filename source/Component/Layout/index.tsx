import { memo } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import useTheme from 'effect/use_theme';

import Header from './Header';
import PassageLibrary from './PassageLibrary';
import Sidebar from './Sidebar';

// -----------------------------------------------------------------------------

const GlobalStyle = createGlobalStyle`
	* {
		transition: all 250ms;
		box-sizing: border-box;
		font-family: ${(props: GenericObject) => props.theme.font || 'Copse'}, serif;
	}

	html, body {
		height: 100%;
		margin: 0;
	}

	body {
		background: ${(props: GenericObject) => props.theme.backgroundColor};
		color: ${(props: GenericObject) => props.theme.foregroundColor};
	}
  `;

// -----------------------------------------------------------------------------

const Layout = memo(function Layout({ children }): JSX.Element {
	const theme = useTheme();

	//
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Container>
				<Header />
				<Sidebar />
				<PassageLibrary />
				{children}
			</Container>
		</ThemeProvider>
	);
});

export default Layout;

// -----------------------------------------------------------------------------

const Container = styled.div`
	align-content: flex-start;
	display: flex;
	height: 100%;
`;
