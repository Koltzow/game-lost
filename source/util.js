export const rad = (x1, y1, x2, y2) => {

  //calc delta
  let dy = y1 - y2,
      dx = x1 - x2;

  //return rad
  return Math.atan2(dy, dx);

};

export const calcLight = (x, y) => {

	let dist = Math.sqrt(x * x + y * y);

	return 'hsl(0,0%,'+(dist*2-100)+'%)';
};
