import styled from 'styled-components';

// -----------------------------------------------------------------------------

const MenuItem = styled.div.attrs((props: GenericObject) => ({ disabled: props.disabled }))`
	align-items: center;
	cursor: pointer;
	display: flex;
	flex-shrink: 0;
	font-size: 1.1rem;
	opacity: ${(props) => (props.disabled ? '0.5' : 1)};
	pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};

	& svg {
		height: 18px;
		margin-right: 8px;
		width: 18px;
	}

	& + & {
		margin-top: 16px;
	}
`;

export default MenuItem;
