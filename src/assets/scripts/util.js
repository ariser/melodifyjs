export function* genId() {
	var index = 0;
	while (true) {
		yield index++;
	}
}