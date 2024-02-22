let scal = 4;

let cwidth, cheight;

// sin wave
let swidth; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 300.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let dvel;
let yvalues; // Using an array to store height values for the wave

function preload() {
  kid = loadImage("kid.png");
  kid2 = loadImage("kid_brink.png");
  back = loadImage("back.png");
  cloud = loadImage("cloud.png");
  wall = loadImage("wall.png");
  himawari = loadImage("himawari.png");
}

function setup() {
  cwidth = back.width/4*scal;
  cheight = back.height/4*scal;
  canvas = createCanvas(cwidth, cheight);
  // for HTML background
  canvas.position(0,0);
  canvas.style('width','100%');canvas.style('height','auto');

  image(back, 0, 0, cwidth, cheight);
  
  // sin wave
  //period =scal/TWO_PI;
  swidth = cwidth+scal;
  dx = (TWO_PI / period) * scal;// 周期はscal / period 
  dvel = map(random(), 0, 1, -2, 2);// 二つ目のサインカーブの周期を変える
  yvalues = new Array(floor(swidth / scal));
}

function draw() {
  //tint(255,255,255,100);
  image(back, 0, 0, cwidth, cheight);
  //tint(255,255,255,255);
  
  noStroke();
  fill(255);
  rect(0,99*scal,cwidth,scal);
  
  // sine curve 
  yvalues = calcWave(yvalues, amplitude, dx, 0.02);
  renderWave( int(cheight/2/scal)*scal, yvalues );
  
  yvalues = calcWave(yvalues, amplitude*2, dx*dvel, 0.01);
  renderWave( int(cheight/2/scal)*scal, yvalues);
  
  image(cloud, 0, 0, cwidth, cheight);
  image(wall, 0, 0, cwidth, cheight);
  
  image(himawari, 0, 0, cwidth, cheight);
  
  // draw a line on mouse cursor
  for(let i =0; i<cwidth; i+=scal){// 式はy=x-mouseX+mouseY
    fill(255);
    rect(i, i-mouseX+mouseY, scal, scal);
    fill(255,255,255,140);
    rect(i, i-mouseX+mouseY-scal, scal, scal);
    rect(i, i-mouseX+mouseY+scal, scal,scal);
    fill(255,255,255,70);
    rect(i, i-mouseX+mouseY-2*scal, scal, scal);
    rect(i, i-mouseX+mouseY+2*scal, scal,scal);
  }
  
  d = new Date();
  secnow = d.getSeconds();
  
  if(secnow%2===0){
    image(kid, 0, 0, cwidth, cheight);
  } else {
    image(kid2, 0, 0, cwidth, cheight);
  }
  
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

