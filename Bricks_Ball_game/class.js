class paddle {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 72;
        this.height = 18;
        this.x = gameWidth / 2 - this.width / 2;
        this.y = gameHeight - this.height - 35;
        this.maxspeed = 10;
        this.speed = 0;
    }
    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    moveleft() {
        this.speed = -this.maxspeed;
    }
    moveright() {
        this.speed = this.maxspeed;
    }
    stop() {
        this.speed = 0
    }
    update() {
        this.x += this.speed;
        if (this.x < 24) {
            this.x = 24;
            console.log("dd")
        }
        if (this.x > this.gameWidth - this.width - 24) {
            let a = this.gameWidth - this.width - 24;
            this.x = a;
        }
    }
}


class bricks {
    constructor(gameWidth, gameHeight, x, y) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.life = 1;
        this.img = document.getElementById("bricks")
        this.size = {
            width: 90, //90
            height: 32,
        }
        this.pos = {
            x: x,
            y: y,
        }
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.width, this.size.height);
    }
}
class golden_brick{
    constructor(gameWidth, gameHeight, x, y){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.img = document.getElementById("golden_bricks")
        this.life = 3;
        this.size = {
            width: 90,
            height: 32,
        }
        this.pos = {
            x: x,
            y: y,
        }
    }
    draw(ctx){
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.width, this.size.height)
    }
}


class ball {
    constructor(gameWidth, gameHeight, paddl, brick_arr, arr_len) {
        this.image = document.getElementById("Myimg");
        this.break_bricks = 0;
        this.break_bricks_score = 0;
        this.life = 3;
        this.size = 20;
        this.ball_speed = 6;
        this.padd = paddl;
        this.arr_len = arr_len;
        this.brick_arr = brick_arr;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
//create a synth and connect it to the master output (your speakers)
        this.synth = new Tone.Synth().toMaster()
        // this.a = 
        this.speed = {
            x: 1,//13.3
            y: 1,

        }
        this.pos = {
            x: this.gameWidth / 2 - 10,
            y: this.gameHeight - this.padd.height - this.padd.height - 36,
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size, this.size);
    }
    lose() {
        if (this.pos.y > this.gameHeight - 30) {
            this.life--;
            this.pos.x = this.gameWidth / 2;
            this.pos.y = this.padd.y - this.size - 60;
            this.speed.y = -this.speed.y
            this.speed.x = -this.speed.x
            if (this.life == 0) {
                window.lose = true;
                this.break_bricks_score = 0;

            }
        }
    }

    //finish///////////////////////

    ballhitwall() {
        if (this.pos.x > this.gameWidth - this.size - 23 || this.pos.x < 23) {
            this.speed.x = -this.speed.x;
            //play a middle 'C' for the duration of an 8th note   
            this.synth.triggerAttackRelease('C3', '8n')
     
        }
        if (this.pos.y < 40) {
            this.speed.y = -this.speed.y;
            this.synth.triggerAttackRelease('C3', '8n')
        }

    }

    ballhitpaddle() {
        let ballleft = this.pos.x;
        let balltop = this.pos.y;
        let ballright = this.pos.x + this.size;
        let ballbottom = this.pos.y + this.size;

        let paddletop = this.padd.y;
        let paddleleft = this.padd.x;
        let paddleright = this.padd.x + this.padd.width;
        let paddlebotton = this.padd.y + this.padd.height;
        // && balltop <= paddlebotton





        // if (ballbottom >= paddletop && paddleright >= ballleft && paddleleft <= ballright) {

        if(ballbottom > paddletop && ballright > paddleleft && ballleft < paddleright && balltop < paddlebotton){
            let collidePoint = this.pos.x - (this.padd.x + this.padd.width / 2);
            collidePoint = collidePoint / (this.padd.width / 2);
            let angle = collidePoint * Math.PI/3; 
            this.speed.x = this.ball_speed * Math.sin(angle);
            this.speed.y = - this.ball_speed * Math.cos(angle);
        }
    }

    //finish///////////////
    levels() {
        if (this.break_bricks / 100 == this.arr_len[window.levels]) {
            this.speed.y = -this.speed.y
            this.break_bricks = 0;
            this.pos.x = this.gameWidth / 2,
            this.pos.y = this.gameHeight - this.padd.height - this.padd.height - 36,
            window.levels++;
        }
    }

