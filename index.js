// Variables for the ball
let ballPosX;
let ballPosY;
let diameter;
let xBallDir;
let yBallDir;
let xSpeed;
let ySpeed;

// Variables for the paddle
let paddlePosX;
let paddlePosY;
let paddleWidth;
let paddleHeight;
let started;

// Score variable
let score;

// Game over flag
let gameOver;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ballPosX = random(25, width - 25);
  ballPosY = 50;
  diameter = 50;
  xBallDir = random(-5, 5);
  yBallDir = random(3, 5);
  xSpeed = random(1, 2);
  ySpeed = random(1, 2);
  paddleWidth = 100;
  paddleHeight = 25;
  started = false;
  score = 0; // Initialize score
  gameOver = false; // Initialize game over flag
}

function draw() {
  background(0);
  
  if (!gameOver) { // Only update game if it's not over
    // Ball bounces off walls
    ballPosX += xSpeed * xBallDir;
    ballPosY += ySpeed * yBallDir;
    if (ballPosX < diameter / 2 || ballPosX > windowWidth - 0.5 * diameter) {
      xSpeed *= -1.001;
    }
    if (ballPosY > windowHeight - diameter) {
      gameOver = true; // Set game over flag when ball touches bottom
    }
    if (ballPosY < diameter / 2) {
      ySpeed *= -1; // Reverse ball direction when it hits top
    }

    // Detect collision with paddle
    if (
      ballPosX > paddlePosX &&
      ballPosX < paddlePosX + paddleWidth &&
      ballPosY + diameter / 2 >= paddlePosY
    ) {
      xSpeed *= -1;
      ySpeed *= -1;
      score++; // Increment score when ball hits paddle
    }
  }

  // Draw ball
  fill(255);
  noStroke();
  ellipse(ballPosX, ballPosY, diameter, diameter);

  // Update paddle location
  if (!started) {
    paddlePosX = windowWidth / 2;
    paddlePosY = windowHeight - 100;
    started = true;
  }

  // Draw paddle
  fill('#c1946a');
  noStroke();
  rect(paddlePosX, paddlePosY, paddleWidth, paddleHeight);

  // Draw scoreboard
  fill('#80ced6');
  textSize(40);
  textFont('Impact');
  textAlign(RIGHT);
  text('SCORE: ' + score, width - 30, 70);

  // Draw game over message if game is over
  if (gameOver) {
    fill('#feb236');
    textSize(100);
    textAlign(CENTER, CENTER);
    text('GAME OVER', width / 2, height / 2);
  }
}

// TODO: Using the spacebar create a game reset button
function keyPressed() {
  if (key === ' ' && gameOver) {
    resetGame();
  }
  
  if (!gameOver) {
    if (keyCode === LEFT_ARROW) {
      paddlePosX -= 50;
    } else if (keyCode === RIGHT_ARROW) {
      paddlePosX += 50;
    }
  }
}

// Reset the game
function resetGame() {
  ballPosX = random(25, width - 25);
  ballPosY = 50;
  xBallDir = random(-5, 5);
  yBallDir = random(3, 5);
  xSpeed = random(1, 2);
  ySpeed = random(1, 2);
  score = 0;
  gameOver = false;
}



