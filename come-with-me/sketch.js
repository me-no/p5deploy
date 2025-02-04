let scal = 2;
let wid = 256;

// random-walk grid
let startPoints = [], squareStartPoints=[], perlinStartPoints= [];// initial edges for random-walk grids
let noiseval = Math.random(0,10);
let noisex = 1;
let noisey = 2;

function preload() {
  cWidth = wid*scal;
  base = loadImage("cwm-base-d.png");
  front = loadImage("cwm-d-lessen.png");
}

function setup() {
  frameRate(16);
  createCanvas(cWidth, cWidth);
  image(base,0,0,cWidth,cWidth);
  
  // randam-walk grid
  rad = PI/2;
  radius = scal*4;
  //startPoints.push([100*scal, 155*scal], [180*scal, 138*scal]);// 両手を始点にランダムウォークを開始させる
  startPoints.push([100*scal, 155*scal]);
  
  //squareStartPoints.push([radius,radius],[cWidth-radius, radius]);// 上端からSquareの描画を開始
  squareStartPoints.push([100*scal, 155*scal],[100*scal, 155*scal]);// 中央からSquare の描画を開始

  count=0;
}

function draw() {
  count+=1;
  
  backx = noise(noisex)-0.5;
  backy = noise(noisey)-0.5;
  image(front,backx,backy,cWidth,cWidth);
  
  noisex+=0.02;noisey +=0.02;

  grid_tr = random(50,100);
  
  makeLine();
  
  makeSquare();
  
  
  for (let j = 0; j < perlinStartPoints.length; j++) {// perlin noise
    let perlin_dir = noise(noiseval);// noise returns float between 0 to 1;
    let perlin_rad = rad * int(map(perlin_dir, 0, 1, 0, 4));

    let start_x = perlinStartPoints[j][0];
    let start_y = perlinStartPoints[j][1];
    // perlin noise 
    stroke(100,200,255);
    perlin_x = start_x + radius*cos(perlin_rad);
    perlin_y = start_y + radius*sin(perlin_rad);
    line(start_x, start_y, perlin_x, perlin_y);

    perlinStartPoints[j][0] = perlin_x;
    perlinStartPoints[j][1] = perlin_y;
    noiseval+=0.1;
  }
  // 配列のリセット
  resetArray(startPoints);
  resetArray(squareStartPoints);
  resetArray(perlinStartPoints);  
}

/*
function mousePressed () {
  press_x = int(mouseX/radius)*radius;
  press_y = int(mouseY/radius)*radius

  // ランダムウォークのスタート地点の配列にクリック位置を追加する
  //startPoints.push([press_x, press_y]);
  //perlinStartPoints.push([press_x, press_y]);// ノイズ函数使うならこっち
  squareStartPoints.push([press_x, press_y]);// セル状の足跡ならこっち
}
*/

function resetArray(array){// 配列が長すぎるときキリの良いところで要素を消す
  if(array.length > 5){
    for (let i =0; i < array.length; i++){
      if(array[i][0]< 0 || array[i][0] > cWidth){
        array.splice(i, 1);
      }else if(array[i][1] < 0 || array[i][1] > cWidth) {
        array.splice(i, 1);
      }
    }
  }
}


function makeLine() {
  for(let i = 0; i < startPoints.length; i++) {// random noise
    dir = int(random(0,4));
  
    stroke(255,255,255);
    noFill();

    let start_x = startPoints[i][0];
    let start_y = startPoints[i][1];

    if(start_x < 0){// 画角の外に出ないように
      dir = 0;
    } else if (start_x > cWidth){
      dir = 2;
    } else if (start_y < 0) {
      dir = 1;
    } else if (start_y > cWidth) {
      dir = 3;
    }
  
    target_x = start_x + radius*cos(rad*dir);
    target_y = start_y + radius*sin(rad*dir);
    line(start_x, start_y, target_x, target_y);
    
    startPoints[i][0] = target_x;
    startPoints[i][1] = target_y;
    
  }
}

function makeSquare() {
  for(let i = 0; i < squareStartPoints.length; i++) {// square cell 
    let dir = int(random(0,4));
    
    squareRadius=radius;

    stroke(255,255,255, grid_tr);
    //noFill();
    fill(255,255,255, grid_tr);
    let start_x = squareStartPoints[i][0];
    let start_y = squareStartPoints[i][1];

    if(start_x < 0){// 画角の外に出ないように
      dir = 0;
    } else if (start_x > cWidth){
      dir = 2;
    } else if (start_y < 0) {
      dir = 1;
    } else if (start_y > cWidth) {
      dir = 3;
    }    
    
    target_x = start_x + squareRadius*cos(rad*dir);
    target_y = start_y + squareRadius*sin(rad*dir);
    rect(target_x, target_y, squareRadius, squareRadius);

    squareStartPoints[i][0] = target_x;
    squareStartPoints[i][1] = target_y;
  }
}