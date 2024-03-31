let scal = 10;

//let Sprite = p5.play.Sprite;


let kingyo_text;
let dodai,do_text,dai_text;

function preload () {
  object = loadImage("object.png");
  kingyo = loadImage("kingyo.png");
}

function setup() {
  cwidth = object.width/8*scal;
  cheight = object.height/8*scal;
  //bffr = createCanvas(cwidth, cheight);
  bffr = createCanvas(256, 256);
  bffr.hide();
  bffr.background(255);
  
  /*
  kingyo_text = `
.rrrr.rrr
rbrrrrrr
rrrrrrrrr
.rrrr.rrr
`;
  
  do_text = `
.........bbbb.bbbb
.........bbbb.bbbb
bbbbbb...bbbb.bbbb
bbbbbb...bbbb.bbbb
bbbbbb...bbbb.bbbb
bbbbbb............
bbbbbb............
bbbbbb............
bbbbbbbbbbbbbb....
bbbbbbbbbbbbbb....
bbbbbbbbbbbbbb....
bbbbbbbbbbbbbb....
bbbbbbbbbbbbbb....
bbbbbbbbbbbbbb....
bbbbbb............
bbbbbb............
bbbbbb............
bbbbbb............
bbbbbb............
bbbbbb............
`;
  
  dai_text = `
........bbbbbb
........bbbbbb
........bbbbbb
........bbbbbb
..bbbbbbbbbbbbbbbbbb
..bbbbbbbbbbbbbbbbbb
..bbbbbbbbbbbbbbbbbb
..bbbbbbbbbbbbbbbbbb
..bbbbbbbbbbbbbbbbbb
..bbbbbbbbbbbbbbbbbb
.......bbbbbbbb
......bbbbbbbbbb
.....bbbbbbbbbbbb
....bbbbbb..bbbbbb
...bbbbbb....bbbbbb
..bbbbbb......bbbbbb
.bbbbbb........bbbbbb
.bbbbb..........bbbbb
`;
  */
  let palette = {
    r: color(240,82,82),
    b: color(20,24,36),
  };
  
  //bffr.world.gravity.y = 10;
  
  /*
  kingyo = new Sprite();
  kingyo.img = spriteArt(kingyo_text, scal, palette);
  kingyo.x = 21*scal+kingyo.w/2;
  kingyo.y = 36*scal+kingyo.h/2;
  
  dott = new Sprite();
  dott.img = spriteArt(do_text, scal, palette);
  dott.x = 13*scal+dott.w/2;
  dott.y = 22*scal+dott.h/2;
  dott.collider = 's';
  
  dai = new Sprite();
  dai.img = spriteArt(dai_text, scal, palette);
  dai.x = 33*scal+dai.w/2;
  dai.y = 24*scal+dai.h/2;
  dai.collider = 's';
  */
  
}

function draw() {
  bffr.background(255);
  image(object,0,0,256,256);
  //image(object,0,0,cwidth,cheight);
  //image(kingyo, accelerationX, accelerationY, kingyo.width/8*scal, kingyo.height/8*scal);
  
  
  let data =  bffr.drawingContext.canvas.toDataURL()
  let myPlane = document.getElementById('myPlane')
  myPlane.setAttribute("material", "src", `url(${data});`);
  myPlane.setAttribute("material", "side", "double");
  
  
  /*
  dott.debug = mouse.pressing();
  dai.debug = mouse.pressing();
  kingyo.debug = mouse.pressing();
  */
}
