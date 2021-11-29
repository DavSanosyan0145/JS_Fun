var count;
var o = 1;
arr = ["",true,true,true,true,true,true,true,true,true];

function playerX(){
    count = 0;
    document.getElementById('stats').innerHTML = 'player X';
    document.getElementById('pl').style.display = "none";
    document.getElementById('e').style.display = "block";
    document.getElementById('b').style.backgroundImage = "url('player.gif')";
}
function playerO(){
    count = 1;
    document.getElementById('stats').innerHTML = 'player O';  
    document.getElementById('pl').style.display = "none";
    document.getElementById('e').style.display = "block"; 
    document.getElementById('b').style.backgroundImage = "url('player.gif')";   
}
function fun(i) {
    count++;
    if(o != 10 && count % 2 == 1){
        if (arr[i] == true) {
            o++
            document.getElementById("myImg"+i).src = "X.png";
            document.getElementById('stats').innerHTML = 'player O';  
             arr[i] = false;
        }      
    }
    if(o != 10 && count % 2 == 0){
        if (arr[i] == true) {
            o++
            document.getElementById("myImg"+i).src = "O.png";
            document.getElementById('stats').innerHTML = 'player X';
            arr[i] = false;
        }
    }     
  
}
function main(){
    if(count % 2 == 0){
        alert("O win")
        location.reload();
    }
    if(count % 2 == 1){
        alert("X win")
        location.reload();
    }   
}
function draw(){
    if (o == 10) {
        alert("draw")
        location.reload();
    }
}
// logic
function www() {
    a = document.getElementById('myImg1').src    
    b = document.getElementById('myImg2').src
    c = document.getElementById('myImg3').src
    d = document.getElementById('myImg4').src
    e = document.getElementById('myImg5').src
    f = document.getElementById('myImg6').src
    m = document.getElementById('myImg7').src
    n = document.getElementById('myImg8').src
    l = document.getElementById('myImg9').src
    if (a == b && b == c && a != ''){
        main()
    }
    else if (m == n && n == l && m != ''){
        main()  
    }
    else if (a == d && d == m && a != ''){
        main()  
    }
    else if (c == f && f == l && c != ''){
        main()  
    }
    else if (b == e && e == n && b != ''){
        main()  
    }
    else if (d == e && e == f && d != ''){
        main()  
    }
    else if (a == e && e == l && a != ''){
        main()  
    }
    else if (c == e && e == m && c != ''){
        main() 
    }
    else{
        draw();
    }
}
function myfun1(){ 
    fun('1'); 
    www();
}
function myfun2(){
    fun('2');
    www();
}
function myfun3(){
    fun('3');
    www();
}
function myfun4(){
    fun('4');
    www();
}
function myfun5(){
    fun('5');
    www();
}
function myfun6(){
    fun('6');
    www();
}
function myfun7(){
    fun('7');
    www();
}
function myfun8(){
    fun('8');
    www();
}
function myfun9(){
    fun('9');
    www();
}