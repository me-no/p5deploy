var scal = 2;

var colors = [
    ["lightpink", 208, 125, 155],
    ["mainpink", 199, 77, 100], 
    ["lightorange", 251, 188, 37],
    ["orange", 238, 133, 46],
    //["deepblue", 31, 95, 143],
];

var purpleColor = [103, 96, 127];
var cyanColor = [89,147,171];

// for actual size
var actualSize = 384;
var width = actualSize*scal;
var height = actualSize*scal;

// for sine curve
let xspacing = 2*scal; // Distance between each horizontal location
let xspacing_fish = 2*scal*6;
let w; // Width of entire wave
let w_fish;
let theta = 0.0; // Start angle at 0
let theta_fish  = 0.0;
let theta_paper =0.0;
let amplitude = 18.0; // Height of wave
let amplitude_fish = 18.0*2;
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let dx_fish;
let yvalues; // Using an array to store height values for the wave
let yvalues_fish;

var nz = 1;
var nz_x = 1;
var nz_y = 2;

function preload() {
    // Font
    //font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    imgch = loadImage("kid.png");
    imgmask = loadImage("mask.png");
    imgumbrella = loadImage("umbrella.png");
    imgbackpack = loadImage("backpack.png");
    imgkoiblue_nostroke = loadImage("bluefish_noStroke.png");
    imgkoiblue = loadImage("bluefish.png");
    imgkoioutlined = loadImage("fish_outlined.png");

    imgkoimain = loadImage("koi.png");
    imgkoimain_white = loadImage("koi_whiteback_wing.png");
    imgfloat = loadImage("floatfront.png");
    imgfloat_shade = loadImage("floatfront_shade.png");

    imgpaper_s = loadImage("paper_small.png");
    imgpaper_l = loadImage("paper_large.png");
    imgpaper_outlined = loadImage("paper_l_outlined2.png");

    imgsakura_deep = loadImage("deepsakura.png");
    imgsakura_light = loadImage("lightsakura.png")
}

function setup () {
    createCanvas(actualSize*scal, actualSize*scal);
    background(255);
    //frameRate(33);
    image(imgkoimain_white, 0, 0, width, height);

    // for sine curve
    //ly = createCanvas(actualSize*scal, actualSize*scal);
    w =  width + xspacing;
    w_fish = width + xspacing_fish;
    dx = (TWO_PI / period) * xspacing;
    dx_fish = (TWO_PI / period)* xspacing_fish;
    yvalues = new Array(floor(w / xspacing));
    yvalues_fish = new Array(floor(w_fish / xspacing_fish));
}

