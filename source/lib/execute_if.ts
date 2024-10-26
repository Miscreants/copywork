import { orArr } from 'lib/or';

// -----------------------------------------------------------------------------

export default function executeIf(
	truthy: any,
	then: Function,
	parameters?: any[],
	otherwise?: Function,
): any {
	return truthy
		? then(...orArr(parameters))
		: otherwise
		? otherwise(...orArr(parameters))
		: undefined;
}
