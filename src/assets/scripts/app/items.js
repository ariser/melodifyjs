export class Note {
	constructor(tone, octave, value) {
		this.tone = tone;
		this.octave = octave;
		this.value = value;
	}
}

export class Pause {
	constructor(value) {
		this.value = value;
	}
}
