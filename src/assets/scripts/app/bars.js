import {VALUES} from "./const/notes";
import {Note, Pause} from "./items";

export class RandomBar {
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

export class BassLine extends BarsLine {
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

export class RandomMelodyLine extends BarsLine {
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
