import styled from 'styled-components';

// -----------------------------------------------------------------------------

const Menu = styled.div.attrs((props: GenericObject) => ({ grow: props.grow }))`
	display: flex;
	flex-direction: column;
	flex-grow: ${(props) => (props.grow ? '1' : '0')};
`;

export default Menu;
