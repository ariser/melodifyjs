import {genId} from './util';

function main () {
	var gen = genId();

	console.log(gen.next().value);
}

main();