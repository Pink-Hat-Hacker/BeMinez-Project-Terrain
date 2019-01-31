var song;

function preload(){
    song = loadSound('be-minez.mp3');
}

/*function setup(){
    createCanvas(800,600);
    background(0);
    
    amplitude = new p5.Amplitude();
    song.play();
    amplitude.setInput(song);
}

function draw(){
    background(0);
    //fill(255);
    //noStroke();
    var level= amplitude.getLevel();
    var size = map(level,0,.5,0,200);
    
    for(var rows = 0; rows<70; rows++ ){
    for(var columns = 0; columns < 100; columns++){
      fill(random(50,255), random(40,100), random(180,255));
      ellipse(columns*20, rows*20, size, size);  
    }
  }
    
    //ellipse(width/2, height/2, size, size);
}*/



var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var hover = 0;

var terrain = [];


function setup() {
  createCanvas(600, 600, WEBGL);

  //frameRate(24);
  
  amplitude = new p5.Amplitude();
  amplitude.setInput(song);
  song.play();
  
  cols = w / scl;
  rows = h/ scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
    var level= amplitude.getLevel();
    //var size = map(level,0,.5,0,200);
    
    
  hover -= 0.1;
  var yoff = hover;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(level,noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  
  background(0);
  
  
  stroke(100,100,100);
  //noFill();
  
  translate(0, 50);
  rotateX(PI/3);
  //fill(random(50,200),random(40,250),random(200,255), 70);
  translate(-w/2, -h/2);
  for (var y = 0; y < rows-1; y++) {
    fill(random(50,200),random(40,250),random(200,255), 100);
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
  
 
}

