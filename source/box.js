class Box {

	constructor(x = 0, y = 0, width = 0, height = 0) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	draw(g) {

		let s = 4000;

		let px = g.player.x,
			py = g.player.y;

		let a = [{ x: this.x, y: this.y, rad: rad(this.x, this.y, px, py)},
				{ x: this.x, y: this.y + this.height, rad: rad(this.x, this.y + this.height, px, py)},
				{ x: this.x + this.width, y: this.y, rad: rad(this.x + this.width, this.y, px, py)},
				{ x: this.x + this.width, y: this.y + this.height, rad: rad(this.x + this.width, this.y + this.height, px, py)}];

		a.sort(function(b,c){

			if(b.rad - c.rad > Math.PI) {
				return -1;
			}

			if(b.rad - c.rad < -Math.PI) {
				return 1;
			}

			return (b.rad > c.rad);
		});

		// a[0].rad += (a[0].rad - g.player.rad) * 0.1;
		// a[1].rad += (a[1].rad - g.player.rad) * 0.1;
		// a[2].rad += (a[2].rad - g.player.rad) * 0.1;
		// a[3].rad += (a[3].rad - g.player.rad) * 0.1;

		//g.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';

		let gradient = g.ctx.createRadialGradient(this.x + this.width/2, this.y + this.height/2, 0, this.x + this.width/2, this.y + this.height/2, 200);
		gradient.addColorStop(0, 'rgba(0,0,0,0.9)');
		gradient.addColorStop(1, 'rgba(0,0,0,0)');
		g.ctx.fillStyle = gradient;

		g.ctx.beginPath();
		g.ctx.moveTo(a[0].x, a[0].y);
    	g.ctx.lineTo(a[0].x + s * Math.cos(a[0].rad), a[0].y + s * Math.sin(a[0].rad));
    	g.ctx.lineTo(a[3].x + s * Math.cos(a[3].rad), a[3].y + s * Math.sin(a[3].rad));
    	g.ctx.lineTo(a[3].x, a[3].y);
    	g.ctx.fill();

		g.ctx.fillStyle = '#000';
		g.ctx.fillRect(this.x, this.y, this.width, this.height);
	}

}