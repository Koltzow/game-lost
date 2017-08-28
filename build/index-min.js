"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var ARROW_LEFT="ArrowLeft",ARROW_RIGHT="ArrowRight",ARROW_UP="ArrowUp",ARROW_DOWN="ArrowDown",PLAYING="PLAYING",PAUSED="PAUSED",MENU="MENU",rad=function t(e,i,s,a){var n=i-a,r=e-s;return Math.atan2(n,r)},calcLight=function t(e,i){return"hsl(0,0%,"+(2*Math.sqrt(e*e+i*i)-100)+"%)"},_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),KeyListener=function(){function t(){_classCallCheck(this,t),this.pressedKeys=[],document.addEventListener("keydown",this.keydown.bind(this)),document.addEventListener("keyup",this.keyup.bind(this))}return _createClass(t,[{key:"keydown",value:function t(e){this.pressedKeys[e.keyCode]=!0,this.pressedKeys[e.key]=!0,this.pressedKeys[e.code]=!0}},{key:"keyup",value:function t(e){this.pressedKeys[e.keyCode]=!1,this.pressedKeys[e.key]=!1,this.pressedKeys[e.code]=!1}},{key:"isPressed",value:function t(e){return this.pressedKeys[e]}}]),t}(),_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),MouseListener=function(){function t(){_classCallCheck(this,t),this.x=0,this.y=0,document.addEventListener("mousemove",this.mousemove.bind(this))}return _createClass(t,[{key:"mousemove",value:function t(e){this.x=e.clientX,this.y=e.clientY}}]),t}(),_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),Player=function(){function t(){_classCallCheck(this,t),this.x=0,this.y=0,this.vx=0,this.vy=0,this.rad=0,this.radius=10,this.speed=.5,this.friction=.9,this.colliding=!1,this.jumping=!1,this.light={fov:1,radius:300,brightness:.5}}return _createClass(t,[{key:"testCollision",value:function t(e){return this.x+this.radius>e.x&&this.x-this.radius<e.x+e.width&&this.y+this.radius>e.y&&this.y-this.radius<e.y+e.height&&(this.colliding=!0,!0)}},{key:"resolveCollision",value:function t(e){var i=1e5,s={x:0,y:0},a=this.x+this.radius-e.x,n=e.x+e.width-(this.x-this.radius),r=this.y+this.radius-e.y,o=e.y+e.height-(this.y-this.radius);a<i&&(i=a,s={x:-a,y:0}),n<i&&(i=n,s={x:n,y:0}),r<i&&(i=r,s={x:0,y:-r}),o<i&&(i=o,s={x:0,y:o}),this.x+=s.x,this.y+=s.y}},{key:"update",value:function t(e){var i=mouse.y-e.height/2,s=mouse.x-e.width/2;this.rad=Math.atan2(i,s),(keyboard.isPressed(ARROW_LEFT)||keyboard.isPressed("a"))&&(this.vx-=this.speed),(keyboard.isPressed(ARROW_RIGHT)||keyboard.isPressed("d"))&&(this.vx+=this.speed),(keyboard.isPressed(ARROW_UP)||keyboard.isPressed("w"))&&(this.vy-=this.speed),(keyboard.isPressed(ARROW_DOWN)||keyboard.isPressed("s"))&&(this.vy+=this.speed),this.x+=this.vx,this.y+=this.vy,this.vx*=this.friction,this.vy*=this.friction,this.colliding=!1;for(var a=0;a<e.boxes.length;a++)this.testCollision(e.boxes[a])&&this.resolveCollision(e.boxes[a])}},{key:"drawDarkness",value:function t(e){var i=e.context.createRadialGradient(e.width/2,e.height/2,0,e.width/2,e.height/2,10*this.light.radius);i.addColorStop(0,"rgba(0,0,0,"+e.ambient+")"),i.addColorStop(.1,"rgba(0,0,0,1)"),e.context.fillStyle=i,e.context.fillRect(0,0,e.width,e.height)}},{key:"drawLight",value:function t(e){var i=e.context.createRadialGradient(e.width/2,e.height/2,0,e.width/2,e.height/2,10*this.light.radius);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(1,"rgba(255,255,255,0)"),e.context.fillStyle=i,e.context.beginPath(),e.context.arc(this.x,this.y,this.light.radius,this.rad-this.light.fov,this.rad+this.light.fov),e.context.lineTo(this.x,this.y),e.context.fill()}},{key:"draw",value:function t(e){e.context.beginPath(),e.context.arc(this.x,this.y,this.radius,0,2*Math.PI),e.context.fillStyle="rgb(255, 0, 255)",e.context.fill()}}]),t}(),_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),Box=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;_classCallCheck(this,t),this.x=e,this.y=i,this.width=s,this.height=a}return _createClass(t,[{key:"draw",value:function t(e){var i=4e3,s=e.player,a=e.context,n=s.x,r=s.y,o=this.x,h=this.y,l=this.width,c=this.height,u=[{x:o,y:h,rad:rad(o,h,n,r)},{x:o,y:h+c,rad:rad(o,h+c,n,r)},{x:o+l,y:h,rad:rad(o+l,h,n,r)},{x:o+l,y:h+c,rad:rad(o+l,h+c,n,r)}];u.sort(function(t,e){return t.rad-e.rad>Math.PI?-1:t.rad-e.rad<-Math.PI?1:t.rad>e.rad});var d=a.createRadialGradient(o+l/2,h+c/2,0,o+l/2,h+c/2,200);d.addColorStop(0,"rgba(0,0,0,"+(1-e.ambient)+")"),d.addColorStop(1,"rgba(0,0,0,0)");var y=u[0],f=u[3];a.beginPath(),a.moveTo(y.x,y.y),a.lineTo(y.x+4e3*Math.cos(y.rad),y.y+4e3*Math.sin(y.rad)),a.lineTo(f.x+4e3*Math.cos(f.rad),f.y+4e3*Math.sin(f.rad)),a.lineTo(f.x,f.y),a.fillStyle=d,a.fill();var v=.1,b=.1*(o+l/2-n),w=.1*(h+c/2-r);a.beginPath(),w>0?(a.moveTo(o,h),a.lineTo(o+l,h),a.lineTo(o+l+b,h+w),a.lineTo(o+b,h+w),a.fillStyle=r>h?"#222":calcLight(b,w-c/2)):(a.moveTo(o,h+c),a.lineTo(o+l,h+c),a.lineTo(o+l+b,h+c+w),a.lineTo(o+b,h+c+w),a.fillStyle=r<h+c?"#222":calcLight(b,w+c/2)),a.fill(),a.beginPath(),b>0?(a.moveTo(o,h),a.lineTo(o+b,h+w),a.lineTo(o+b,h+c+w),a.lineTo(o,h+c),a.fillStyle=n>o?"#222":calcLight(b-l/2,w)):(a.moveTo(o+l,h),a.lineTo(o+l+b,h+w),a.lineTo(o+l+b,h+c+w),a.lineTo(o+l,h+c),a.fillStyle=n<o+l?"#222":calcLight(b+l/2,w)),a.fill(),a.fillStyle="#222",a.fillRect(o+b,h+w,l,c)}}]),t}(),_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),Game=function(){function t(){_classCallCheck(this,t),this.width=1280,this.height=720,this.canvas=document.getElementById("c"),this.canvas.width=this.width,this.canvas.height=this.height,this.context=this.canvas.getContext("2d"),this.state=PLAYING,this.ambient=.3,this.boxes=[],this.player=null,this.lastTimestamp=new Date,window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}()}return _createClass(t,[{key:"loop",value:function t(){var e=new Date,i=(e-this.lastTimestamp)/1e3;this.draw(),this.update(i),this.lastTimestamp=e,requestAnimationFrame(this.loop.bind(this))}},{key:"run",value:function t(){this.setup(),this.loop()}},{key:"setup",value:function t(){this.player=new Player(this);for(var e=0;e<1;e++)this.boxes.push(new Box(100*e,100*e,200,200))}},{key:"clear",value:function t(){this.context.clearRect(0,0,this.width,this.height),this.context.fillStyle="rgb( "+Math.round(255*this.ambient)+","+Math.round(255*this.ambient)+","+Math.round(255*this.ambient)+")",this.context.fillRect(0,0,this.width,this.height)}},{key:"update",value:function t(){switch(this.state){case MENU:break;case PLAYING:this.player.update(this);break;default:}}},{key:"draw",value:function t(){switch(this.clear(),this.state){case MENU:this.drawMenu();break;case PLAYING:var e=this.width/2-this.player.x,i=this.height/2-this.player.y;this.context.translate(e,i);for(var s=0;s<this.boxes.length;s++)this.boxes[s].draw(this);this.player.draw(this),this.context.translate(-e,-i),this.player.drawDarkness(this);break;case PAUSED:this.drawPause();break;default:}}},{key:"pause",value:function t(){this.state=PAUSED}},{key:"unpause",value:function t(){this.state=PAUSED}}]),t}(),mouse=new MouseListener,keyboard=new KeyListener,game=new Game;game.run();