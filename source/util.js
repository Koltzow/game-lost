const rad = (x1, y1, x2, y2) => {
	
  //calc delta
  let dy = y1 - y2,
      dx = x1 - x2;

  //return rad
  return Math.atan2(dy, dx);

}