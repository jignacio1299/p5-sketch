// The consts marked unused are redeclared in setup() and draw().
// The drawing wouldn't load if I didn't for some reason :/
let angle = 0;
let size = 0;
const CANVAS_X = 750;
const CANVAS_Y = 750;
const CANVAS_BG = color(0, 0, 100);
const TRIANGLE_COUNT = 8;  
const MAX_TRIANGLE_SIZE = 1500;
const ROTATION_SPEED = 0.5;   // Degrees rotated per frame
const GROWTH_SPEED = 1;       // Amount sidelength of all triangles grows per frame
const OFFSET_SIZE_AMT = 250;  // Amount sidelength of triangles differs
const OFFSET_ANGLE_AMT = 40;  // Amount angle between triangles differs


function drawTriangle(offsetSize, offsetAngle, color) {
  const MAX_TRIANGLE_SIZE = 1500;
  // Triangle's size will reset to 0 once it passes MAX_TRIANGLE_SIZE
  let currSize = (size + offsetSize) % MAX_TRIANGLE_SIZE;
  let currAngle = angle + offsetAngle;
  
  push();  // As I understand it, start effects for this shape only?
          // Rather, whatever is drawn before pop() is called?

  translate(CANVAS_X / 2, CANVAS_Y / 2);   // Move origin to the object's position
  rotate(currAngle);                     // Rotate around that origin
  fill(color);

  // Cartesian coordinates for an equilateral triangle centered
  // at the origin. Side length of the triangle is currSize
  triangle( 0              ,  currSize / sqrt(3),
           -currSize / 2   , -currSize / (2 * sqrt(3)), 
           currSize / 2    , -currSize / (2 * sqrt(3)) );
  pop();  // End effects for this shape only?
}

function setup() {
  const TRIANGLE_COUNT = 8;  
  const CANVAS_BG = color(0, 0, 100);
  createCanvas(CANVAS_X, CANVAS_Y);
  background(CANVAS_BG);
  angleMode(DEGREES);
  colorMode(HSB, TRIANGLE_COUNT, 100, 100, 1);  // Use HSB to iterate through just hue
                                // Set max val of hue to 8 to split the colors up evenly
  stroke(255);
}

function draw() {
  const CANVAS_X = 750;
  const CANVAS_Y = 750;
  const TRIANGLE_COUNT = 8;
  const ROTATION_SPEED = 0.5;
  const GROWTH_SPEED = 1;
  const OFFSET_SIZE_AMT = 250;  // Amount sidelength of triangles differs
  const OFFSET_ANGLE_AMT = 40;  // Amount angle between triangles differs
  const CANVAS_BG = color(0, 0, 100); // White background
  
  background(CANVAS_BG);  // Clear previous drawings
  
  
  for(let i = 0; i < TRIANGLE_COUNT; i++) {
    // Since the max value for HSB is 8, each triangle
    // will be colored 
    
    // I would like some help here. the magenta triangle will
    // always be drawn last. This means that when the purple triangle
    // is biggest, magenta ,he screen.
    // I wanted it to be such that the z-indexes of the triangles
    // is ordered such that the largest triangle is drawn last
    // and smaller triangles are drawn on top of it.
    
    // I could calculate the side lengths of all triangles
    // and then sort them and draw in that order, but I am
    // looking for a more succinct solution (potentially using
    // a p5 feature that I am unaware of for now)
    // I compromised by setting the transparency of each triangle to
    // 0.25.
    drawTriangle(OFFSET_SIZE_AMT * i, OFFSET_ANGLE_AMT * i, color(i, 60, 80, 0.25));
  }
  
  {
    push();
    const RECT_SIZE = 600;
    translate(CANVAS_X / 2, CANVAS_Y / 2);   // Move origin to the object's position
    rect(CANVAS_X / 2 - RECT_SIZE / 2, CANVAS_Y / 2 - RECT_SIZE - 2, 
         CANVAS_X / 2 + RECT_SIZE / 2, CANVAS_Y / 2 + RECT_SIZE - 2);
    fill(color(0, 50, 60, 1));
    
    pop();
  }
  
  angle += ROTATION_SPEED;
  size += GROWTH_SPEED;  
}