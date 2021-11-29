let canvas = document.getElementById("createCanva");
let ctx = canvas.getContext("2d");
const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;

// // //////////////



window.lose = false;
let anim_frame;

//change level
window.levels = 0;

let brick_pos_x;
let brick_pos_y;

// count 1
let brick_count = 0;

//new line
let count = 0;

let arr = 

[
    
    [
        [2,1,1,1,2],    
        [1,1,2,1,1],    
        [1,2,2,2,1],    
        [1,1,2,1,1],    
        [2,1,1,1,2],    
    ],
    [
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],    
    ],
    [
        [1,1,1,1,1],    
        [1,1,1,1,1],    
        [1,1,1,1,1],    
        [1,1,1,1,1],    
        [1,1,1,1,1],    
        [1,1,1,1,1], 
        [1,1,1,1,1],    
        [1,1,1,1,1],   
        [1,1,1,1,1],    
        [1,1,1,1,1], 
    ],
    [
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],    
        [2,2,2,2,2],
    ],
];
// 1 length
let arr_len = []

// bricks arr
let arr1 = []



//add bricks to arr1
function change_num_to_brick(){
    for (let z = 0; z < arr.length; z++) {
        arr1.push([]);
        brick_pos_x = 69.5; //69.5
        brick_pos_y = 69.5; //69.5
        count = 0;
        for (let x = 0; x < arr[z].length; x++) {
            arr1[z].push([]);
            for (let y = 0; y < arr[z][x].length; y++) {
                count++;
                if (arr[z][x][y] == 1) {
                    brick_count++;
                    arr1[z][x][y] = new bricks(GAME_WIDTH, GAME_HEIGHT, brick_pos_x, brick_pos_y);
                    brick_pos_x += 91;
                }
                if (arr[z][x][y] == 2) {
                    brick_count++;
                    arr1[z][x][y] = new golden_brick(GAME_WIDTH, GAME_HEIGHT, brick_pos_x, brick_pos_y);
                    brick_pos_x += 91;
                }
                if (arr[z][x][y] == 0) {
                    arr1[z][x][y] = new no_brick(GAME_WIDTH, GAME_HEIGHT, brick_pos_x, brick_pos_y);
                    brick_pos_x += 91;//101
                }
                if (count % 5 == 0) {
                    brick_pos_y += 33;
                    brick_pos_x = 69.5; //69.5
                }
            }  
        } 
        arr_len.push(brick_count);
        brick_count = 0
    }
}

change_num_to_brick();


let paddl = new paddle(GAME_WIDTH,GAME_HEIGHT);
let img = new ball(GAME_WIDTH,GAME_HEIGHT, paddl, arr1,arr_len);
let statss = new stats(GAME_WIDTH, GAME_HEIGHT, img)
new input(paddl, img, statss);

function gameLoop() {

    statss.bac(ctx);

    statss.lava(ctx);

    statss.draw(ctx);
    paddl.draw(ctx);

    paddl.update();
    
    // draw level
    for (let x = 0; x < arr[window.levels].length; x++) {
        for (let y = 0; y < arr[window.levels][x].length; y++) {
            if (arr[window.levels][x][y] == 0) {
                arr1[window.levels][x][y].draw(ctx);
            }
            if (arr[window.levels][x][y] == 1) {
                arr1[window.levels][x][y].draw(ctx);
            }
            if (arr[window.levels][x][y] == 2) {
                arr1[window.levels][x][y].draw(ctx);
            }
        }        
    
}
img.draw(ctx);
img.lose();
img.update(ctx);
    if (window.lose == false) {
        requestAnimationFrame(gameLoop);   
    }
    //lose
    if (window.lose == true) {
        cancelAnimationFrame(anim_frame);
        ctx.clearRect(0,0,800,600);
        statss.bac(ctx);
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("you lose :(",GAME_WIDTH/2,GAME_HEIGHT/2 - 30);
        ctx.fillText("click space to play again",GAME_WIDTH/2,GAME_HEIGHT/2 + 30);
    }
}

gameLoop();











