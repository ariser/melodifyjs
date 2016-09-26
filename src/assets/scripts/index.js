import Q from "q";
import Player from "./app/player";
import * as Scales from "./app/scale";
import {VALUES, VALUES_FLUID, VALUES_SLOW, VALUES_MEDIUM} from "./app/const/notes";
import {DEGREE, DEGREES_LIST_FOR_RANDOM} from "./app/const/scales";
import {Note, Pause} from "./app/items";

var progressbar = document.querySelector('#progress');
MIDI.loadPlugin({
	soundfontUrl: '/assets/audio/',
	instrument:   ['acoustic_grand_piano', 'acoustic_guitar_steel', 'flute', 'acoustic_guitar_nylon'],
	onprogress:   (state, progress) => {
		progressbar.value = progress;
		console.log(`${state}: ${progress}`);
	},
	onsuccess:    main
});

function main() {
	MIDI.setVolume(0, 127);
	MIDI.setVolume(1, 127);
	MIDI.setVolume(2, 60);
	MIDI.setVolume(3, 127);
	MIDI.programChange(1, 25); // acoustic_guitar_steel
	MIDI.programChange(2, 73); // flute
	MIDI.programChange(3, 24); // acoustic_guitar_nylon

	var bpm = 120;
	var bassPlayer = new Player(bpm);
	var backPlayer = new Player(bpm);
	var melodyPlayer = new Player(bpm);

	// player.playNote('E', 2, 1 / 4);
	// player.playNote('C', 2, 1 / 4);
	// player.playNote('E', 2, 1 / 4);
	// player.playNote('C', 2, 1 / 4);
	// player.playNote('F', 2, 1 / 4);
	// player.playNote('E', 2, 1 / 4);
	// player.playNote('D', 2, 1 / 2);
	// player.playNote('G', 2, 1 / 4);
	// player.playNote('G', 2, 1 / 4);
	// player.playNote('G', 2, 1 / 4);
	// player.playNote('A', 2, 1 / 8);
	// player.playNote('B', 2, 1 / 8);
	// player.playNote('C', 3, 1 / 4);
	// player.playNote('C', 3, 1 / 4);
	// player.playNote('C', 3, 1 / 2);

	class RandomBar {
		items = [];
		itemsValue = 0;

		constructor(scale, octave, values = VALUES, leadTone = null, trailTone = null) {
			this.scale = scale;
			this.octave = octave;
			this.values = values;
			this.leadTone = leadTone;
			this.trailTone = trailTone;
		}

		fill() {
			if (this.leadTone) {
				let value;
				do {
					value = this.getValidItemValue();
				} while (value > 1 / 2);
				this.addNote(this.leadTone, this.octave, value);
			}

			var trailValue;
			if (this.trailTone) {
				do {
					trailValue = this.getValidItemValue();
				} while (trailValue > 1 / 2);
				this.itemsValue += trailValue;
			}

			const scaleGen = this.scale.randomize();
			while (this.itemsValue < 1) {
				if (Math.random() < .8) {
					this.addNote(scaleGen.next().value, this.octave);
				} else {
					this.addPause();
				}
			}

			if (this.trailTone) {
				this.addNote(this.trailTone, this.octave, trailValue);
			}

			return this;
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
				value = this.values[Math.floor(Math.random() * this.values.length)];
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
	}

	class BarsLine {
		bars = [];

		play(player) {
			this.bars.forEach(bar => player.playBar(bar));
		}
	}

	class BassLine extends BarsLine {
		constructor(scale, keysSeq = []) {
			super();
			keysSeq.forEach(key => {
				let bar = new RandomBar(scale, 2);
				if (!Array.isArray(key)) {
					key = [key, key]
				}
				bar.addNote(key[0], 2, 1 / 2);
				bar.addNote(key[1], 2, 1 / 2);
				this.bars.push(bar);
			});
		}
	}

	class RandomMelodyLine extends BarsLine {
		constructor(scale, octave, values, keysSeq = []) {
			super();
			keysSeq.forEach(key => {
				let bar;
				if (Array.isArray(key)) {
					bar = new RandomBar(scale, octave, values, key[0], key[1]);
				} else {
					bar = new RandomBar(scale, octave, values, key);
				}
				bar.fill();
				this.bars.push(bar);
			});
		}
	}

	Q.all([backPlayer, bassPlayer, melodyPlayer]).then(() => {
		var scale = new Scales.BluesScale('E');
		var secondScale = new Scales.Lydian('G');

		var bluesKeysSeq = [
			scale.getNoteByDegree(DEGREE.TONIC),
			scale.getNoteByDegree(DEGREE.TONIC),
			scale.getNoteByDegree(DEGREE.SUBDOMINANT),
			scale.getNoteByDegree(DEGREE.TONIC),
			scale.getNoteByDegree(DEGREE.DOMINANT),
			scale.getNoteByDegree(DEGREE.SUBDOMINANT),
			scale.getNoteByDegree(DEGREE.TONIC),
			scale.getNoteByDegree(DEGREE.DOMINANT),
			scale.getNoteByDegree(DEGREE.TONIC),
			scale.getNoteByDegree(DEGREE.TONIC),
			scale.getNoteByDegree(DEGREE.SUBDOMINANT),
			scale.getNoteByDegree(DEGREE.TONIC),
			scale.getNoteByDegree(DEGREE.DOMINANT),
			scale.getNoteByDegree(DEGREE.SUBDOMINANT),
			scale.getNoteByDegree(DEGREE.TONIC),
			[scale.getNoteByDegree(DEGREE.DOMINANT), scale.getNoteByDegree(DEGREE.TONIC)]
		];

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

		keysSeq = keysSeq.map(degree => Array.isArray(degree) ? [scale.getNoteByDegree(degree[0]), scale.getNoteByDegree(degree[1])] : scale.getNoteByDegree(degree));

		var bassline = new BassLine(scale, bluesKeysSeq);
		var backline = new RandomMelodyLine(scale, 3, VALUES_SLOW, bluesKeysSeq);
		var melodyline = new RandomMelodyLine(scale, 5, VALUES_SLOW, bluesKeysSeq);

		bassline.play(bassPlayer);
		backline.play(backPlayer);
		melodyline.play(melodyPlayer);
	});
}