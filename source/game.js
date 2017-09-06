import Player from './player';
import Mouse from './mouse';
import Keyboard from './keyboard';
import Grid from './grid';
import Girl from './girl';
import Wolf from './wolf';
import Debugger from './debugger';
import { randomIntInRange, generateSeed } from './util';

const PLAYING     = 'PLAYING';
const PAUSED      = 'PAUSED';
const MENU        = 'MENU';

export default class Game {

	constructor() {

		this.mouse = new Mouse();
		this.keyboard = new Keyboard();
		this.debugger = new Debugger();

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

		// set default state
	  this.state = PLAYING;

	  // set ambient light intensity
	  this.ambient = 0.3;

		this.backgroundColor = '#666';

		this.wind = 0;

	  //game elements
	  this.trees = [];
		this.steps = [];
		this.sisters = [];
		this.wolves = [];
	  this.player = null;
    this.grid = null;

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
    this.grid = new Grid();

		this.sisters = Array(6).fill().map((s, i) => {
			return new Girl(randomIntInRange(-1000, 1000), randomIntInRange(-1000, 1000), 'hsl('+(60 + 270/6*i)+', 100%, 60%)');
		});

		this.wolves.push(new Wolf(-200, -200));

		// add boxes
    // this.grid.drawBoxes(this);

		// add trees
    this.grid.addTrees(this);

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
		this.debugger.add(`State: ${this.state}`);
		this.debugger.add(`FPS:   ${Math.floor(1000/this.deltaTime)}`);


		// clear canvas
		this.clear();

		// check state
		switch (this.state) {
			case MENU:

				// draw menu
				this.drawMenu();

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

				this.debugger.add(`Trees: ${this.trees.length}`);

				// loop through and draw the boxes
				this.trees.forEach(tree => {
					tree.draw(this);
				});

				this.debugger.add(`Chars: ${1 + this.sisters.length + this.player.sisters.length}`);

				// draw sisters
				this.sisters.forEach(sister => {
					sister.draw(this);
				});

				// translate the context back
				this.context.translate(-x, -y);

				// draw the darkness around the player
				// this.drawDarkness();

				break;
			}
			case PAUSED:

				// draw pause menu
				this.drawPause();

				break;
			default:

		}

		// render debugger
		this.debugger.draw(this);

	}

	pause() {
		this.state = PAUSED;
	}

	unpause() {
		this.state = PAUSED;
	}

}
