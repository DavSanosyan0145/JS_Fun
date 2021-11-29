// canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// screen size
const gameWidth = 800
const gameHeight = 600

// keybord key
let key;

// making objects
let sneakLoop = new sneak(gameWidth, gameHeight)
let breadLoop = new bread(gameWidth, gameHeight, sneakLoop)

// key press
document.addEventListener('keypress', logKey);
function logKey(e) { 
  key = e.code;
}

// gameLoop
setInterval(gameLoop, 60);
function gameLoop (){
	ctx.clearRect(0,0,gameWidth, gameHeight)
    sneakLoop.draw(ctx)
	sneakLoop.move(key, ctx)
    breadLoop.draw(ctx)
    breadLoop.sneak_eat_bread()
}