    ballhitbrick() {
        //levels
        this.levels();
        // ball center
        let ball_top = this.pos.y + 10;
        let ball_right = this.pos.x + 10
        let ball_button = this.pos.y + this.size - 10;
        let ball_left = this.pos.x + this.size - 10;

        for (let x = 0; x < this.brick_arr[window.levels].length; x++) {
            for (let y = 0; y < this.brick_arr[window.levels][x].length; y++) {
                if (this.brick_arr[window.levels][x][y].no == true) {
                    continue;
                }
                let brick_top_y = this.brick_arr[window.levels][x][y].pos.y - 10;
                let brick_button_y = this.brick_arr[window.levels][x][y].pos.y + this.brick_arr[window.levels][x][y].size.height + 10;
                let brick_top_x = this.brick_arr[window.levels][x][y].pos.y;
                let brick_button_x = this.brick_arr[window.levels][x][y].pos.y + this.brick_arr[window.levels][x][y].size.height;
                let brick_right_x2 = this.brick_arr[window.levels][x][y].pos.x - 10;
                let brick_left_x2 = this.brick_arr[window.levels][x][y].pos.x + this.brick_arr[window.levels][x][y].size.width + 10;
                let b1 = this.brick_arr[window.levels][x][y].pos.x + this.brick_arr[window.levels][x][y].size.width;
                let bb = b1 + this.brick_arr[window.levels][x][y].size.height;
                let w = this.pos.x;

                // ball hit top - button

              if (ball_button >= brick_top_y && ball_top <= brick_button_y && ball_right <= brick_left_x2 - 5 && ball_left >= brick_right_x2 + 5) {
                    this.speed.y = -this.speed.y;
                    this.brick_arr[window.levels][x][y].life--;
                }

             // ball hit right - left

            if (ball_button >= brick_top_x && ball_top <= brick_button_x && ball_right <= brick_left_x2 && ball_left >= brick_right_x2) {
                if (bb == Math.round(w) || bb == Math.round(w) - 10 || bb == Math.round(w) + 1) {
                    this.speed.y = -this.speed.y
                }
                if (b1 == Math.round(w) || b1 == Math.round(w) - 1  || b1 == Math.round(w) + 1 || b1 == Math.round(w) - 2  || b1 == Math.round(w) + 2) {
                    this.speed.y = -this.speed.y
                }
                else{
                   this.speed.x = -this.speed.x;
                }
                this.brick_arr[window.levels][x][y].life--;
            }

                // break brick
                if (this.brick_arr[window.levels][x][y].life <= 0) {
                    this.brick_arr[window.levels][x][y] = new no_brick(this.gameWidth, this.gameHeight, this.pos.x, this.pos.y);
                    count++;
                    this.break_bricks += 100;
                    this.break_bricks_score += 10;

                }
            }
        }
    }
    update() {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
        this.ballhitbrick();
        this.ballhitwall();
        this.ballhitpaddle();
        this.lose();
    }
}






class no_brick {
    constructor(gameWidth, gameHeight, x, y) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.no = true;
        this.size = {
            width: 0,
            height: 0,
        }
        this.pos = {
            x: x,
            y: y,
        }
    }
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        ctx.fillStyle = "black";

    }
}



class stats {
    constructor(gameWidth, gameHeight, ball) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ball = ball;
        this.a = 15;
        this.background = document.getElementById("background");
        this.lav = document.getElementById("lava");

        this.level = document.getElementById("level");
        this.life = document.getElementById("life");
        this.score = document.getElementById("score")

        this.pilars = document.getElementById("pilars")
        this.rope = document.getElementById("rope")


        this.pos = {
            x: 0,
            y: 0,
        }
        this.size = {
            width: 100,
            height: 20,
        }
    }

    draw(ctx) {
        ctx.drawImage(this.rope,0,0, this.gameWidth, 75);

        ctx.drawImage(this.pilars,-81, -100, 150, this.gameHeight+170);
        ctx.drawImage(this.pilars,this.gameHeight-70, -100, 150, this.gameHeight+170);

        ctx.font = "25px Arial";
        ctx.fillStyle = "#cdcaa0";

        ctx.fillRect(0, 0, canvas.width, 35);


        ctx.fillStyle = "white";


        ctx.fillText(this.ball.life, 45, 25)
        ctx.drawImage(this.life, 15, 6, 20, 20);




        ctx.fillText(window.levels + 1,this.gameWidth / 2 - 15, 25);
        ctx.drawImage(this.level, this.gameWidth / 2 - 45, 6, 20, 20);

        ctx.fillText(this.ball.break_bricks_score,this.gameWidth - 57, 25);
        ctx.drawImage(this.score, this.gameWidth - 95, 6, 20, 20);




        ctx.fillStyle = "black";

    }
    bac(ctx) {
        ctx.drawImage(this.background, 0, 0, this.gameWidth, this.gameHeight);
    }
    lava(ctx) {
        ctx.drawImage(this.lav, 0, this.gameHeight - 50, this.gameWidth, 50);
    }
    

}

