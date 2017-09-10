import Player from './player';
import Mouse from './mouse';
import Keyboard from './keyboard';
import World from './world';
import Girl from './girl';
import Wolf from './wolf';
import Debugger from './debugger';
import Menu from './menu';
import { randomIntInRange, generateSeed, magnitude } from './util';

const PLAYING     = 'PLAYING';
const PAUSED      = 'PAUSED';
const MENU        = 'MENU';
const FINISHED		= 'FINISHED';

export default class Game {

	constructor() {

		this.mouse = new Mouse();
		this.keyboard = new Keyboard();
		this.debugger = new Debugger();
		this.menu = new Menu();

		// set size
		this.width = 720;
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

		// set default state
	  this.state = MENU;

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

		// set up game for the first time
		this.setup();

		// start the game loop
		this.loop();

	}

	setup() {

		// set player
		this.player = new Player(0, 0);

    // set grid
    this.world = new World({
			game: this,
			x: 50,
			y: 50,
			size: 140,
		});

		this.sisters = Array(6).fill().map((s, i) => {
			return new Girl(randomIntInRange(-1000, 1000), randomIntInRange(-1000, 1000), 'hsl('+(60 + 270/6*i)+', 100%, 60%)');
		});

		this.wolves.push(new Wolf(-200, -200));

	}

	drawDarkness() {

		// draw gradient
		this.context.fillStyle = this.gradient;
		this.context.fillRect(0, 0, this.width, this.height);

	}

	clear() {

		// clear canvas
		this.context.clearRect(0, 0, this.width, this.height);

		// fill with ambient color
		this.context.fillStyle = 'rgb( '+Math.round(255*this.ambient)+','+Math.round(255*this.ambient)+','+Math.round(255*this.ambient)+')';
		this.context.fillStyle = this.backgroundColor;
		this.context.fillRect(0, 0, this.width, this.height);
	}

	update() {

		// check state
		switch (this.state) {
			case MENU:

				// update menu
				this.menu.update(this);

				break;
			case PLAYING:

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

				break;
			default:

		}

	}

	draw() {

		this.debugger.addFrame(Math.floor(1000/this.deltaTime));
		this.debugger.add(`Seed:  ${this.seed}`);
		this.debugger.add(`State: ${this.state}`);
		this.debugger.add(`FPS:   ${Math.floor(1000/this.deltaTime)}`);


		// clear canvas
		this.clear();

		// check state
		switch (this.state) {
			case MENU:

				// draw menu
				this.menu.draw(this);

				break;
			case PLAYING: {

				// get translate coordinates
				const x = this.width/2 - this.player.x;
				const y = this.height/2 - this.player.y;

				// translate the context
				this.context.translate(x, y);

				this.debugger.add(`Steps: ${this.steps.length}`);

				// draw steps
				this.steps.forEach(step => {
					step.draw(this);
				});

				// draw wolves
				this.wolves.forEach(wolf => {
					wolf.draw(this);
				});

				// draw the player private function
				this.player.drawBefore(this);

				// draw the player
				this.player.draw(this);

				this.debugger.add(`Chars: ${1 + this.sisters.length + this.player.sisters.length}`);

				// draw sisters
				this.sisters.forEach(sister => {
					sister.draw(this);
				});

				// draw world
				this.world.draw(this);

				// translate the context back
				this.context.translate(-x, -y);

				// draw the darkness around the player
				this.drawDarkness();

				if (magnitude(this.player.x, this.player.y) > 300) {
					this.state = FINISHED;
				}

				break;
			}
			case PAUSED:

				// draw pause menu
				this.drawPause();

				break;
			case FINISHED:
				break;
			default:

		}

		// render debugger
		this.debugger.draw(this);

	}

	end() {
		console.log('end game');
	}

	pause() {
		this.state = PAUSED;
	}

	unpause() {
		this.state = PAUSED;
	}

}
