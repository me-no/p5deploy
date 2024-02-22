var scal = 2;

var colors = [
    ["lightcyan", 92, 160, 181],
    ["cyan", 89, 147, 171], 
    ["blue", 31, 110, 158],
    ["deepblue", 31, 95, 143],
    ["blueline", 0, 33, 54],
];

// for actual size
var actualSize = 384;
var width = 768;
var height = 768;

// for sine curve
let xspacing = 2*scal; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 18.0; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

function preload() {
    // Font
    //font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    imgch = loadImage("assets/img/child.png");
    imgbk = loadImage("assets/img/back4x.png");
    imgwhitebk = loadImage("assets/img/bkwhite4x.png");
    imgfishsc = loadImage("assets/img/fish_small.png");
    imgfishlc = loadImage("assets/img/fish_large.png");
    imgfishsb = loadImage("assets/img/fish_small_bl.png");
    imgfishlb = loadImage("assets/img/fish_large_bl.png");
    imgwhale = loadImage("assets/img/whale.png");
    imgelephant = loadImage("assets/img/elephant.png");
    imgrain = loadImage("assets/img/rain.png");

}

function setup () {
    // for iframe on gallery 
    canvas = createCanvas(actualSize*scal, actualSize*scal);
    canvas.style('width','100%');canvas.style('height','auto');

    background(255);
    //background(colors[4][1], colors[4][2], colors[4][3]);
    frameRate(33);

    // for sine curve
    //ly = createCanvas(actualSize*scal, actualSize*scal);
    w =  width + xspacing;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));

    // Elephant
    image(imgelephant, 0, 0, actualSize*scal, actualSize*scal);
}

function draw() {

    // 下側の境界となる放物線
    s0 = actualSize/2*scal;
    t0 = actualSize/2*scal;
    s = int(random(-actualSize, actualSize))*scal + s0;
    t = s*s/1661+t0;

    // 上側の境界となる放物線
    u0 = s0;
    v0 = t0;
    u = int(random(-actualSize, actualSize))*scal;
    v = -u*u/1661+v0;

    x = int(random(-actualSize/2-26, actualSize/2))*scal;// x とy が魚の頂点; x はグラフの横移動を考慮した範囲
    y = int(random(-15, actualSize))*scal;

    v = -(x*x/1963)*scal+v0;// 上側の境界
    t = (x*x/1963)*scal+t0;// 下側の境界

    // 魚群の生成
    //tint(255, 205);
    if (y < v - 66) {
        image(imgfishsc, x+u0, y, 52,12);
    } else if (v-66 <= y && y < v-33) {
        image(imgfishlc, x+u0, y, 58, 64);
    } else if (t+16 < y) {
        image(imgfishsb, x+s0, y, 52, 12);
    } else if (t-22<y && y <= t+16) {
        image(imgfishlb, x+s0, y, 58, 64);
    }

    // ひし形の場合
    if (y < v - 33) {// 上側は水色
        r = int(random(2, 15))*2-1;// 奇数で出力
        tr = random(0, 50);
        for (i = 0; i < r; i++) {
            ii = i*2+1;
            j = (r - ii)/2;
            l = r - j*2;
            noStroke();
            fill(colors[2][1], colors[2][2], colors[2][3], tr);
            for (k = 0; k<l; k++) {
                rect(x+u0+j*scal+k*scal, y+i*scal, scal, scal);
                if(i!=r-1){
                    rect(x+u0+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
                }
            }
        }
    } else if (v -33 <= y && y <= v) {// 上の境界上の描画
    } else if (t-66 <= y && y < t-33) {// 下の境界上の描画
    } else if (y >= t-33) {
        r = int(random(2, 15))*2-1;// 奇数で出力
        tr = random(0, 50);
        for (i = 0; i < r; i++) {
            ii = i*2+1;
            j = (r - ii)/2;
            l = r - j*2;
            noStroke();
            fill(colors[0][1], colors[0][2], colors[0][3], tr);
            for (k = 0; k<l; k++) {
                rect(x+t0+j*scal+k*scal, y+i*scal, scal, scal);
                if(i!=r-1){
                    rect(x+t0+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
                }
            }
        }
    }

    // sine curve
    calcWave();
    renderWave();
    //image(ly, 0, 0);
    theta += 0.001;
    let phi = theta;
    for (let i = 0; i < yvalues.length; i++){
        yvalues[i] = sin(phi) * amplitude;
        phi +=dx;
    }
    noStroke();
    fill(255);
    for (let x = 0; x < yvalues.length; x++) {
        rect(x*xspacing, height/2+yvalues[x], scal, scal);
        //erase();
        //rect(x*xspacing, height/2+yvalues[x]-scal, scal, scal, 0);
        //noErase();
    }

    // 手前画像の描画
    image(imgrain, 0, 0, actualSize*scal, actualSize*scal);
    image(imgwhale, 0, 0, actualSize*scal, actualSize*scal);
    image(imgch, 0, 0, actualSize*scal, actualSize*scal);
    // 目の描写
    noStroke();
    fill(103,214,235);
    rect(186*scal, 68*scal, scal, scal);
    rect(196*scal, 161*scal, scal, scal);
    rect(225*scal, 281*scal, scal, scal);

    //noLoop();
}

// for sine curve

function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.02;
  
    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = sin(x) * amplitude;
      x += dx;
    }
  }
  
  function renderWave() {
    //ly.strokeWeight(0);
    //ly.fill(255);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
      //ly.ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
    }
  }

