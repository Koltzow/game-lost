export const randomBetween = (min, max) => Math.random() * (max + min - 1) + min;

export const magnitude = (x, y) => Math.sqrt(x*x + y*y);

export const seededRandomBetween = (string = '', seed = '', min = 0, max = 1) => {

  let hash = 0;
  string += seed;
  if (string.length !== 0) {
    for (var i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }
  }

  const rand = (hash * 9301 + 49297) % 233280;
  const rnd = Math.abs(rand / 233280.0);

  return min + rnd * (max - min);

}

export const generateSeed = () => Math.random().toString(36).substring(7);

export const distanceBetween = (self, obj) => {

  const dx = self.x - obj.x;
  const dy = self.y - obj.y;

  return Math.sqrt(dx * dx + dy * dy) - (self.radius + obj.radius);

};

export const rad = (x1, y1, x2, y2) => {

  //calc delta
  let dy = y1 - y2,
      dx = x1 - x2;

  //return rad
  return Math.atan2(dy, dx);

};

export const rotatePoint = (cx, cy, angle, px, py) => {
  const s = Math.sin(angle);
  const c = Math.cos(angle);

  // translate point back to origin
  px -= cx;
  py -= cy;

	// calc new offset
  const xnew = px * c - py * s;
  const ynew = px * s + py * c;

  // translate point back
  px = xnew + cx;
  py = ynew + cy;

  // return points
  return {
    x: px,
    y: py
  };
};

export const calcLight = (x, y) => {

	let dist = Math.sqrt(x * x + y * y);

	return 'hsl(0,0%,'+(dist*2-100)+'%)';
};

// Returns a random integer between min (inclusive) and max (inclusive)
export const randomIntInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;
