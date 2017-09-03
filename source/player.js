export default class Player {

	constructor() {

		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.radian = 0;
		this.radius = 15;
		this.speed = 0.5;
		this.friction = 0.9;
		this.colliding = false;
		this.facecolor = '#FFDABC';
		this.hoodcolor = '#FF3E5F';

	}

	testCollision(obj) {

		const dx = this.x - obj.x;
		const dy = this.y - obj.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < this.radius + obj.radius) {
			this.colliding = true;
			return true;
		}

		return false;

	}

	resolveCollision(obj) {

	}

	update(game) {

		// get relevant variables
		const {keyboard, mouse} = game;

		// check for left keys
		if (keyboard.isPressed(keyboard.ARROW_LEFT) || keyboard.isPressed('a')) {
			this.vx -= this.speed;
		}

		// check for right keys
		if (keyboard.isPressed(keyboard.ARROW_RIGHT) || keyboard.isPressed('d')) {
			this.vx += this.speed;
		}

		// check for up keys
		if (keyboard.isPressed(keyboard.ARROW_UP) || keyboard.isPressed('w')) {
			this.vy -= this.speed;
		}

		// check for down keys
		if(keyboard.isPressed(keyboard.ARROW_DOWN) || keyboard.isPressed('s')){
			this.vy += this.speed;
		}

		// calculate radian
		this.radian = Math.atan2(this.vy, this.vx);

		// update position
		this.x += this.vx;
		this.y += this.vy;

		// apply friction
		this.vx *= this.friction;
		this.vy *= this.friction;

		// reset colliding
		this.colliding = false;

		game.trees.every(tree => {
			if(this.testCollision(tree)){
				this.resolveCollision(tree);
			}
		});
	}

	draw(game) {

		// draw circle
		game.context.fillStyle = this.hoodcolor;
		game.context.beginPath();
		game.context.arc( this.x, this.y, this.radius, 0, 2*Math.PI );
		game.context.fill();

		// draw face
		game.context.fillStyle = this.facecolor;
		game.context.beginPath();
		game.context.arc( this.x, this.y, this.radius, this.radian - 1.1, this.radian + 1.1 );
		game.context.fill();
	}

}
