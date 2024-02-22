let scal = 3;
let currentTime;
let counter;

let canvasWidth, canvasHeight;
let imgWidth, imgHeight;

let noisex = 1, noisey = 2;
let noiselightx = 1, noiselighty =2;
let noisefirefly = 1;

// zodiac sign
let zodiac = [
  [114*scal, 73*scal],
  [155*scal, 63*scal],
  [162*scal, 56*scal],
  [185*scal, 58*scal],
  [205*scal, 70*scal],
  [199*scal, 79*scal],
  [132*scal, 96*scal],
  [107*scal, 115*scal]
];
let hakkos = [];

function preload() {
  imgback = loadImage("back-2.png");
  imgbackfin = loadImage("back-fin-trans.png");
  imgsign = loadImage("sign-renewbdg.png");
  imgsignfired = loadImage("sign-fired-renewbdg.png");
  imglight = loadImage("lantern.png");
  imgdolphinkid = loadImage("dolphinkid-trans.png");
  imgsignlight=loadImage("sign-bright.png");
  imgkidslight = loadImage("kidslight1.png");
  imgkidslight2 = loadImage("kidslight2.png");
  imgfish = loadImage("goldfish.png");
  imgtrain = loadImage("train.png");
  
}

function setup() {
  frameRate(16);
  canvasWidth = 256*scal;// Setup では取得より先にCanvasが生成されることがあるので、手動で画像の高さを予め
  canvasHeight = 362*scal;
  imgWidth = imgback.width/4*scal;
  imgHeight = imgback.height/4*scal;


  // for iframe on gallery 
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.style('width','100%');canvas.style('height','auto');

  background(0, 33, 54);
  counter = 0;
  
  // for train
  trainWidth = imgtrain.width/4*scal;
  trainHeight = imgtrain.height/4*scal;
  trainHorizontal = 204*scal;
  past = 0;
  
  // for floating lights
  red_color =[199,77,69,100];
  red_r = 2*scal;
  
  // for fireworks 
  rhr = 8*scal;
}

