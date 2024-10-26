import styled from 'styled-components';

// -----------------------------------------------------------------------------

const Section = styled.div.attrs((props: GenericObject) => ({ grow: props.grow }))`
	display: flex;
	flex-direction: column;
	flex-grow: ${(props) => (props.grow ? '1' : '0')};

	& + & {
		margin-top: 32px;
	}
`;

export default Section;
