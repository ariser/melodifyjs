export const NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export function getNoteInInterval(startNote, interval) {
	var startNoteIndex = NOTES.indexOf(startNote);
	return NOTES[(startNoteIndex + interval * 2) % NOTES.length];
}

export const VALUES = [
	//1,
	1 / 2,
	1 / 4,
	1 / 8,
	1 / 16,
	1 / 32
];

export const VALUES_SLOW = [
	1,
	1 / 2, 1 / 2,
	1 / 4, 1 / 4, 1 / 4, 1 / 4,
	1 / 8, 1 / 8
];

export const VALUES_FLUID = [
	1 / 8, 1 / 8, 1 / 8, 1 / 8, 1 / 8,
	1 / 16, 1 / 16, 1 / 16, 1 / 16,
	1 / 32
];

export const VALUES_FOR_RANDOM = [
//	1,
//	1 / 2,
	1 / 4,
	1 / 8, 1 / 8, 1 / 8, 1 / 8, 1 / 8,
	1 / 16, 1 / 16, 1 / 16, 1 / 16,
	1 / 32
];