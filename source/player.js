import { distanceBetween } from './util';
import Step from './step';
import Girl from './girl';

export default class Player extends Girl {

	constructor(x = 0, y = 0) {

    super(x, y, '#FF005A');

		this.radius = 12;
		this.speed = 0.3;
		this.friction = 0.9;
		this.sisters = [];
		this.history = Array(6*20).fill([0,0]);
		this.colliding = false;

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
		const radian = Math.atan2(this.vy, this.vx);

		// get change
		let diff = radian - this.radian;

		if(diff < -Math.PI){
			diff += Math.PI*2;
		} else if (diff > Math.PI) {
			diff -= Math.PI*2;
		}

		// apply rotation with lerp
		this.radian += diff * 1;

		// update position
		this.x += this.vx;
		this.y += this.vy;

		if(Math.abs(Math.sqrt(this.vx*this.vx + this.vy*this.vy)) > 1){
			this.history.unshift([this.x, this.y]);
			if(this.history.length > 1000){
				this.history.pop();
			}
		}

		if(game.frame % 10 === 0 && (Math.round(this.vx) !== 0 || Math.round(this.vy) !== 0)){

			// add footstep
			const step = new Step(this.x,this.y);
			game.steps.unshift(step);

		}

		// apply friction
		this.vx *= this.friction;
		this.vy *= this.friction;

		// reset colliding
		this.colliding = false;

		// test collision with sisters
		game.sisters.forEach((sister, i) => {
			if(distanceBetween(this, sister) < 0){
				this.sisters.unshift(sister);
				game.sisters.splice(i, 1);
			}
		});

		this.sisters.forEach((sister, i)=> {
			if (sister.dead){
				return;
			}

			const dx = (this.history[i*15 + 15][0] - sister.x) * 0.1;
			const dy = (this.history[i*15 + 15][1] - sister.y) * 0.1;
			sister.radian = Math.atan2(dy, dx);
			sister.x += dx;
			sister.y += dy;
		});
	}

  drawBefore(game) {

    this.sisters.forEach(sister=> {
			sister.draw(game);
		});

  }

}
