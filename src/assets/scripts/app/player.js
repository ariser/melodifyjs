import Q from "q";

var WHOLE_NOTE_LENGTH = 2; // seconds

class Player {
	load = null;

	constructor(bpm = 120) {
		var progressbar = document.querySelector('#progress');

		var defer = Q.defer();
		this.load = defer.promise;

		WHOLE_NOTE_LENGTH = 60 / (bpm / 4);

		MIDI.loadPlugin({
			soundfontUrl: '/assets/audio/',
			instrument:   'acoustic_grand_piano',
			onprogress:   (state, progress) => {
				progressbar.value = progress;
				console.log(`${state}: ${progress}`);
			},
			onsuccess:    () => {

				MIDI.setVolume(0, 127);
				defer.resolve();
			}
		});
	}

	delay = 1;

	playNote(note, octave, value) {
		var midiNote = MIDI.keyToNote[note + octave];
		MIDI.noteOn(0, midiNote, 127, this.delay);
		MIDI.noteOff(0, midiNote, this.delay + WHOLE_NOTE_LENGTH * value);
		this.delay += WHOLE_NOTE_LENGTH * value;
	}

	pause(value) {
		this.delay += WHOLE_NOTE_LENGTH * value;
	}
}

export default Player;