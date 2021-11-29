function setup() {
    createCanvas(1500, 1500);
    noLoop();
}
//*** final *** //

function draw() {
    var lines_number =parseInt(document.getElementById('line_number').value);
    var sorting_speed = parseInt(document.getElementById('sorting_speed').value);
    var yy = 100;
    var xx = 50
 
    //** random num array **//

    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var arr3_fin = [];
    var arr4 = []

    //** sorted num array **//

    var main1 = [];
    var main2 = [[]];
    var main3 = [];
    var main3_fin = []
    var main4 = [];

    //** generate random number, delete duplicates *arr*  **//

    var count = 0;
    var random_number;
    while (arr1.length < lines_number) {
        random_number = Math.floor(Math.random() * lines_number)
        for (var i = 0; i < arr1.length; i++) {
            if (random_number == arr1[i]) {
                count++;
            }
        }
        if (count < 1) {
            arr1.push(random_number);
            arr2.push(random_number);
            arr3.push(random_number);
            arr4.push(random_number);
            count = 0;
        }
        else {
            count = 0;
        }
    }

    // first shorting method add main1
    // vercnuma tiv@ HAMEMATUMA zangvaci michi tvi het

    for (let x = 0; x < arr1.length; x++) {
        main1.push([]);
        for (let y = 0; y < arr1.length; y++) {
            if (arr1[y] > arr1[x]) {
                arr1[x] = arr1[x] + arr1[y];
                arr1[y] = arr1[x] - arr1[y];
                arr1[x] = arr1[x] - arr1[y];
                main1[x].push(arr1[y]);
            }
            else {
                main1[x].push(arr1[y]);
                continue;
            }
        }
    }

    //seccond shorting method add main2
    // tiv@ hamematuma ir koxqi tvi het

    let count2 = 0;
    let q = arr2.length * arr2.length;
    for (var i = 0; i < q; i++) {
        if (arr2[i] < arr2[i + 1]) {
            main2[count2].push(arr2[i])
            continue;
        }
        if (arr2[i] > arr2[i + 1]) {
            [arr2[i], arr2[i + 1]] = [arr2[i + 1], arr2[i]];
            main2[count2].push(arr2[i])
        }
        if (i == arr2.length) {
            count2++;
            main2.push([]);
            i = -1;
            q -= arr2.length;
        }
        if (i == q - 1) {
            main2[i].push(arr2[i]);
        }
    }

    // third sorting method main3
    // zangvacic gtnuma amenapoqr tiv@ avelacnuma nori mej hnic jnjuma

    let index;
    let const_arr_L = arr3.length
    for (var i = 0; i < const_arr_L; i++) {
        arr3_fin.push([]);
        main3_fin.push([]);
        main3.push(Math.min(...arr3))
        index = arr3.indexOf(Math.min(...arr3))
        arr3.splice(index, 1);
        for (var x = 0; x < const_arr_L; x++) {
            if (arr3[x] == undefined) {
                continue;
            }
            arr3_fin[i].push(arr3[x]);
        }
        for (var y = 0; y < const_arr_L; y++) {
            if (main3[y] == undefined) {
                continue;
            }
            main3_fin[i].push(main3[y]);
        }
    }

    // fourth shorting method main4
    // zangvacic gtnuma amenapoqr tiv@ beruma araj

    let count4 = 0;
    for (var i = 0; i < arr4.length; i++) {
        main4.push([])
        for (var j = 0 + count4; j < arr4.length; j++) {
            if (arr4[i] > arr4[j]) {
                arr4[i] = arr4[i] + arr4[j];
                arr4[j] = arr4[i] - arr4[j];
                arr4[i] = arr4[i] - arr4[j]
            }
            else {
                continue
            }
        }
        for (var k = 0; k < arr4.length; k++) {
            main4[i].push(arr4[k])
        }
        count4++;
    }

    //** sorting lines **//

    let index_arr = 0;
    let t = setInterval(function () {
        index_arr++;
        clear()

        //sort 1
        for (var x = 0; x < main1[index_arr].length; x++) {
            line(main1[index_arr][x], x, 0, x);
        }


        //sort2
        for (var x = 0; x < main2[index_arr].length; x++) {
            line(lines_number+yy, x, lines_number+yy + main2[index_arr][x], x);
        }

        //sort3
        for (var x = 0; x < arr3_fin[index_arr].length; x++) {
            line(0, lines_number+xx + x, arr3_fin[index_arr][x], lines_number+ xx + x)
        }
        for (var x = 0; x < main3_fin[index_arr].length; x++) {
            line(0, lines_number + xx + x, main3_fin[index_arr][x], lines_number + xx + x)
        }

        //sort4
        for (var x = 0; x < main4[index_arr].length; x++) {
            line(lines_number+yy, lines_number+ xx + x, lines_number + yy + main4[index_arr][x], lines_number + xx + x)
        }

        //** stop interval **//

        if (index_arr == lines_number - 1) {
            clearInterval(t);
            document.getElementById("btn").disabled = false;

        }
        else{
            document.getElementById("btn").disabled = true;

        }
    }, sorting_speed);
}



