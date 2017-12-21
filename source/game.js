import Player from './player';
import Mouse from './mouse';
import Keyboard from './keyboard';
import World from './world';
import Girl from './girl';
import Wolf from './wolf';
import Debugger from './debugger';
import Menu from './menu';
import Endscreen from './endscreen';
import Timer from './timer';
import Hint from './hint';
import Messages from './messages';
import Statemashine from './statemashine';
import { randomIntInRange, generateSeed, magnitude } from './util';

export default class Game {

	constructor() {

		this.mouse = new Mouse();
		this.keyboard = new Keyboard();
		this.debugger = new Debugger();
		this.menu = new Menu();
		this.endscreen = new Endscreen();
		this.hint = new Hint();
		this.messages = new Messages();
		this.timer = null;

		// create statemashine
		this.state = new Statemashine([
			'PLAYING',
			'PAUSED',
			'MENU',
			'FINISHED',
		]);

		// set default state
		this.state.set('MENU');

		// set size
		this.width = 1280;
		this.height = 720;

		// canvas
		this.canvas = document.getElementById('c');
	  this.canvas.width = this.width;
		this.canvas.height = this.height;

		// get context
		this.context = this.canvas.getContext("2d");

		// create game seed
		this.seed = generateSeed();

		// frame counter
		this.frame = 0;

	  // set ambient light intensity
	  this.ambient = 0.3;

		this.backgroundColor = '#666';

		this.wind = 0;

	  //game elements
		this.steps = [];
		this.sisters = [];
		this.wolves = [];
	  this.player = null;
		this.world = null;

		// set current timestamp
		this.lastTimestamp = new Date();
		this.deltaTime = 0;

		// shim layer with setTimeout fallback
		window.requestAnimationFrame = (() => (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			((callback) => window.setTimeout(callback, 1000 / 60))
		))();

		this.gradient = this.context.createRadialGradient(this.width/2, this.height/2, 0, this.width/2, this.height/2, 3000);
		this.gradient.addColorStop(0, 'rgba(0,0,0,'+this.ambient+')');
		this.gradient.addColorStop(0.1, 'rgba(0,0,0,1)');

	}

	loop() {

		//update frame
		this.frame++;

		// get current time
		const now = new Date();

		// calulate deltatime
  	this.deltaTime = now - this.lastTimestamp;

		// draw current state
		this.draw();

		// update current state
		this.update(this.deltaTime);

		// save current timestamp
  	this.lastTimestamp = now;

		// request new frame and rerun loop
		requestAnimationFrame(this.loop.bind(this));

	}

	run() {

		// start the game loop
		this.loop();

	}

	play() {

		this.player = null;
		this.world = null;
		this.sisters = [];
		this.wolves = [];

		// set player
		this.player = new Player(0, 0);

    // set grid
    this.world = new World({
			game: this,
			r: 10,
			size: 140,
		});

		this.sisters = Array(6).fill().map((s, i) => {
			return new Girl(
				randomIntInRange(-this.world.radius + 200, this.world.radius - 200),
				randomIntInRange(-this.world.radius + 200, this.world.radius - 200),
				'hsl('+(60 + 270/6*i)+', 100%, 60%)',
			);
		});

		this.wolves = Array(50).fill().map((s, i) => {
			return new Wolf(
				randomIntInRange(-this.world.radius + 200, this.world.radius - 200),
				randomIntInRange(-this.world.radius + 200, this.world.radius - 200),
			);
		});

		this.timer = new Timer();

		this.messages.add('Find your 6 lost sisters and get out safely', 60*2);

		this.state.set('PLAYING');

	}

	drawDarkness() {

		// draw gradient
		this.context.fillStyle = this.gradient;
		this.context.fillRect(0, 0, this.width, this.height);

	}

	clear() {

		// clear canvas
		//this.context.clearRect(0, 0, this.width, this.height);

		// fill with ambient color
		this.context.fillStyle = this.backgroundColor;
		this.context.fillRect(0, 0, this.width, this.height);
	}

	update() {

		// check state
		switch (this.state.get()) {
			case 'MENU':

				// update menu
				this.menu.update(this);

				break;
			case 'PLAYING':

				this.wind = Math.sin(this.frame / 40);

				// update steps
				this.steps.forEach(step => {
					step.update(this);
				});

				// update sisters
				this.sisters.forEach(sister => {
					sister.update(this);
				});

				// update player
				this.player.update(this);

				// update wolves
				this.wolves.forEach(wolf => {
					wolf.update(this);
				});

				// clear keyboard
				this.keyboard.clear();

				// update hint
				this.hint.update(this);

				// update timer
				this.timer.update();

				this.messages.update();

				if(this.sisters.length <= 0){
					this.messages.add('Get out of safely!', 1);
				}

				break;
			case 'FINISHED':

				// update endscreen
				this.endscreen.update(this);

			default:

		}

	}

	draw() {

		// clear canvas
		this.clear();

		// check state
		switch (this.state.get()) {
			case 'MENU':

				// draw menu
				this.menu.draw(this);

				break;
			case 'PLAYING': {

				// get translate coordinates
				const x = this.width/2 - this.player.x;
				const y = this.height/2 - this.player.y;

				// translate the context
				this.context.translate(x, y);

				// draw steps
				this.steps.forEach(step => {
					step.draw(this);
				});

				// draw the player private function
				this.player.drawBefore(this);

				// draw the player
				this.player.draw(this);

				// draw sisters
				this.sisters.forEach(sister => {
					sister.draw(this);
				});

				// draw wolves
				this.wolves.forEach(wolf => {
					wolf.draw(this);
				});

				// draw world
				this.world.draw(this);

				// translate the context back
				this.context.translate(-x, -y);

				// draw the darkness around the player
				this.drawDarkness();

				// draw hint
				this.hint.draw(this);

				// draw timer
				this.timer.draw(this);

				this.sisters.forEach((sister, index) => {

					this.context.fillStyle = 'rgba(255,255,255,0.2)';
					this.context.beginPath();
					this.context.arc(this.width - 50 - 35 * index, 40, 15, 0, Math.PI*2);
					this.context.fill();

				});

				this.player.sisters.forEach((sister, index) => {

					let fill = sister.hoodcolor;

					if(sister.dead) {
						fill = 'red';
					}

					this.context.fillStyle = fill;
					this.context.beginPath();
					this.context.arc(this.width - 50 - 35 * 5 + index * 35, 40, 15, 0, Math.PI*2);
					this.context.fill();

				});

				if (magnitude(this.player.x, this.player.y) > this.world.radius + 200) {

					if(this.sisters.length <= 0){
						this.state.set('FINISHED');
					} else {
						// turn around
						this.messages.add('Turn around, missing sisters!', 1);
						this.player.vx *= 0.2;
						this.player.vy *= 0.2;
					}
				}

				// draw message
				this.messages.draw(this);

				break;
			}
			case 'PAUSED':

				// draw pause menu
				this.drawPause();

				break;
			case 'FINISHED':

				this.endscreen.draw(this);

				break;
			default:

		}

		// render debugger
		//this.debugger.draw(this);

	}

	pause() {
		this.state = PAUSED;
	}

	unpause() {
		this.state = PAUSED;
	}

}
