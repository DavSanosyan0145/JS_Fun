class sneak {
	constructor(gameWidth, gameHeight){
		this.life = 1
		this.point = 0
		this.gameWidth = gameWidth
		this.gameHeight = gameHeight
		this.cells = []
  		this.maxCells = 5
		this.size = 20
		this.speed = {
			x:20,
			y:20,
		}
		this.pos = {
			x: 0,
			y: 0,
		}
		this.backMove = {
			left: false,
			right: true,
			top: true,
			buttom: true,
		}
	}

	// draw snake
	draw(ctx){
		ctx.fillStyle = 'red';
		ctx.fillRect(this.pos.x,this.pos.y,this.size,this.size)
	}

	// moveing snake with keybords
	moveSnake(key){
		if (key == undefined) {
			this.pos.x += this.speed.x
		}
		else if (key == `KeyD` && this.backMove.right == true || key == "KeyA" && this.backMove.left == false) {
			this.pos.x += this.speed.x
			this.backMove.top = this.backMove.buttom = true
			this.backMove.left = false
		}
		else if (key == `KeyS` && this.backMove.buttom == true  || key == "KeyW" && this.backMove.top == false) {
    		this.pos.y += this.speed.y
    		this.backMove.left = this.backMove.right = true
    		this.backMove.top = false
		}
		else if (key == `KeyW` && this.backMove.top == true || key == "KeyS" && this.backMove.buttom == false) {
			this.pos.y -= this.speed.y
			this.backMove.left = this.backMove.right = true
			this.backMove.buttom = false
		}
		else if (key == `KeyA` && this.backMove.left == true  || key == "KeyD" && this.backMove.right == false) {
			this.pos.x -= this.speed.x
			this.backMove.top = this.backMove.buttom = true
			this.backMove.right = false
		}
		else{
			return
		} 
	}

	// snake tails and lose
	tails(ctx){
		// add first 4 tails
		this.cells.unshift({x: this.pos.x, y: this.pos.y});
  		if (this.cells.length > this.maxCells) {
    		this.cells.pop();
  		}
  		// draw snake tails
  		for (var i = 1; i < this.cells.length; i++) {
   			ctx.fillRect(this.cells[i].x, this.cells[i].y, 20,20); 
   			ctx.fillStyle = 'green';
   			// snake lose
   			if (
   				this.pos.x == this.cells[i].x && this.pos.y == this.cells[i].y ||
   				this.pos.x < 0 || this.pos.y < 0 || 
   				this.pos.x + this.size > this.gameWidth || this.pos.y + this.size > this.gameHeight
   			) {
				this.life = 0
			}	
   		}
	}

	// stats
	async stats(){
		ctx.font = "20px Arial";
		ctx.fillStyle = "white";
		ctx.fillText(this.point, 10, 20);
	}

	// snake death
	death(key){
		this.life++
		this.cells = []
		this.pos.x = this.gameWidth / 2
		this.pos.y = this.gameHeight / 2
		this.point = 0
		this.backMove = {
			left: false,
			right: true,
			top: true,
			buttom: true,
		}	
	}

	// call all
	move(key, ctx){
		this.moveSnake(key)
		this.tails(ctx)
		this.stats();
		if (this.life == 0) {
			this.death(key);
		}
	}
}

class bread{
	constructor(gameWidth, gameHeight, sneak){
		this.gameWidth = gameWidth
		this.gameHeight = gameHeight
		this.classSneak = sneak
		this.size = 20
		this.pos = {
			x: (Math.round(Math.random()*25))*20,
			y: (Math.round(Math.random()*25))*20,
		}
	}

	// draw bread
	draw(ctx){
		ctx.fillRect(this.pos.x,this.pos.y,this.size, this.size)
	}

	// sneak eat bread
	sneak_eat_bread(){
		if (
			this.classSneak.pos.x+this.classSneak.size > this.pos.x &&
			this.classSneak.pos.x < this.pos.x+this.size &&
			this.classSneak.pos.y+this.classSneak.size > this.pos.y &&
			this.classSneak.pos.y < this.pos.y+this.size
		) {
			//change bread position
			this.pos.x = (Math.round(Math.random()*25))*20
			this.pos.y = (Math.round(Math.random()*25))*20

			// add tail
			this.classSneak.cells.push({x: this.pos.x, y: this.pos.y});	
			this.classSneak.point+=100			
		}
	}
}
