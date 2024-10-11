let scal = 2;

// for sine wave 
let dr=  0;
let strum = 2;// height of the wave:反比例
let center = -10*scal;// center of y
let centerNoise=0;
let railNoise = 2;
let tr = 100;// transparency
let count=0;
let rest = 4;

// clock
let handlen = 6*scal;
let rad=0;

function preload() {
  imgback = loadImage("back.png");
  imgfish = loadImage("manbow.png");
  imgtrn = loadImage("train.png");
  imgslider= loadImage("front.png");
  imglight = loadImage("light.png");
  
  imgl1 = loadImage("l1.png");
  imgl2 = loadImage("l2.png");
  imgl3 = loadImage("l3.png");
  
  imgr1= loadImage("r1.png");
  imgr2 = loadImage("r2.png");
  imgr3 = loadImage("r3.png");
  imgr4 = loadImage("r4.png");
  
  imgkid = loadImage("kid.png");
  imgkid2 = loadImage("kid2.png");
  
  imgrail1=loadImage("rail1.png");
  imgrail2=loadImage("rail2.png");
  imgrail3=loadImage("rail3.png");
  imgrail4=loadImage("rail4.png");
  imgrail5=loadImage("rail5.png");
  
  imgclock = loadImage("clock.png");
  
  imgdisplight = loadImage("displaylight.png");
  
  imgfootstep = loadImage("footstep.png");
  imgcatsneak = loadImage("catsneaking.png");
  imgcatspd1 = loadImage("catsuspended1.png");
  imgcatspd2 = loadImage("catsuspended2.png");
}


function setup() {
  cwidth = imgback.width/4*scal;
  cheight = imgback.height/4*scal;
  // for iframe on gallery 
  canvas = createCanvas(cwidth, cheight);// サイト用
  background(210,233,236);
  frameRate(10);
  
  canvas.style('width','100%');canvas.style('height','auto');// レスポンシブ対応

}

