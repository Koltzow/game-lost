export default class Mouse {

	constructor() {

		this.x = 0;
		this.y = 0;

		document.addEventListener('mousemove', this.mousemove.bind(this));

	}

	mousemove(e) {
		this.x = e.clientX;
		this.y = e.clientY;
	}

}
