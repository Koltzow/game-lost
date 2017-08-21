class KeyListener {

	constructor() {

		this.pressedKeys = [];

		document.addEventListener('keydown', this.keydown.bind(this));
    	document.addEventListener('keyup', this.keyup.bind(this));
	}

    keydown(e) {
	    this.pressedKeys[e.keyCode] = true;
	}
	 
	keyup(e) {
	    this.pressedKeys[e.keyCode] = false;
	}

	isPressed(key) {
	    return this.pressedKeys[key] ? true : false;
	}

}