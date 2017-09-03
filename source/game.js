import Player from './player';
import Tree from './tree';
import Mouse from './mouse';
import Keyboard from './keyboard';

const PLAYING     = 'PLAYING';
const PAUSED      = 'PAUSED';
const MENU        = 'MENU';

export default class Game {

	constructor() {

		this.mouse = new Mouse();
		this.keyboard = new Keyboard();

		// set size
		this.width = 1280;
		this.height = 720;

		// canvas
		this.canvas = document.getElementById('c');
	  this.canvas.width = this.width;
		this.canvas.height = this.height;

		// get context
		this.context = this.canvas.getContext("2d");

		// frame counter
		this.frame = 0;

		// set default state
	  this.state = PLAYING;

	  // set ambient light intensity
	  this.ambient = 0.3;

		this.backgroundColor = '#666';

	  //game elements
	  this.trees = [];
	  this.player = null;

		// set current timestamp
		this.lastTimestamp = new Date();

		// shim layer with setTimeout fallback
		window.requestAnimationFrame = (() => (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			((callback) => window.setTimeout(callback, 1000 / 60))
		))();

		this.gradient = this.context.createRadialGradient(this.width/2, this.height/2, 0, this.width/2, this.height/2, 3000);
		this.gradient.addColorStop(0, 'rgba(0,0,0,'+this.ambient+')');
		this.gradient.addColorStop(0.2, 'rgba(0,0,0,1)');

	}

	loop() {

		//update frame
		this.frame++;

		// get current time
		const now = new Date();

		// calulate deltatime
  	const deltaTime = (now - this.lastTimestamp)/1000;

		// draw current state
		this.draw();

		// update current state
		this.update(deltaTime);

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
		this.player = new Player(this);

		// add special box for testing
		this.trees.push(new Tree(100, 100));

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

				// update player
				this.player.update(this);

				// clear keyboard
				this.keyboard.clear();

				break;
			default:

		}

	}

	draw() {

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

				// draw the player
				this.player.draw(this);

				// loop through and draw the boxes
				this.trees.every(tree => {
					tree.draw(this);
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

	}

	pause() {
		this.state = PAUSED;
	}

	unpause() {
		this.state = PAUSED;
	}

}
