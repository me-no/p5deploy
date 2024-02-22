let scal = 1.5;
let actualSize = 512;
let width = actualSize*scal;
let height = actualSize*scal;

let backteal = [154,239,215];
let green = [75,167,95];
let teal = [167,236,205];


// for sine curve
let xspacing = 13*scal; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 16.0; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let yvalssp;

function preload() {
  // wait for preloading on the HTML
  setTimeout('', 1000);

  // Images
  imgbk = loadImage("back.png");
  imgkid = loadImage("kid.png");
  imgkid_light = loadImage("kid_light.png");
  imgkid_bright = loadImage("kid_bright.png");
  imgkid_weak = loadImage("kid_weaklight.png");
  imgman = loadImage("manwhite.png");
  imgbuilds = loadImage("buildingnight.png");
  imgwings = loadImage("20x10.png");
  imgwingl = loadImage("31x16.png");

}

function setup() {
  // for iframe on gallery 
  canvas = createCanvas(width, height);
  canvas.style('width','100%');canvas.style('height','auto');

  background(255);
  //frameRate(240);

  // sine curve
  dx = (TWO_PI / period) * xspacing;
  w =  width + xspacing;
  yvalues = new Array(floor(w / xspacing)); 
  
  image(imgbuilds, 0, 0, width, height);
  //imgbuilds.position(0,0);
  //imgbuilds.style('z-index','-1');
  //imgbuilds.style('width', width.toString());
  //imgbuilds.style('height', height.toString());
  //imgbuilds.show();

  clock = 30;
  //console.log(get(10,10));
}

function draw() {
  image(imgbk, 0, 0, width, height);
  
  //sine curve 
  calcWave();
  renderWave();

  theta += 0.001;
  let phi = theta;
  for (let i = 0; i < yvalues.length; i++){
    yvalues[i] = sin(phi) * amplitude;
    phi +=dx;
  }
  for (let x = 0; x < yvalues.length; x++) {
    image(imgman, x*xspacing, height/2-10*scal-yvalues[x], 15*scal, 29*scal);
  }
  
  x = int(random(-15, actualSize))*scal;
  y = int(random(-15, actualSize))*scal;
  //colorDice = int(random(0, colors.length));
  
  r = int(random(2, 15))*2-1;// 奇数で出力
  tr = random(0, 50);

  if(clock%90 !=0){
    // ひし形
    for (i = 0; i < r; i++) {
        ii = i*2+1;
        j = (r - ii)/2;
        l = r - j*2;
        noStroke();
        fill(255,255,255, tr);
        for (k = 0; k<l; k++) {
            rect(x+j*scal+k*scal, y+i*scal, scal, scal);
            if(i!=r-1){
                rect(x+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
            }
        }
    }
  } else {// 2種類の羽根をプロット
    wingDice = int(random(2));
    scaler = random([1,2]);
    if(wingDice === 0){
      image(imgwings, x, y, 20*scaler*scal, 10*scaler*scal);
    } else {
      image(imgwingl, x, y, 31*scaler*scal, 16*scaler*scal);
    }
  }
  
  fill(255);
  noStroke();
  
  if (clock % 30 ===0 || clock%30 === 1 || clock%30 ===29){
    if(clock%90 !=0){
      image(imgkid_weak, 0, 0, width, height);
    } else {
      image(imgkid_bright, 0, 0, width, height);
    }
  } else {
    image(imgkid, 0, 0, width, height);
  }

  clock++;

}


function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.02;// 波の速さはここ

    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = sin(x) * amplitude;
      x += dx;
    }
  }
  
  function renderWave() {
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
      //ly.ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
    }
  }