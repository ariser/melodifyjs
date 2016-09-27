export const DEGREE = {
	TONIC: 0,
	SUPERTONIC: 1,
	MEDIANT: 2,
	SUBDOMINANT: 3,
	DOMINANT: 4,
	SUBMEDIANT: 5,
	SUBTONIC: 6
};

const DEGREES_LIST_FOR_RANDOM = [
	DEGREE.TONIC,
	DEGREE.TONIC,
	DEGREE.SUPERTONIC,
	DEGREE.MEDIANT,
	DEGREE.MEDIANT,
	DEGREE.SUBDOMINANT,
	DEGREE.SUBDOMINANT,
	DEGREE.SUBDOMINANT,
	DEGREE.SUBDOMINANT,
	DEGREE.DOMINANT,
	DEGREE.DOMINANT,
	DEGREE.DOMINANT,
	DEGREE.DOMINANT,
	DEGREE.SUBMEDIANT,
	DEGREE.SUBMEDIANT,
	DEGREE.SUBTONIC
];

export const IONIAN = [0, 1, 2, 2.5, 3.5, 4.5, 5.5];

export const DORIAN = [0, 1, 1.5, 2.5, 3.5, 4.5, 5];

export const PHRYGIAN = [0, 0.5, 1.5, 2.5, 3.5, 4, 5];

export const LYDIAN = [0, 1, 2, 3, 3.5, 4.5, 5.5];

export const MIXOLYDIAN = [0, 1, 2, 2.5, 3.5, 4.5, 5];

export const AEOLIAN = [0, 1, 1.5, 2.5, 3.5, 4, 5];

export const LOCRIAN = [0, 0.5, 1.5, 2.5, 3, 3.5, 4.5];

export const ALTERED = [0, 0.5, 1.5, 2, 3, 4, 5];

export const AEOLIAN_PENTATONIC = [0, 0, 1.5, 2.5, 3.5, 3.5, 5];

export const BLUES_PROGRESSION = [
	DEGREE.TONIC,
	DEGREE.TONIC,
	DEGREE.SUBDOMINANT,
	DEGREE.TONIC,
	DEGREE.DOMINANT,
	DEGREE.SUBDOMINANT,
	DEGREE.TONIC,
	DEGREE.DOMINANT,
	DEGREE.TONIC,
	DEGREE.TONIC,
	DEGREE.SUBDOMINANT,
	DEGREE.TONIC,
	DEGREE.DOMINANT,
	DEGREE.SUBDOMINANT,
	DEGREE.TONIC,
	[DEGREE.DOMINANT, DEGREE.TONIC]
];

export function generateDegreesSequence() {
	var keysSeq = [];
	for (let i = 0; i < 16; i++) {
		let key = DEGREES_LIST_FOR_RANDOM[Math.floor(Math.random() * DEGREES_LIST_FOR_RANDOM.length)];
		if (i % 4 == 0) {
			key = DEGREE.TONIC;
		}
		if ((i + 1) % 4 == 0) {
			key = [key, DEGREE.TONIC];
		}
		keysSeq.push(key);
	}
	return keysSeq;
}

export function getKeysSequenceFromDegrees(scale, degrees) {
	return degrees.map(degree => Array.isArray(degree) ? [scale.getNoteByDegree(degree[0]), scale.getNoteByDegree(degree[1])] : scale.getNoteByDegree(degree));
}