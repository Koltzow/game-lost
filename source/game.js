import Player from './player';
import Box from './box';
import Mouse from './mouse';
import Keyboard from './keyboard';
import Grid from './grid';

import { randomIntInRange } from './util';

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

		// set default state
	  this.state = PLAYING;

	  // set ambient light intensity
	  this.ambient = 0.3;

		this.backgroundColor = '#666';

	  //game elements
	  this.boxes = [];
	  this.player = null;
    this.grid = null;

    // set map dimensions
    this.columns = 20;
    this.rows = 20;

		// set current timestamp
		this.lastTimestamp = new Date();

		// shim layer with setTimeout fallback
		window.requestAnimationFrame = (() => (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			((callback) => window.setTimeout(callback, 1000 / 60))
		))();

	}

	loop() {

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

    // set grid
    this.grid = new Grid(this);

		// add boxes
    this.grid.drawBoxes(this);

		// add special box for testing
		//this.boxes.push(new Box(-200, 200, 200, 200));

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

				// loop through and draw the boxes
				for (let i = 0; i < this.boxes.length; i++) {
					this.boxes[i].draw(this);
				}

				// draw the player
				this.player.draw(this);

				// translate the context back
				this.context.translate(-x, -y);

				// draw the darkness around the player
				this.player.drawDarkness(this);

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
