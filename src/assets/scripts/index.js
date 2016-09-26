import Player from "./app/player";
import * as Scales from "./app/scale";
import {VALUES} from "./app/const/notes";
import {DEGREE} from "./app/const/scales";

var player = new Player();

/*player.load.then(() => {
 player.playNote('E', 2, 4);
 player.playNote('C', 2, 4);
 player.playNote('E', 2, 4);
 player.playNote('C', 2, 4);
 player.playNote('F', 2, 4);
 player.playNote('E', 2, 4);
 player.playNote('D', 2, 2);
 player.playNote('G', 2, 4);
 player.playNote('G', 2, 4);
 player.playNote('G', 2, 4);
 player.playNote('A', 2, 8);
 player.playNote('B', 2, 8);
 player.playNote('C', 3, 4);
 player.playNote('C', 3, 4);
 player.playNote('C', 3, 2);
 });*/

class RandomBar {
	items = [];
	itemsValue = 0;

	constructor(scale, octave, leadTone = null, trailTone = null) {
		if (leadTone) {
			let value;
			do {
				value = this.getValidItemValue();
			} while (value > 1 / 2);
			this.addNote(leadTone, octave, value);
		}

		var trailValue;
		if (trailTone) {
			do {
				trailValue = this.getValidItemValue();
			} while (trailValue > 1 / 2);
			this.itemsValue += trailValue;
		}

		const scaleGen = scale.randomize();
		while (this.itemsValue < 1) {
			if (Math.random() < .8) {
				this.addNote(scaleGen.next().value, octave);
			} else {
				this.addPause();
			}
		}

		if (trailTone) {
			this.addNote(trailTone, octave, trailValue);
		}
	}

	addNote(note, octave, value = null) {
		if (!value) {
			value = this.getValidItemValue();
		}
		this.items.push(new Note(note, octave, value));
		this.itemsValue += value;
	}

	getValidItemValue() {
		var value;
		do {
			value = VALUES[Math.floor(Math.random() * VALUES.length)];
		} while (this.itemsValue + value > 1);
		return value;
	}

	addPause(value = null) {
		if (!value) {
			value = this.getValidItemValue();
		}
		this.items.push(new Pause(value));
		this.itemsValue += value;
	}

	play() {
		this.items.forEach(item => {
			if (item instanceof Note) {
				player.playNote(item.tone, item.octave, item.value);
			} else if (item instanceof Pause) {
				player.pause(item.value);
			}
		});
	}
}

class Note {
	constructor(tone, octave, value) {
		this.tone = tone;
		this.octave = octave;
		this.value = value;
	}
}

class Pause {
	constructor(value) {
		this.value = value;
	}
}

player.load.then(() => {
	var scale = new Scales.Phrygian('A');
	var bars = [];
	console.log(bars);
	for (let i = 0; i < 1; i++) {
		bars.push(new RandomBar(scale, 3, scale.getNoteByDegree(DEGREE.TONIC)));
		bars.push(new RandomBar(scale, 3, scale.getNoteByDegree(DEGREE.TONIC)));
		bars.push(new RandomBar(scale, 3, scale.getNoteByDegree(DEGREE.SUBDOMINANT)));
		bars.push(new RandomBar(scale, 3, scale.getNoteByDegree(DEGREE.TONIC)));
		bars.push(new RandomBar(scale, 3, scale.getNoteByDegree(DEGREE.DOMINANT)));
		bars.push(new RandomBar(scale, 3, scale.getNoteByDegree(DEGREE.SUBDOMINANT)));
		bars.push(new RandomBar(scale, 3, scale.getNoteByDegree(DEGREE.TONIC)));
		bars.push(new RandomBar(scale, 3, scale.getNoteByDegree(DEGREE.DOMINANT), scale.getNoteByDegree(DEGREE.TONIC)));
	}
	bars.forEach(bar => bar.play());
});
