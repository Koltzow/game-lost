const ARROW_LEFT  = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_UP    = 'ArrowUp';
const ARROW_DOWN  = 'ArrowDown';

export default class Player {

	constructor() {

		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.rad = 0;
		this.radius = 15;
		this.speed = 0.5;
		this.friction = 0.9;
		this.colliding = false;
		this.jumping = false;
		this.facecolor = '#FFDABC';
		this.hoodcolor = '#FF3E5F';
    this.light = {
    	fov: 1,
    	radius: 300,
    	brightness: 0.5
    };

	}

	testCollision(obj) {

		if(
			this.x + this.radius > obj.x &&
			this.x - this.radius < obj.x + obj.width &&
			this.y + this.radius > obj.y &&
			this.y - this.radius < obj.y + obj.height
		){
			this.colliding = true;
			return true;
		}

		return false;
	}

	resolveCollision(obj) {

		let shortest = 100000;
		let resolve = {
			x: 0,
			y: 0
		};

		let left = this.x + this.radius - obj.x;
		let right = obj.x + obj.width - (this.x - this.radius);
		let top = this.y + this.radius - obj.y;
		let bottom = obj.y + obj.height - (this.y - this.radius);

		if (left < shortest) {

			shortest = left;

			resolve = {
				x: -left,
				y: 0
			};
		}

		if(right < shortest) {

			shortest = right;

			resolve = {
				x: right,
				y: 0
			};

		}

		if(top < shortest) {

			shortest = top;

			resolve = {
				x: 0,
				y: -top
			};
		}

		if(bottom < shortest) {

			shortest = bottom;

			resolve = {
				x: 0,
				y: bottom
			};
		}

		this.x += resolve.x;
		this.y += resolve.y;

	}

	update(game) {

		const {keyboard, mouse} = game;

		//left
		if (keyboard.isPressed(ARROW_LEFT) || keyboard.isPressed('a')) {
			this.vx -= this.speed;
		}

		//right
		if (keyboard.isPressed(ARROW_RIGHT) || keyboard.isPressed('d')) {
			this.vx += this.speed;
		}

		//up
		if (keyboard.isPressed(ARROW_UP) || keyboard.isPressed('w')) {
			this.vy -= this.speed;
		}

		//down
		if(keyboard.isPressed(ARROW_DOWN) || keyboard.isPressed('s')){
			this.vy += this.speed;
		}

		this.rad = Math.atan2(this.vy, this.vx);

		//pos
		this.x += this.vx;
		this.y += this.vy;

		//friction
		this.vx *= this.friction;
		this.vy *= this.friction;

		this.colliding = false;

		for (let i = 0; i < game.boxes.length; i++) {
			if(this.testCollision(game.boxes[i])){

				this.resolveCollision(game.boxes[i]);
			}
		}
	}

	drawDarkness(game) {

		let gradient = game.context.createRadialGradient(game.width/2, game.height/2, 0, game.width/2, game.height/2, this.light.radius*10);
		gradient.addColorStop(0, 'rgba(0,0,0,'+game.ambient+')');
		gradient.addColorStop(0.2, 'rgba(0,0,0,1)');
		game.context.fillStyle = gradient;

		game.context.fillRect(0, 0, game.width, game.height);

	}

	drawLight(game) {

		let gradient = game.context.createRadialGradient(game.width/2, game.height/2, 0, game.width/2, game.height/2, this.light.radius*10);
		gradient.addColorStop(0, 'rgba(255,255,255,1)');
		gradient.addColorStop(1, 'rgba(255,255,255,0)');
		game.context.fillStyle = gradient;

		//draw circle
		game.context.beginPath();
		game.context.arc(
			this.x,
			this.y,
			this.light.radius,
			this.rad - this.light.fov,
			this.rad + this.light.fov
		);
		game.context.lineTo(this.x, this.y);

		game.context.fill();
	}

	draw(game) {

		// set color
		game.context.fillStyle = this.hoodcolor;

		// draw circle
		game.context.beginPath();
		game.context.arc(
			this.x,
			this.y,
			this.radius,
			0,
			2*Math.PI
		);

		game.context.fill();

		game.context.fillStyle = this.facecolor;

		// draw face
		game.context.beginPath();
		game.context.arc(
			this.x,
			this.y,
			this.radius,
			this.rad - 1.1,
			this.rad + 1.1
		);

		game.context.fill();
	}

}
