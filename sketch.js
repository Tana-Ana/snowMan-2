var canvas;
var backgroundImage, background;
var  obstacle1Image, obstacle2Image;               
var database, gameState;
var form, player, playerCount;
var allPlayers, snowMan, snowMan2, fuels, powerCoins, obstacles; 
var snowMans = [];
var snowMan1Sprite, snowMan2Sprite;
var snowManarr;
var obstacle1g, obstacle2g
var x,y

function preload() {
backgroundImg=loadImage("assets/snowbackground.jpg");
snowMan1=loadImage("assets/snowMan1.jpg");
snowMan2=loadImage("assets/snowMan2.jpg");
obstacle1=loadImage("assets/obstacle1.jpg")
obstacle2=loadImage("assets/obstacle2.jpg")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImg)
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    game.showLeaderboard();
    
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
