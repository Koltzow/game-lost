class Player {

	constructor() {

        this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.rad = 0;
		this.radius = 10;
		this.speed = 0.5;
		this.friction = 0.9;
		this.colliding = false;
		this.jumping = false;

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

	update(g) {

		let deltaY = mouse.y - g.height/2;
		let deltaX = mouse.x - g.width/2;
		this.rad = Math.atan2(deltaY, deltaX);

		//left
		if (keyboard.isPressed(37)) {
			//let rad = this.rad - 0.5 * Math.PI;
			//this.vy += Math.sin(rad) * this.speed;
			//this.vx += Math.cos(rad) * this.speed;
			this.vx -= this.speed;
		}
		
		//right
		if (keyboard.isPressed(39)) {
			//let rad = this.rad - 0.5 * Math.PI;
			//this.vy -= Math.sin(rad) * this.speed;
			//this.vx -= Math.cos(rad) * this.speed;
			this.vx += this.speed;
		}

		//up
		if (keyboard.isPressed(38)) {
			//this.vy += Math.sin(this.rad) * this.speed;
			//this.vx += Math.cos(this.rad) * this.speed;
			this.vy -= this.speed;
		}
		
		//down
		if(keyboard.isPressed(40)){
			//this.vy -= Math.sin(this.rad) * this.speed;
			//this.vx -= Math.cos(this.rad) * this.speed;
			this.vy += this.speed;
		}	
		
		//pos
		this.x += this.vx;
		this.y += this.vy;

		//friction
		this.vx *= this.friction;
		this.vy *= this.friction;

		this.colliding = false;

		for (let i = 0; i < g.boxes.length; i++) {
			if(this.testCollision(g.boxes[i])){

				this.resolveCollision(g.boxes[i]);							
			}
		}
	}

	drawLight(g) {

		let gradient = g.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.light.radius);
		gradient.addColorStop(0, 'rgba(255,255,255,0.1)');
		gradient.addColorStop(1, 'rgba(255,255,255,0)');
		g.ctx.fillStyle = gradient;

		//draw circle
		g.ctx.beginPath();
		g.ctx.arc(
			this.x,
			this.y,
			this.light.radius,
			0,
			2 * Math.PI
		);

		g.ctx.fill();

		gradient.addColorStop(0, 'rgba(255,255,255,'+this.light.brightness+')');
		gradient.addColorStop(1, 'rgba(255,255,255,0)');
		g.ctx.fillStyle = gradient;

		//draw circle
		g.ctx.beginPath();
		g.ctx.arc(
			this.x,
			this.y,
			this.light.radius,
			this.rad - this.light.fov,
			this.rad + this.light.fov
		);
		g.ctx.lineTo(this.x, this.y);
		
		g.ctx.fill();
	}
 
	draw(g) {

		//draw circle
		g.ctx.beginPath();
		g.ctx.arc(
			this.x,
			this.y,
			this.radius,
			0,
			2*Math.PI
		);
		g.ctx.fillStyle = 'rgb(255, 255, 255)';
		g.ctx.fill();
	}

}