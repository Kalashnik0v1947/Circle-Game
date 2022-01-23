// CANVAS ELEMENTS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 750;
canvas.width = 750;
// ctx.fillStyle = "#fdc689";
// ctx.fillRect(0, 0, canvas.width, canvas.height);


//PLAYER
const player = new Image();
player.onload = function () {ctx.drawImage(player,350,300,50,100);};
player.src = "/images/Player.png";


//LOAD FUNCTION
window.onload = () => {
  document.getElementById("start-button").onclick = function () {
    startGame();
  }



//PLAYER CLASS
class Player {
  constructor() {
    this.x = 475;
    this.y = 425;
    this.w = 50;
    this.h = 100;
    this.reverseX = false;
    this.reverseY = false;
    }

  move(direction) {
      switch (direction) {
        case "click":
        //rotate player 90 degrees
        break;
      }
    }
  }

  
//PLAYER VARIABLES & FUNCTIONS
  let circle = new Player();


//CICLE CLASS 
  class Item {
    constructor(x, y, color) {
      this.x = 500;
      this.y = 0;
      this.w = 50;
      this.h = 50;
      this.reverseX = false; 
      this.reverseY = false;
    }

    move() {
      this.y = this.y + 0.5;
    }
  }


//CiRCLE VARIABLES AND FUNCTIONS
  const ob1 = new Item();
  const obstacleArr = [];
  obstacleArr.push(ob1);
  function createObj() {
    obstacleArr.push(new Item());
  }


//GAME ENGINE AND COLLISION VARIABLES AND FUNCTIONS
let engine;
let didCollide;


//SCORE FUNCTION AND VARIABLE
let score = 0;
let scoreInterval;
function scoreCounter() {
  score += 100;
  ctx.font = "24px serif";
  ctx.fillStyle = "red";
  ctx.fillText(`Score:${score}`, 50, 100);
}
scoreCounter();



//GAME OVER VARIABLE
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "48px serif";
  ctx.fillStyle = "white";
  ctx.fillText("Game Over", 150, 350);
}



//START GAME 
function startGame() {
  setInterval(createObj, 2000)
  scoreInterval = setInterval(scoreCounter, 1000)
  document.addEventListener("click", function (e) {
  switch (e.code){
    case "click":
      //player rotate 90 degrees
      break;
      }
})
animate()
};

//ANIMATE FUNCTION
function animate() {
  engine = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fdc689";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillText(`Your Score:${score}`, 80, 50);
  ctx.drawImage(img, circle.x, circle.y, circle.w, circle.h);


  //COLLISION NOT WORKING FOR SOME REASON
  if (circle.w + 158 / 3.5 >= canvas.width) {
    circle.reverseX = true;
  } else if (circle.w <= 0) {
    circle.reverseX = false;
  }

  

//SECOND LOOP FOR CREATING ITEM CLASS OBJECT   
  for (let i = 0; i < obstacleArr.length; i++) {
    ctx.fillStyle = "#870007";
    obstacleArr[i].move();
    ctx.fillRect(
      obstacleArr[i].x,
      obstacleArr[i].y,
      obstacleArr[i].w,
      obstacleArr[i].h
    );
  }

//SECOND LOOP FOR CREATING ITEM CLASS OBJECT  
    for (let i = 0; i < obstacleArr.length; i++) {
    ctx.fillStyle = obstacleArr[i].color;
    obstacleArr[i].move();
    ctx.fillRect(
      obstacleArr[i].x,
      obstacleArr[i].y,
      obstacleArr[i].w,
      obstacleArr[i].h
    );

// COLLISION CONDITIONAL STATEMENTS AND VARIABLE DECLARATION
    didCollide = detectCollision(raceCar, obstacleArr[i]);

    if (didCollide) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      gameOver();
    }
    //IS THIS ONE NEEDED????
    if (didCollide) {
      console.log("COLLISION");
      obstacleArr.splice(i, 1);
    }
  }

//GAME OVER FUNCTION
  function gameOver() {
    window.cancelAnimationFrame(engine);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "bold 48px serif";
    ctx.fillText("Game Over", 145, 325);
    ctx.fillStyle = "white";
    ctx.fillText(`Final Score:${score}`, 120, 375);
    clearInterval(scoreInterval);
  }
}
}

//COLLISION DETECTION 
function detectCollision(player, obj) {
  if (
    player.x < obj.x + obj.w &&
    player.x + player.w > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.h > obj.y
  ) {
    return true;
  } else {
    return false;
  }
}