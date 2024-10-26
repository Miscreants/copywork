import { memo } from 'react';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import { showPassages } from 'store/action/passages';
import { showSidebar } from 'store/action/sidebar';

import HamburgerIcon from 'Component/Icon/Hamburger';
import SquaresIcon from 'Component/Icon/Squares';

// -----------------------------------------------------------------------------

const Header = memo(function Header(): JSX.Element {
	const { sidebar_show: sidebarShow } = useStoreon('sidebar_show');

	//
	return (
		<Container>
			<Option
				onClick={(e) => {
					showSidebar();
					(e.target as HTMLButtonElement).blur();
				}}
				tabIndex={sidebarShow ? -1 : 0}
			>
				<HamburgerIcon />
			</Option>
			<Spacer />
			<Option
				onClick={(e) => {
					showPassages();
					(e.target as HTMLButtonElement).blur();
				}}
			>
				<SquaresIcon />
			</Option>
		</Container>
	);
});

export default Header;

// -----------------------------------------------------------------------------

const Container = styled.div`
	display: flex;
	left: 0;
	padding: 2.5vw;
	pointer-events: none;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 999;
`;

const Spacer = styled.div`
	flex-grow: 1;
`;

const Option = styled.button`
	appearance: none;
	align-items: center;
	background: transparent;
	border: 0;
	color: ${(props) => props.theme.foregroundColor};
	cursor: pointer;
	display: flex;
	justify-content: center;
	height: 32px;
	pointer-events: all;
	position: relative;
	width: 32px;

	& svg {
		height: 18px;
		pointer-events: none;
		width: 18px;
	}

	&:hover:after,
	&:focus:after {
		content: '';
		border: 1px ${(props) => props.theme.foregroundColor} solid;
		border-radius: 4px;
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
	}
`;
