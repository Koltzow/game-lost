class Box {

	constructor(x = 0, y = 0, width = 0, height = 0) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	draw(game) {

		// draw distance of shadows
		let drawdist = 4000;

		// deconstruct objects
		const {player, context} = game;
		const {x: px, y: py} = player;
		const {x, y, width: w, height: h} = this;

		// define corners and angle in radians to player
		let corners = [
			{ x: x, y: y, rad: rad(x, y, px, py)},
			{ x: x, y: y + h, rad: rad(x, y + h, px, py)},
			{ x: x + w, y: y, rad: rad(x + w, y, px, py)},
			{ x: x + w, y: y + h, rad: rad(x + w, y + h, px, py)}
		];

		// sort corners by angle clockwise
		corners.sort(function(a, b){

			if(a.rad - b.rad > Math.PI) {
				return -1;
			}

			if(a.rad - b.rad < -Math.PI) {
				return 1;
			}

			return (a.rad > b.rad);
		});

		// define gradient
		let gradient = context.createRadialGradient(x + w/2, y + h/2, 0, x + w/2, y + h/2, 200);
		gradient.addColorStop(0, 'rgba(0,0,0,'+(1-game.ambient)+')');
		gradient.addColorStop(1, 'rgba(0,0,0,0)');

		// get edges
		const [l, , ,r] = corners;

		// draw shadow
		context.beginPath();
		context.moveTo(l.x, l.y);
    context.lineTo(l.x + drawdist * Math.cos(l.rad), l.y + drawdist * Math.sin(l.rad));
    context.lineTo(r.x + drawdist * Math.cos(r.rad), r.y + drawdist * Math.sin(r.rad));
    context.lineTo(r.x, r.y);
		context.fillStyle = gradient;
    context.fill();

		// calculate distance between box and player
		const multiplier = 0.1;
		const offsetX = (x+w/2 - px) * multiplier;
		const offsetY = (y+h/2 - py) * multiplier;

		//draw vertical side
		context.beginPath();

		// draw vertical side
		if (offsetY > 0){
			context.moveTo(x, y);
	    context.lineTo(x+w, y);
	    context.lineTo(x+w+offsetX, y+offsetY);
	    context.lineTo(x+offsetX, y+offsetY);
			context.fillStyle = (py > y) ? '#222' : calcLight(offsetX, offsetY - h/2);
		} else {
			context.moveTo(x, y+h);
	    context.lineTo(x+w, y+h);
	    context.lineTo(x+w+offsetX, y+h+offsetY);
	    context.lineTo(x+offsetX, y+h+offsetY);
			context.fillStyle = (py < y+h) ? '#222' : calcLight(offsetX, offsetY + h/2);
		}

		context.fill();

		//draw vertical side
		context.beginPath();

		if (offsetX > 0){
			context.moveTo(x, y);
			context.lineTo(x+offsetX, y+offsetY);
			context.lineTo(x+offsetX, y+h+offsetY);
			context.lineTo(x, y+h);
			context.fillStyle = (px > x) ? '#222' : calcLight(offsetX - w/2, offsetY);
		} else {
			context.moveTo(x+w, y);
			context.lineTo(x+w+offsetX, y+offsetY);
			context.lineTo(x+w+offsetX, y+h+offsetY);
			context.lineTo(x+w, y+h);
			context.fillStyle = (px < x+w) ? '#222' : calcLight(offsetX + w/2, offsetY);
		}

		context.fill();

		// draw box top
		context.fillStyle = '#222';
		context.fillRect(x + offsetX, y + offsetY, w, h);


	}

}
