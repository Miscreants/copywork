import styled from 'styled-components';

// -----------------------------------------------------------------------------

const MenuButton = styled.button`
	align-items: center;
	appearance: none;
	background: transparent;
	border: 0;
	color: ${(props) => props.theme.foregroundColor};
	cursor: pointer;
	display: flex;
	flex-grow: 1;
	font-size: 1.1rem;
	justify-content: flex-start;
	padding: 0;
`;

export default MenuButton;
