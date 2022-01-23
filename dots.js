// CANVAS ELEMENTS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 750;
canvas.width = 750;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//LOAD FUNCTION
window.onload = () => {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //PLAYER IMAGE
  const player = new Image();
  player.onload = function () {
    ctx.drawImage(player, 350, 300, 50, 100);
  };
  player.src = "/images/Player.png";

  //PLAYER CLASS
  class Player {
    constructor() {
      this.x = 350;
      this.y = 300;
      this.w = 50;
      this.h = 100;
      this.reverseX = false;
      this.reverseY = false;
    }
    move(direction) {
      switch (direction) {
        case "ArrowUp":
          if (this.y < 0) {
            this.y = 0;
          } else {
            this.y -= 15;
          }
          break;
        case "ArrowDown":
          this.y += 15;
          break;
        case "ArrowLeft":
          this.x -= 15;
          break;
        case "ArrowRight":
          this.x += 15;
          break;
      }
    }
  }

  //PLAYER VARIABLES & FUNCTIONS
  let circle = new Player();

  //PLAYER ROTATION ON-CLICK

  //MOVEMENT
  // let angleInDegrees = 0;
  // $('#clockwise').click(function(){
  //   angleInDegrees+=90
  //   drawRotated(angleInDegrees)
  // })

  // function drawRotated(degrees){
  //   ctx.save()
  //   ctx.traslate(canvas.width/2,canvas.height/2)
  //   ctx.rotate(degrees*Math.PI/180)
  //   ctx.drawImage(player,-circle.w/2,-circle.w/2)
  //   ctx.restore()
  // }

  //RANDOM CIRLE COLORS
  let colors = ["#f49ac1", "#82ca9c"];
  let randomColor = Math.floor(Math.random() * colors.length);
  colors[randomColor];

  //CICLE CLASS MID TOP
  class ItemMidTop {
    constructor(x, y, color) {
      this.x = 375;
      this.y = 25;
      this.r = 25;
      this.a = 0;
      this.e = Math.PI * 2;
      this.color = colors[randomColor];
      this.reverseX = false;
      this.reverseY = false;
    }

    move() {
      this.y = this.y + 0.5;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS MID TOP
  const ob1 = new ItemMidTop();
  const obstacleArr = [];
  obstacleArr.push(ob1);
  function createObj1() {
    obstacleArr.push(new ItemMidTop());
  }

  // CICLE CLASS MID BOT
  class ItemMidBot {
    constructor(x, y, color) {
      this.x = 375;
      this.y = 700;
      this.r = 25;
      this.a = 0;
      this.e = Math.PI * 2;
      this.color = colors[randomColor];
      this.reverseX = false;
      this.reverseY = false;
    }

    move() {
      this.y = this.y - 0.5;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS MID BOT
  const ob2 = new ItemMidBot();
  // const obstacleArr1 = [];
  obstacleArr.push(ob2);
  function createObj2() {
    obstacleArr.push(new ItemMidBot());
  }

  //CICLE CLASS MID LEFT
  class ItemMidLeft {
    constructor(x, y, color) {
      this.x = 0;
      this.y = 375;
      this.r = 25;
      this.a = 0;
      this.e = Math.PI * 2;
      this.color = colors[randomColor];
      this.reverseX = false;
      this.reverseY = false;
    }

    move() {
      this.x = this.x + 0.5;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS MID LEFT
  const ob3 = new ItemMidLeft();
  // const obstacleArr1 = [];
  obstacleArr.push(ob3);
  function createObj3() {
    obstacleArr.push(new ItemMidLeft());
  }

  //CICLE CLASS MID RIGHT
  class ItemMidRight {
    constructor(x, y, color) {
      this.x = 700;
      this.y = 375;
      this.r = 25;
      this.a = 0;
      this.e = Math.PI * 2;
      this.color = colors[randomColor];
      this.reverseX = false;
      this.reverseY = false;
    }

    move() {
      this.x = this.x - 0.5;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS MID RIGHT
  const ob4 = new ItemMidRight();
  // const obstacleArr1 = [];
  obstacleArr.push(ob4);
  function createObj4() {
    obstacleArr.push(new ItemMidRight());
  }

  //GAME ENGINE AND COLLISION VARIABLES AND FUNCTIONS
  let engine;
  let didCollide;

  //SCORE FUNCTION AND VARIABLE
  let score = 0;
  let scoreInterval;
  function scoreCounter() {
    score += 10;
    ctx.font = "24px serif";
    ctx.fillStyle = "red";
    ctx.fillText(`Score:${0}`, 600, 50);
  }
  scoreCounter();

  //GAME OVER VARIABLE
  function draw() {
    let ctx = document.getElementById("canvas").getContext("2d");
    ctx.font = "48px serif";
    ctx.fillStyle = "white";
    ctx.fillText("Game Over", 150, 350);
  }

  //START GAME
  function startGame() {
    setInterval(createObj1, 1000);
    setInterval(createObj2, 1000);
    setInterval(createObj3, 1000);
    setInterval(createObj4, 1000);
    scoreInterval = setInterval(scoreCounter, 2000);
    document.addEventListener("click", function (e) {
      switch (e.code) {
        case "click":
          //player rotate 90 degrees
          break;
      }
    });
    animate();
  }

  //ANIMATE FUNCTION
  function animate() {
    engine = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fdc689";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(player, circle.x, circle.y, circle.w, circle.h);

    //COLLISION NOT WORKING FOR SOME REASON
    // if (circle.w + 158 / 3.5 >= canvas.width) {
    //   circle.reverseX = true;
    // } else if (circle.w <= 0) {
    //   circle.reverseX = false;
    // }

    //SECOND LOOP FOR CREATING ITEM CLASS OBJECT
    for (let i = 0; i < obstacleArr.length; i++) {
      ctx.fillStyle = colors[randomColor];
      obstacleArr[i].move();
      ctx.beginPath();
      ctx.arc(
        obstacleArr[i].x,
        obstacleArr[i].y,
        obstacleArr[i].r,
        obstacleArr[i].a,
        obstacleArr[i].e,
        colors[randomColor]
      );
      ctx.fill();
      ctx.closePath();
    }

    //SECOND LOOP FOR CREATING ITEM CLASS OBJECT
    for (let i = 0; i < obstacleArr.length; i++) {
      ctx.fillStyle = colors[randomColor];
      obstacleArr[i].move();
      ctx.beginPath();
      ctx.arc(
        obstacleArr[i].x,
        obstacleArr[i].y,
        obstacleArr[i].r,
        obstacleArr[i].a,
        obstacleArr[i].e,
        colors[randomColor]
      );
      ctx.fill();
      ctx.closePath();
      // COLLISION CONDITIONAL STATEMENTS AND VARIABLE DECLARATION
      didCollide = detectCollision(player, obstacleArr[i]);

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
    ctx.fillStyle = "red";
    ctx.fillText(`Score:${score}`, 600, 50);
  }
};

//COLLISION DETECTION
function detectCollision(player, obj1) {
  if (
    player.x < obj1.x + obj1.w &&
    player.x + player.w > obj1.x &&
    player.y < obj1.y + obj1.h &&
    player.y + player.h > obj1.y
  ) {
    return true;
  } else {
    return false;
  }
}
