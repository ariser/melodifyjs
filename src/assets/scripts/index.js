import Q from "q";
import Player from "./app/player";
import * as Scales from "./app/scale";
import {VALUES_FLUID, VALUES_SLOW, VALUES_MEDIUM, VALUES_VERY_SLOW} from "./app/const/notes";
import {BLUES_PROGRESSION, generateDegreesSequence, getKeysSequenceFromDegrees} from "./app/const/scales";
import {BassLine, RandomMelodyLine} from "./app/bars";

var progressbar = document.querySelector('#progress');
MIDI.loadPlugin({
	soundfontUrl: '../assets/audio/',
	instrument:   ['acoustic_grand_piano', 'acoustic_guitar_steel', 'flute', 'acoustic_guitar_nylon', 'violin'],
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
	MIDI.programChange(4, 40); // violin

	var bpm = 90;
	var bassPlayer = new Player(bpm);
	var backPlayer = new Player(bpm, 3);
	var melodyPlayer = new Player(bpm, 2);
	var violinPlayer = new Player(bpm, 4);

	Q.all([backPlayer, bassPlayer, melodyPlayer]).then(() => {
		var scale = new Scales.Phrygian('E');
		var secondScale = new Scales.Lydian('F');

		var bluesKeysSeq = getKeysSequenceFromDegrees(scale, BLUES_PROGRESSION);
		var keysSeq = getKeysSequenceFromDegrees(scale, generateDegreesSequence());

		var bassline = new BassLine(scale, keysSeq);
		var backline = new RandomMelodyLine(scale, 3, VALUES_SLOW, keysSeq);
		var melodyline = new RandomMelodyLine(secondScale, 5, VALUES_SLOW, keysSeq);
		var violinLine = new RandomMelodyLine(scale, 4, VALUES_VERY_SLOW, keysSeq);

		bassline.play(bassPlayer);
		backline.play(backPlayer);
		melodyline.play(melodyPlayer);
		violinLine.play(violinPlayer);
	});
}