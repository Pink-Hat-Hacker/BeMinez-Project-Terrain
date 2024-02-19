/**
 * Perlin Noise Hover Terrain
 * Uses noise(), beginShape(), and a matrix
 *
 * Z-Axis is changed via the songs amplitude
 * Uses p5.Amplitude() and getLevel()
 *
 * The Coding Train Challenge #11 inspo
 * By - Zoë Valladares aka Pink Hat Hacker
 */

var song;

var cols, rows;
var scl = 15;
var w = 1400;
var h = 1000;
var hover = 0;
var terrain = [];

let backgroundColorPicker;

function preload() {
  song = loadSound("be-minez.mp3");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  song.play();
  amplitude = new p5.Amplitude();
  amplitude.setInput(song);

  /**
   * Customize the Canvas and Terrain:
   *
   * canvas background color picker
   * random leaning terrain rgb color sliders
   * hover speed slider
   * z-axis height - peak and trough inputs
   */

  // BackgroundColorPicker Module and Text
  backgroundColorPicker = createColorPicker("black");
  backgroundColorPicker.position(10, 640);
  bcpText = createP("Background Color Picker");
  bcpText.position(10, 600);

  // Terrain RGB Sliders and Text
  redSlider = createSlider(0, 255, 0);
  redSlider.position(200, 640);
  greenSlider = createSlider(0, 255, 0);
  greenSlider.position(200, 660);
  blueSlider = createSlider(0, 255, 0);
  blueSlider.position(200, 680);
  tcpText = createP("Random RGB Terrain Color Picker (kinda)");
  tcpText.position(200, 600);

  // Hover Speed Slider and Text
  hoverSlider = createSlider(0, 3, 0.05, 0.01);
  hoverSlider.position(10, 740);
  hsText = createP("Hover Speed Slider");
  hsText.position(10, 700);

  // Z-axis Highest Peak and Lowest Trough inputs
  pAndtInput = createInput(50);
  pAndtInput.position(200, 740);
  pAtText = createP("Highest Peak and Lowest Trough Value");
  pAtText.position(200, 700);

  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value
    }
  }
}

function draw() {
  background(backgroundColorPicker.color());
  
  /**
   * Moving the terrain based on Hover Speed and Music Amplitude
   * 
   * get amplitude level
   * get and change hover speed value from slider (flying effect)
   * smooth the terrain using perlin noise()
   * +/- peak and trough height from input value
   */
  var level = amplitude.getLevel();
  hover -= hoverSlider.value();
  var yoff = hover;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      // terrain[x][y] = map(level, noise(xoff, yoff), 0, 10, -150, 100);
      terrain[x][y] = map(
        level,
        0,
        noise(xoff, yoff),
        -pAndtInput.value(),
        abs(pAndtInput.value())
      );
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  /**
   * Creating terrain
   * 
   * line stroke color
   * rotate X-Axis to make grid look 3D
   * move grid to center
   */
  stroke("gray");
  rotateX(PI / 2.5);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    // filling terrain color using rgb sliders
    fill(
      random(redSlider.value() - 50, redSlider.value() + 50),
      random(greenSlider.value() - 50, greenSlider.value() + 50),
      random(blueSlider.value() - 50, blueSlider.value() + 50),
      100
    );

    // terrain grid vertex shape
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}