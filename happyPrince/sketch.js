let scal = 2;
let baloons = [];
let showblue = [];
let showyellow = [];
let showpink = [];

let brenders=[];
let count = 0;
let sec;

// sin wave
let swidth; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 300.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

function preload () {
  hp_f = loadImage("hp_f.png");
  hp_f_2 = loadImage("hp_f_2.png");
  hp_f_4 = loadImage("hp_f_4.png");
  hp_b = loadImage("hp_b.png");
  hp_b_2 = loadImage("hp_b_2.png");
  jet_1 = loadImage("jet_1.png");
  jet_2 = loadImage("jet_2.png");
  bb = loadImage("bb.png");
  bp = loadImage("bp.png");
  by = loadImage("by.png");
  
  baloons = [bb,bp,by];
}

function setup() {
  frameRate(30);
  cwidth = hp_b.width/8*scal;
  
  createCanvas(cwidth,cwidth);
  
  background(227,240,240);
  image(hp_b, 0, 0, cwidth,cwidth);
 

  // sin wave
  amplitude = cwidth/20;
  swidth = cwidth+scal;// サインカーブの長さを変える(cwidth=100%)
  //dx = map(random(), 0, 1, -(TWO_PI/period)*4, -(TWO_PI/period));
  dx = (TWO_PI / period) * scal;// 周期はscal / period 
  yvalues = new Array(floor(swidth / scal));
  
  
  //decide the place of baloons
  for(let i=0;i<yvalues.length;i++) {
    showblue.push(random());
  }
  for(let i=0;i<yvalues.length;i++) {
    showyellow.push(random());
  }
  for(let i=0;i<yvalues.length;i++) {
    showpink.push(random());
  }
}

function draw() {
  currentTime = new Date();
  sec = currentTime.getSeconds();
  
  makeRhombus(301,71,24,[227,240,240,255]);
  
  // sine wave
  fill(255,255,255,20);
  yvalues = calcWave(yvalues, amplitude, dx, 0.015);// speed controled by 4th
  
  renderWave( int(cwidth/2/scal-40)*scal, yvalues ); 
  
  if(sec%2==0) {
    image(hp_b,0,0,cwidth,cwidth);
  } else {
    image(hp_b_2, 0, 0, cwidth,cwidth);
  }
  
  // sine wave with baloons
  renWidth = bb.width/16*scal;
  renHeight = bb.height/16*scal; 
  
  // baloons
  renderWaveImg(int(cwidth/2/scal-10)*scal, yvalues, by, renWidth, renHeight,showyellow);
  renderWaveImg(int(cwidth/2/scal-10)*scal, yvalues, bp, renWidth, renHeight,showpink);
  renderWaveImg(int(cwidth/2/scal-10)*scal, yvalues, bb, renWidth, renHeight,showblue);
  
  if(sec%4===0 || sec%4===2) {
    image(hp_f, 0,0,cwidth,cwidth);
    tint(255,100);
    image(jet_1, 0, 0, cwidth,cwidth);
    tint(255,255);
  } else if (sec%4===1) {
    image(hp_f_2, 0, 0, cwidth,cwidth);
    tint(255,100);
    image(jet_2, 0, 0, cwidth,cwidth);
    tint(255,255);
  } else {
    image(hp_f_4, 0, 0, cwidth,cwidth);
    tint(255,100);
    image(jet_2, 0, 0, cwidth,cwidth);
    tint(255,255);
  }
  
  if(count%17==0){
    rhcolor = [227,240,240,100];
    rhr = int(random(12,28))*scal;
    rh_x = int(random(cwidth)/scal)*scal;
    rh_y = int(random(cwidth)/scal)*scal;
    makeRhombus(rh_x, rh_y, rhr,rhcolor);
    count=0;
  }
  count++;
}



function calcWave(array, h, _dx, velocity) {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += velocity;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < array.length; i++) {
    array[i] = sin(x) * h;
    x += _dx;
  }
  return array;
}

function renderWave(center, array) {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x++) {
    rect(x * scal, center + array[x], scal, scal);
  }
}


function renderWaveImg(center, array,img, i_width, i_height,whereToShow) {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x+=i_width) {
    if(whereToShow[x] > 0.7){
      image(img, x*scal, center +array[x], i_width, i_height);
    }
  }
}



function makeRhombus (x, y, r, color) {// xyは左上、rは大きさ、colorは透過色込み
  //rectr = int(random(2, 15))*2-1;// 奇数で出力
  for (i = 0; i < r; i++) {
      ii = i*2+1;
      j = (r - ii)/2;
      l = r - j*2;
      noStroke();
      fill(color[0],color[1],color[2], color[3]);
      for (k = 0; k<l; k++) {
          rect(x+j*scal+k*scal, y+i*scal, scal, scal);
          if(i!=r-1){
              rect(x+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
          }
      }
    }
}