function draw() {
    // 背景の一部を白く塗る
    /*
    fill(255);
    noStroke();
    rect(0, height*2/5+55, width, height*1/8);
    */


    //image(imgkoimain_back, 0, 0, width, height);
    image(imgkoimain_white, 0, 0, width, height);

    // 下側の境界となる放物線
    s0 = actualSize/2*scal;
    t0 = actualSize/2*scal;
    s = int(random(-384, 384))*scal + s0;
    t = s*s/1661+t0;

    // 上側の境界となる放物線
    u0 = s0;
    v0 = t0;
    u = int(random(-actualSize, actualSize))*scal;
    v = -u*u/1661+v0;

    x = int(random(-actualSize/2, actualSize/2))*scal;// x とy が魚の頂点; x はグラフの横移動を考慮した範囲
    y = int(random(-15, actualSize))*scal;

    v = -(x*x/1963)*scal+v0;// 上側の境界
    t = (x*x/1963)*scal+t0;// 下側の境界

    // 桜吹雪の生成
    fishDice = int(random(0,2));
    if (y < v - 44) {
        if (fishDice % 2 ===0) {
            //image(imgkoilight, x+u0, y, 26*scal, 6*scal);
            image(imgsakura_deep, x+u0, y, 12*scal, 11*scal);
        } else {
            //image(imgkoideep, x +u0, y, 26*scal, 6*scal);
            image(imgsakura_light, x+u0, y, 11*scal, 10*scal);
        }
    } else if (t+9 < y) {
        /*
        if (fishDice % 2 ===0) {
            image(imgkoilight, x+u0, y, 52,12);
        } else {
            image(imgkoideep, x +u0, y, 52,12);
        }
        */
    }


    // ひし形の場合
    colorDice = int(random(0, colors.length));
    if (y < v - 33) {// 上側は水色
        r = int(random(2, 15))*2-1;// 奇数で出力
        tr = random(0, 50);
        for (i = 0; i < r; i++) {
            ii = i*2+1;
            j = (r - ii)/2;
            l = r - j*2;
            noStroke();
            fill(colors[colorDice][1], colors[colorDice][2], colors[colorDice][3], tr);
            for (k = 0; k<l; k++) {
                rect(x+u0+j*scal+k*scal, y+i*scal, scal, scal);
                if(i!=r-1){
                    rect(x+u0+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
                }
            }
        }
    } else if (y >= t-33) {
        r = int(random(2, 15))*2-1;// 奇数で出力
        tr = random(0, 50);
        noStroke();
        purpleDice = int(random(0,2));
        //if(purpleDice % 2 !=0){
            fill(purpleColor[0], purpleColor[1], purpleColor[2], tr);
        //} else {
            //fill(cyanColor[0], cyanColor[1], cyanColor[2], tr);
        //}
        for (i = 0; i < r; i++) {
            ii = i*2+1;
            j = (r - ii)/2;
            l = r - j*2;
            for (k = 0; k<l; k++) {
                rect(x+t0+j*scal+k*scal, y+i*scal, scal, scal);
                if(i!=r-1){
                    rect(x+t0+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
                }
            }
        }
    }

    /*
    // plot documents 
    if(x+actualSize/2 > 81*scal && x+actualSize/2 < 333*scal && y > 333*scal){
        paperDice = int(random(0,2));
        if(paperDice % 2===0){
            image(imgpaper_l, x+actualSize/2, y, 28*scal, 13*scal);
        } else {
            image(imgpaper_s, x+actualSize/2, y, 21*scal, 15*scal);
        }
    }
    */

    // sine curve
    calcWave();
    renderWave();

    theta += 0.001;
    let phi = theta;
    for (let i = 0; i < yvalues.length; i++){
        yvalues[i] = sin(phi) * amplitude;
        phi +=dx;
    }
    theta_fish += 0.002;
    let phi_fish = theta_fish;
    for (let j = 0; j < yvalues_fish.length; j++) {
        yvalues_fish[j] = sin(phi_fish) * amplitude_fish;
        phi_fish +=dx_fish;
    }

    for (let x = 0; x < yvalues.length; x++) {
        noStroke();
        fill(purpleColor[0], purpleColor[1], purpleColor[2]);
        rect(x*xspacing, height/2+10*scal+yvalues[x], scal, scal);
    }
    for (let x = 0; x < yvalues_fish.length; x ++) {
            //image(imgkoiblue_nostroke, x*xspacing_fish, height/2+yvalues_fish[x], 34*scal, 13*scal);
            //image(imgkoiblue, x*xspacing, height/2+yvalues[x], 36*scal, 15*scal);// なんかおもろいミス
            image(imgkoioutlined, x*xspacing_fish - 20*scal, height/2+8*scal +yvalues_fish[x], 36*scal, 16*scal);
    }
    /*
    for (let x = 0; x < yvalues_fish.length*10; x += 4) {
        //nzvar = noise(nz)*20;
        //if(x != nz && x != nz && x != nz+2) {
            //image(imgkoiblue_nostroke, x*xspacing_fish, height/2+yvalues_fish[x], 34*scal, 13*scal);
            //image(imgkoiblue, x*xspacing, height/2+yvalues[x], 36*scal, 15*scal);// なんかおもろいミス
            image(imgkoiblue, x*xspacing, height/2+yvalues[x], 36*scal, 15*scal);
        //}
        //nz += 1;
        //if(nz >= yvalues_fish.length*10){
        //    nz = 1;
        //}
    }
    */

    // plot image 
    image(imgkoimain, 0, 0, width, height);
    image(imgch, 0, 0, width, height);
    image(imgmask, 0, 0, width, height);
    image(imgumbrella, 0, 0, width, height);
    image(imgbackpack, 0, 0, width, height);

    // plot sine wave documents
    theta_paper += 0.002;
    let phi_paper = theta_paper;
    for (let j = 0; j < yvalues_fish.length; j++) {
        yvalues_fish[j] = sin(phi_paper) * amplitude_fish;
        phi_paper +=dx_fish;
    }

    for (let x = 0; x < yvalues_fish.length; x ++) {
        image(imgpaper_outlined, (yvalues_fish.length - x)*xspacing_fish - 20*scal, height-22*scal +yvalues_fish[x]/2, 29*scal, 14*scal);
    }

    // plot frame_shade
    nzvar_xs = noise(nz_x)*10;
    nzvar_ys = noise(nz_y)*10;
    image(imgfloat_shade, -10*scal+nzvar_xs, -10*scal+nzvar_ys, 400*scal, 400*scal);
    //}

    // plot frame
    nzvar_x = noise(nz_x)*20;
    nzvar_y = noise(nz_y)*20;
    image(imgfloat, -10*scal+nzvar_x, -10*scal+nzvar_y, 400*scal, 400*scal);
    //}
    nz_x += 0.005;
    nz_y += 0.01;
    //if(nz >= yvalues_fish.length*10){
    //    nz = 1;

    //noLoop();
}

// for sine curve

function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.04;
    theta_fish +=0.01;
    theta_paper +=0.1;// 波の速さはここ
  
    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = sin(x) * amplitude;
      x += dx;
    }
    let x_fish = theta_fish;
    for (let j = 0; j < yvalues_fish.length; j++) {
        yvalues_fish[j] = sin(x_fish) *amplitude_fish;
        x_fish +=dx_fish;
    }
    let x_paper = theta_paper;
    for (let j = 0; j < yvalues_fish.length; j++) {
        yvalues_fish[j] = sin(x_paper) *amplitude_fish;
        x_paper +=dx_fish;
    }
  }
  
  function renderWave() {
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
      //ly.ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
    }
  }


  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  