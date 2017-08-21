class Game {

	constructor() {
		
		//canvas
		this.c = document.getElementById('c');
	    this.c.width = window.innerWidth;
	    this.c.height = window.innerHeight;
	    this.width = this.c.width;
	    this.height = this.c.height;
	    this.ctx = this.c.getContext("2d");
	    this.ctx.fillStyle = 0x000000;

	    //state
	    this.state = 'PLAYING';

	    //var
	    this.ambient = 0;
	    
	    //elems
	    this.boxes = [];
	    this.player = null;

	    //current timestamp
		this.lastTimestamp = new Date(); 

		// shim layer with setTimeout fallback
		window.requestAnimationFrame = (function(){
			return  window.requestAnimationFrame       ||
		          	window.webkitRequestAnimationFrame ||
		          	window.mozRequestAnimationFrame    ||
		          	function( callback ){
		            	window.setTimeout(callback, 1000 / 60);
					};
		})();
		
	}

	loop() {

  		let now = new Date();
  		let dt = (now - this.lastTimestamp)/1000;
  
  		this.draw();
  		this.update(dt);
  
  		this.lastTimestamp = now;
  		requestAnimationFrame(this.loop.bind(this));

	}

	run() {

		this.new();
		this.loop();

	}

	new() {

		//set player
		this.player = new Player(this);

		//add boxed
		for (let i = 0; i < 10; i++) {
			this.boxes.push(new Box(i*100 - 520, i*100 - 490, 50, 100));
		}

		this.boxes.push(new Box(-200, 200, 200, 200));

	}

	clear() {	
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.fillStyle = 'rgba( '+Math.floor(255*this.ambient)+', '+Math.floor(255*this.ambient)+', '+Math.floor(255*this.ambient)+', 1)';
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
	  
	update() {
		this.player.update(this);
	}

	draw() {

		//clear
		this.clear();

		//check state
		if (this.state === 'MENU') {
			
			this.drawMenu();

		} else if (this.state === 'PLAYING') {

			let x = this.width/2 - this.player.x;
			let y = this.height/2 - this.player.y;
			
			this.ctx.translate(x, y);
			
			this.player.drawLight(this);

			for (let i = 0; i < this.boxes.length; i++) {
				this.boxes[i].draw(this);
			}

			this.player.draw(this);
			this.ctx.translate(-x, -y);

		} else if (this.state === 'PAUSED') {

			this.drawPause();
		}

	}

	pause() {
		this.state = 'PAUSED';
	}

	unpause() {
		this.state = 'PLAYING';
	}

}