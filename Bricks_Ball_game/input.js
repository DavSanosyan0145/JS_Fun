class input{
    constructor(paddl, ball){
        this.count = 0;
        this.x = 40;
        this.y = 60;
        
        // paddle left-right
        document.addEventListener("keydown", event =>{
            switch(event.keyCode){
                case 65:
                    paddl.moveleft();
                    break;
                case 68:
                    paddl.moveright();
                    break;
            }
        });
        document.addEventListener("keyup", event =>{
            switch(event.keyCode){
                case 65:
                    if (paddl.speed < 0) {
                        paddl.stop();
                    }
                    break;
                case 68:
                    if (paddl.speed > 0) {
                        paddl.stop();
                    }
                    break;
            }
        }); 

        // restart

        document.addEventListener("keydown", event =>{        
            if(event.keyCode == 32 && window.lose == true){
                change_num_to_brick();
                ball.speed.x = 0;
                ball.speed.y= 0; 
                img.pos.x = img.gameWidth / 2,
                img.pos.y = img.gameHeight - paddl.height - paddl.height - 36,
                ball.speed.x = 4;
                ball.speed.y= 4; 
                ball.speed.x = -ball.speed.x;
                ball.speed.y = -ball.speed.y; 

                window.lose = false;
                window.levels = 0;
                img.break_bricks = 0
                img.life = 3;

                requestAnimationFrame(gameLoop); 
        }
        });


    }
}