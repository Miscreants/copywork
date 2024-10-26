import styled from 'styled-components';

// -----------------------------------------------------------------------------

const AbstractIcon = styled.svg`
	cursor: pointer;
	pointer-events: none;

	& path,
	& polygon {
		fill: currentColor;
		stroke: currentColor;
	}
`;

export default AbstractIcon;