function draw() {
  currentTime = new Date();
  currentMin = currentTime.getMinutes();
  currentSec = currentTime.getSeconds();
  currentMillisec = currentTime.getMilliseconds();
  
  // for fireworks
  fire_x = int(random(240, 256))*scal;
  fire_y = int(random(5, 128))*scal;
  sectowidth = map(currentSec, 0, 59, 0, canvasWidth);
  sectoheight = map(currentSec, 0, 59, 0, canvasHeight);
  rhcolors = [sectowidth%125+130, sectoheight%255, 130, 150];

  
  // for floating lights
  red_x = int(random(width)/scal)*scal;
  red_y = int(random(230,240))*scal;
  //red_r = int(random(4, 10))*scal;
  makeRhombus(red_x, red_y, red_r, red_color);
  fill(255,117,24,100);
  //drawPixelSineWave(0);
  
  // for the back brightness
  fill(255,255,255,10);
  noStroke();
  mouseradius = int(random(30,90)/scal)*scal;
  makeCircleAvec(mouseX, mouseY, mouseradius);
  
  back_x = 5-noise(noisex/2)*10;
  back_y = 5-noise(noisey/2)*10;
  light_x= 5-noise(noiselightx)*10;
  light_y = 5-noise(noiselighty)*10;
  image(imgback, back_x-5*scal, back_y-5*scal, imgWidth, imgHeight);

  makeRhombus(fire_x, fire_y, rhr, rhcolors);

  // train
  takeTime = 8;// 全車両が通過する時間
  carNumber = 8;
  trVertex = currentSec%takeTime;
  if(currentMin%3==0 && currentSec < takeTime) {
    traincordx = map(trVertex*1000+currentMillisec, 0, takeTime*1000, -trainWidth, canvasWidth+(carNumber-1)*trainWidth);
    for(let i = 0; i<carNumber; i++) {
      showTrainCar(traincordx-trainWidth*i);
    }
  }


  // for sign with background
  if(230*scal < mouseX &&  mouseY < 168*scal){
    image(imgsignfired, -5*scal, -5*scal, imgWidth, imgHeight);
  } else {
    image(imgsign, -5*scal, -5*scal, imgWidth, imgHeight);
  }
  
  
  // floatin light
  image(imglight, light_x/2-5*scal, light_y/2-5*scal, imgWidth, imgHeight);
  
  // zonaic brightness
  fill(92, 115, 140, 5);
  for(let hakko of hakkos) {
    //even = counter%2+1;
    makeCircleAvec(hakko[0]-scal*4, hakko[1]-scal*4, mouseradius/5);
  }

  // sign brightness
  if(67*scal <mouseX && 155*scal<mouseY &&mouseX <116*scal && mouseY < 222*scal){
    signtint = map(mouseradius, 30,90, 160,255);
    tint(255,255,255,signtint);
    image(imgsignlight, -5*scal, -5*scal, imgWidth, imgHeight);
    tint(255,255,255,255);
  }
  
  //fireflies
  brness = map(mouseradius, 30,90,100,255);
  fill(255, 219,103, brness);
  rect(36*scal+noise(noisex)*30, 275*scal+noise(noisey)*30, scal, scal);
  rect(105*scal+noise(noiselightx)*10, 285*scal+noise(noiselighty)*10, scal,scal);
  rect(55*scal+noise(noiselighty)*16, 310*scal+noise(noisefirefly)*16, scal,scal);
  rect(30*scal+noise(noiselightx)*20, 330*scal+noise(noiselightx)*20, scal*2,scal*2);
  
  // following the mouse cursor
  rect(mouseX-scal, mouseY-scal, scal*2, scal*2);
  
  fill(255,255,255,10);
  mouseradius = int(noise(noisefirefly)*36);
  makeCircleAvec(mouseX, mouseY, mouseradius);
  
  
  if(zodiac.length == 0) {
    image(imgdolphinkid, -5*scal, -5*scal, imgWidth, imgHeight);
    //hakkos = [];
    imgback = imgbackfin;
  }

  // for kid's light
  if(168*scal<mouseX && 251*scal < mouseY && mouseX <212*scal && mouseY < 347*scal) {
    if(currentSec%2 == 0){
      image(imgkidslight, -5*scal, -5*scal, imgWidth, imgHeight);
    } else {
      image(imgkidslight2, -5*scal, -5*scal, imgWidth, imgHeight);
    }
    image(imgfish, 200*scal+noise(noisefirefly)*10-5, 328*scal, imgfish.width/4*scal, imgfish.height/4*scal);
  }
  
  noisex +=0.01;
  noisey +=0.02;
  noiselightx +=0.1;
  noiselighty +=0.2;
  noisefirefly +=0.3;
  //counter++;
  
}


function makeCircleAvec (x0,y0,radius) {
  // plot circles
  // with larger scaling
  scal_ord = scal;
  scal = scal*2;
  for (let theta = 0; theta < 360; theta++) {
    relativex = radius*cos(radians(theta));// 極座標→デカルト座標：x軸
    relativey = radius*sin(radians(theta));// 極座標→デカルト座標：y軸
    x = relativex + x0;
    y = relativey + y0;
    intx = int(x/scal)*scal;
    inty = int(y/scal)*scal;

    for (let k = 0; k < abs(relativey)/scal; k++){
      if(relativey <= 0) { rect(intx, inty + k*scal, scal, scal); }
      else { rect(intx, inty - k*scal, scal, scal); }
    }
  }  
  scal = scal_ord;// reset scal
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

/*
function drawPixelSineWave (center) {
  for(let x =  0; x < width; x+=scal/10) {
    let angle = dr + x/50;
    let y = map(sin(angle), -strum, strum, 230*scal, 250*scal)+center;
    rect(int(x/scal)*scal, int(y/scal)*scal, scal,scal);
  }
  dr += 0.1;
}
*/
function mouseClicked() {
  for(let star of zodiac) {
    let dist = 6*scal;
    if (abs(mouseX-star[0]) < dist && abs(mouseY-star[1]) < dist) {
      hakkos.push(star);
      zodiac = zodiac.filter(e => e != star);
    }
  }
}

function runTrain() {
  cars = 10;
  trainhere = map(currentMillisec, 0, 1000, -trainWidth, canvasWidth+trainWidth*cars);
  for(let i = 0; i<cars; i++) {
    image(imgtrain, trainhere-trainWidth*i, trainHorizontal, trainWidth, trainHeight);
  }
}

function showTrainCar (x) {
  image(imgtrain, x, trainHorizontal, trainWidth, trainHeight);
}