function draw() {
  noStroke();
  
  r = int(random(6, 20));// radius
  rhombusColor = [210,233,236,tr];
  rhombusx = int(random(-50*scal,cwidth)/scal)*scal;
  rhombusy = int(random(-50*scal,cheight)/scal)*scal;
  makeRhombus(rhombusx, rhombusy, r*scal, rhombusColor);

  
  fill(255,255,255,tr);
  
  n = noise(centerNoise);
  fish = map(n, 0, 1, 0, 20);
  train = map(n, 0, 1, 0, 30);
  
  drawPixelSineWave((center)*16,strum);
  drawPixelSineWave((center)*4,strum);
  
  //
  // 触ると動くデジタルバージョン:
  //
  // https://me-no.sayosan.cf/SFinthePark/
  //
  // 
  //     ■■■
  //     ■ ■
  //     ■ ■
  //     ■ ■                QR Code
  //   ■■■ ■■■
  //   ■     ■
  //    ■   ■
  //      ■
  // 
  
  

  image(imgback, 0, 0, cwidth, cheight);
  
  drawPixelSineWave((center)*8,strum);
  drawPixelSineWave((center)*8,strum*2);
  
  // manbow 
  if(mouseX>186*scal && mouseY>44*scal && mouseX<327*scal && mouseY<144*scal) {
    image(imgfish, mouseX/186+fish, mouseX/186-fish, cwidth, cheight);
  } else {
    image(imgfish, 0, 0, cwidth, cheight);
  }

  // train
  if(mouseX > 49*scal && mouseY > 28*scal && mouseX < 144*scal && mouseY < 111*scal) {
    image(imgtrn, mouseX/49-train, mouseX/49-train, cwidth, cheight);
  } else {
    image(imgtrn, 0, 0, cwidth,cheight);
  }
  
  centerNoise+=0.1;
  
  

  // the front   
  // UO
  d = new Date();
  uocount = d.getMilliseconds();
  if(90*scal<mouseX && 124*scal<mouseY && mouseX<146*scal && mouseY<216*scal){
    if(uocount<200){
      image(imgl1, 0, 0, cwidth, cheight);
    } else if (uocount<400){
      image(imgl2, 0, 0, cwidth, cheight);
    } else if(uocount < 600) {
      image(imgl3, 0, 0, cwidth, cheight);
    } else {
      image(imgslider, 0, 0, cwidth, cheight);
    }
  } else if(220*scal<mouseX && 95*scal<mouseY && mouseX<357*scal && mouseY<220*scal) {
    if(uocount<150){
      image(imgr1, 0, 0, cwidth, cheight);
    } else if (uocount<300) {
      image(imgr2,  0, 0, cwidth, cheight);
    } else if(uocount<450) {
      image(imgr3,  0, 0, cwidth, cheight);
    } else if(uocount<600) {
      image(imgr4,  0, 0, cwidth, cheight);
    } else {
      image(imgslider, 0, 0, cwidth, cheight);
      image(imgcatsneak, 0, 0, cwidth, cheight);
    }
  } else {
    image(imgslider, 0, 0, cwidth, cheight);
  }

  
  // remote controller 
  if(mouseX > 149*scal && mouseY > 84*scal && mouseX < 185*scal && mouseY < 150*scal) {
    tint(255, 100+100*n);
    image(imgdisplight, 0, 0, cwidth, cheight);
    tint(255,255);
    dig3 = int(map(n, 0, 1, 1,4) );
    fill(97, 131, 49);
    rect(160*scal, 96*scal, scal, scal*3);
    rect(158*scal, 97*scal, scal, scal*2);
    for(let i=0;i < dig3;i++) {
      rect(160*scal,(98-3-i)*scal, scal, scal);
      rect(158*scal, (96-i)*scal, scal, scal);
      rect(156*scal, (99-i)*scal, scal, scal);
    }
    if(mouseIsPressed) {
      if(count >10) {
        image(imgcatspd1, 0, 0, cwidth,cheight);
      } else {
        image(imgcatspd2,0,0,cwidth,cheight);
      }
    }
  }
  
  // rails 
  //rn = noise(railNoise);
  rn = noise(centerNoise);

  //if(mouseX > 252*scal && mouseY > 135*scal && mouseX < 350*scal && mouseY < 184*scal) {
   // railNoise+=0.1;
   //} else {
   //  rn = 0;
   //}
    image(imgrail1, 272*scal, 145*scal-rn*10, imgrail1.width/4*scal, imgrail1.height/4*scal);
    image(imgrail2, 291*scal, 146*scal-rn*8, imgrail2.width/4*scal, imgrail2.height/4*scal);
    image(imgrail3, 311*scal, 147*scal-rn*5, imgrail3.width/4*scal, imgrail3.height/4*scal);
    image(imgrail4, 327*scal, 146*scal+rn*5, imgrail4.width/4*scal, imgrail4.height/4*scal);
    image(imgrail5, 321*scal, 157*scal-rn*5, imgrail5.width/4*scal, imgrail5.height/4*scal);
    image(imgrail5, 335*scal, 156*scal-rn*3, imgrail5.width/4*scal, imgrail5.height/4*scal);  
    
  
  // clock 
  if(mouseX > 191*scal && mouseY > 92*scal && mouseX < 230*scal && mouseY < 141*scal) {
    image(imgclock, 0, 0, cwidth, cheight);
    fill(30,67,59);
    lenx0 = 212*scal;
    leny0 = 115*scal;
    for(let i = 0; i<handlen;i++) {
      lenx = lenx0 + int(i*cos(rad)/scal)*scal;
      leny = leny0 + int(i*sin(rad)/scal)*scal;
      rect(lenx, leny, scal,scal);
    }
    rad++;
    if(rad >= 360) {
      rad=0;
    }
  }
  
  
  // morse
  if(
    count < 2 || (3<=count && count<4) || (5<=count && count<7) || (8<=count && count<=9)
    ||
     (10+rest<=count && count<12+rest)||(13+rest<=count && count<15+rest) || (16+rest<=count && count<17+rest) || (18+rest<=count && count<=20+rest)
    ) {
     image(imglight, 0, 0, cwidth, cheight);
   }
  
  count++;
  
  // kid 
  if(count > 20) {
    image(imgkid2, 0, 0, cwidth, cheight);
  } else {
    image(imgkid, 0, 0, cwidth, cheight);
  }
  
  if(count > 20+rest*2) {
    count = 0;
  }
  
  // for cats
  image(imgfootstep, 0, 0, cwidth,cheight);
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

function drawPixelSineWave (center, sinheight) {
  for(let x =  0; x < width; x++) {
    let angle = dr + x/50;
    let y = map(sin(angle), -sinheight, sinheight, width/4, width*3/4)+center;
    rect(int(x/scal)*scal, int(y/scal)*scal, scal,scal);
  }
  dr += 0.05;
}

