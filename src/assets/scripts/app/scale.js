import {getNoteInInterval} from './const/notes';
import * as Scales from './const/scales';

class Scale {
	static intervals = [];
	static key = null;

	constructor(key = 'E') {
		this.key = key;
	}

	getNoteByDegree(degree) {
		return getNoteInInterval(this.key, this.constructor.intervals[degree]);
	}

	*randomize() {
		while (true) {
			let randomInterval = this.constructor.intervals[Math.floor(Math.random() * this.constructor.intervals.length)];
			let randomScaleNote = getNoteInInterval(this.key, randomInterval);
			yield randomScaleNote;
		}
	}
}

export class Aeolian extends Scale {
	static intervals = Scales.AEOLIAN;
}

export class Ionian extends Scale {
	static intervals = Scales.IONIAN;
}

export class Altered extends Scale {
	static intervals = Scales.ALTERED;
}

export class Phrygian extends Scale {
	static intervals = Scales.PHRYGIAN;
}

export class Mixolydian extends Scale {
	static intervals = Scales.MIXOLYDIAN;
}

export class Lydian extends Scale {
	static intervals = Scales.LYDIAN;
}

export class Locrian extends Scale {
	static intervals = Scales.LOCRIAN;
}

export class Dorian extends Scale {
	static intervals = Scales.DORIAN;
}

export class AllNotes extends Scale {
	static intervals = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
}

export class BluesScale extends Scale {
	static intervals = Scales.AEOLIAN_PENTATONIC;
}