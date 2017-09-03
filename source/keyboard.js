export default class Keybord {

	constructor() {

		// log pressed and pressed keyes
		this.pressedKeys = {};
		this.clickedKeys = {};

		//constants
		this.ARROW_LEFT  = 'ArrowLeft';
		this.ARROW_RIGHT = 'ArrowRight';
		this.ARROW_UP    = 'ArrowUp';
		this.ARROW_DOWN  = 'ArrowDown';

		// add event listeners
		document.addEventListener('keydown', this.keydown.bind(this));
		document.addEventListener('keyup', this.keyup.bind(this));

	}

	clear() {

		// clear clicked key each update
		this.clickedKeys = {};

	}

	keydown(event) {

		// check to se if key is not already pressed
		if (
			!this.isPressed(event.which) ||
			!this.isPressed(event.keyCode) ||
			!this.isPressed(event.key) ||
			!this.isPressed(event.code)
		) {
			// save clicked key
			this.clickedKeys[event.which] = true;
			this.clickedKeys[event.keyCode] = true;
			this.clickedKeys[event.key] = true;
			this.clickedKeys[event.code] = true;
		}

		// save pressed key
		this.pressedKeys[event.which] = true;
		this.pressedKeys[event.keyCode] = true;
		this.pressedKeys[event.key] = true;
		this.pressedKeys[event.code] = true;

	}

	keyup(event) {

		// forget pressed key
		this.pressedKeys[event.which] = false;
		this.pressedKeys[event.keyCode] = false;
		this.pressedKeys[event.key] = false;
		this.pressedKeys[event.code] = false;

	}

	isPressed(key) {

		// check if key is pressed
		return this.pressedKeys[key];

	}

	isClicked(key) {

		// check if key is clicked
		return this.clickedKeys[key];

	}

}
