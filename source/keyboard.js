export default class Keybord {

	constructor() {

		// log pressed keyes
		this.pressedKeys = [];

		// add event listeners
		document.addEventListener('keydown', this.keydown.bind(this));
		document.addEventListener('keyup', this.keyup.bind(this));

	}

	keydown(event) {

		// save pressed key
		this.pressedKeys[event.keyCode] = true;
		this.pressedKeys[event.key] = true;
		this.pressedKeys[event.code] = true;

	}

	keyup(event) {

		// forget pressed key
		this.pressedKeys[event.keyCode] = false;
		this.pressedKeys[event.key] = false;
		this.pressedKeys[event.code] = false;

	}

	isPressed(key) {

		// check if key is pressed
		return this.pressedKeys[key];

	}

}
