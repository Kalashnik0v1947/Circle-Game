// CANVAS ELEMENTS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 750;
canvas.width = 750;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//PLAY BUTTON
window.onload = () => {
  document.getElementById("play-button").onclick = function () {
    startGame();
  };
  //MUTE BUTTON
  document.getElementById("mute-button").onclick = function () {
    backgroundAudio.pause();
  };

  //SOUND EFFECTS
  function hitmarker() {
    let audio = new Audio("sounds/hit marker Sound Effect.wav");
    audio.play();
  }
  function gameOverSound() {
    let audio = new Audio("sounds/gameover-retro.wav");
    audio.play();
  }
  let backgroundAudio = new Audio("sounds/Eric Prydz - Opus (OUT NOW).mp3");

  function backgroundSound() {
    backgroundAudio.play();
  }

  //GAME ENGINE AND COLLISION VARIABLES AND FUNCTIONS
  let engine;
  let didCollide;
  let intervalTime = 4000;
  let score = 0;
  let speed = 0;
  let level = 0;

  //PLAYER IMAGE
  const player = new Image();
  player.src = "images/Player.png";
  player.onload = function () {
    ctx.drawImage(player, 350, 325, 50, 100);
  };

  //PLAYER CLASS
  class Player {
    constructor() {
      this.x = 350;
      this.y = 325;
      this.w = 50;
      this.h = 100;
      this.degree = 0;
      this.translateX = 0;
      this.translateY = 0;
      this.reverseX = false;
      this.reverseY = false;
    }
    move(direction) {
      switch (direction) {
        case "click":
          rotate90();
          break;
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.translateX, this.translateY);
      ctx.rotate((this.degree * Math.PI) / 180);
      ctx.drawImage(player, this.x, this.y, this.w, this.h);
      ctx.restore();
    }
    rotate() {
      if (this.degree >= 270) {
        this.degree = 0;
        this.translateX = 0;
        this.translateY = 0;
      } else if (this.degree === 0) {
        this.degree = 90;
        this.translateX = canvas.width;
        this.translateY = canvas.height / this.h - 8;
      } else if (this.degree === 90) {
        this.degree = 180;
        this.translateX = canvas.width;
        this.translateY = canvas.height;
      } else {
        this.degree = 270;
        this.translateX = 0;
        this.translateY = canvas.height;
      }
    }
  }

  //PLAYER VARIABLES & FUNCTIONS
  let circle = new Player();
  const obstacleArr = [];

  //RANDOM CIRLE COLORS
  let pinkColor = "#f49ac1";
  let greenColor = "#82ca9c";
  function determineRandomColor() {
    let colors = [pinkColor, greenColor];
    let randomColor = Math.floor(Math.random() * colors.length);
    console.log(colors[randomColor]);
    return colors[randomColor];
  }

  //CICLE CLASS TOP
  class ItemMidTop {
    constructor(x, y, color) {
      this.x = 375;
      this.y = 25;
      this.r = 25;
      this.a = 0;
      this.e = Math.PI * 2;
      this.points = 1;
      this.color = determineRandomColor();
      this.reverseX = false;
      this.reverseY = false;
      this.direction = "top";
    }

    move() {
      this.y = this.y + speed;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS TOP
  const ob1 = new ItemMidTop();
  function createObj1() {
    obstacleArr.push(new ItemMidTop());
  }

  // CICLE CLASS BOT
  class ItemMidBot {
    constructor(x, y, color) {
      this.x = 375;
      this.y = 700;
      this.r = 25;
      this.a = 0;
      this.e = Math.PI * 2;
      this.points = 1;
      this.color = determineRandomColor();
      this.reverseX = false;
      this.reverseY = false;
      this.direction = "bot";
    }

    move() {
      this.y = this.y - speed;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS BOT
  const ob2 = new ItemMidBot();
  function createObj2() {
    obstacleArr.push(new ItemMidBot());
  }

  //CICLE CLASS LEFT
  class ItemMidLeft {
    constructor(x, y, color) {
      this.x = 0;
      this.y = 375;
      this.r = 25;
      this.a = 0;
      this.e = Math.PI * 2;
      this.points = 1;
      this.color = determineRandomColor();
      this.reverseX = false;
      this.reverseY = false;
      this.direction = "left";
    }

    move() {
      this.x = this.x + speed;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS LEFT
  const ob3 = new ItemMidLeft();
  function createObj3() {
    obstacleArr.push(new ItemMidLeft());
  }

  //CICLE CLASS RIGHT
  class ItemMidRight {
    constructor(x, y, color) {
      this.x = 700;
      this.y = 375;
      this.r = 25;
      this.a = 0;
      this.e = Math.PI * 2;
      this.points = 1;
      this.color = determineRandomColor();
      this.reverseX = false;
      this.reverseY = false;
      this.direction = "right";
    }

    move() {
      this.x = this.x - speed;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS RIGHT
  const ob4 = new ItemMidRight();
  function createObj4() {
    obstacleArr.push(new ItemMidRight());
  }

  //RANDOM DIRECTION OBJECTS
  function createRandomObject(arr) {
    let randomObj = Math.floor(Math.random() * 4);
    switch (randomObj) {
      case 0:
        createObj1();
        break;

      case 1:
        createObj2();
        break;

      case 2:
        createObj3();
        break;

      case 3:
        createObj4();
        break;
    }
  }

  //START GAME
  function startGame() {
    document.addEventListener("click", function (e) {
      console.log(e);
      switch (e.type) {
        case "click":
          circle.rotate();
          break;
      }
    });
    setInterval(createRandomObject, intervalTime);
    animate();
    backgroundSound();
  }

  //ANIMATE FUNCTION
  function animate() {
    engine = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //SCORE & LEVEL
    ctx.font = "24px arial";
    ctx.fillStyle = pinkColor;
    ctx.fillText(`Score: ${score}`, 600, 50);
    ctx.fillText(`Level: ${level}`, 100, 50);

    //PLAYER
    circle.draw();

    //LEVELS
    level = Math.floor(score / 3) + 1;
    speed = level * 0.25 + 0.25;

    //LOOP FOR CREATING ITEM CLASS OBJECT
    for (let i = 0; i < obstacleArr.length; i++) {
      ctx.fillStyle = obstacleArr[i].color;
      obstacleArr[i].move();
      ctx.beginPath();
      ctx.arc(
        obstacleArr[i].x,
        obstacleArr[i].y,
        obstacleArr[i].r,
        obstacleArr[i].a,
        obstacleArr[i].e,
        obstacleArr[i].color
      );
      ctx.fill();
      ctx.closePath();

      // COLLISION
      didCollide = detectCollision(circle, obstacleArr[i]);
      if (
        didCollide &&
        circle.degree === 90 &&
        obstacleArr[i].color === pinkColor &&
        obstacleArr[i].direction === "right"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
        hitmarker();
      } else if (
        didCollide &&
        circle.degree === 90 &&
        obstacleArr[i].color === greenColor &&
        obstacleArr[i].direction === "left"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
        hitmarker();
      } else if (
        didCollide &&
        circle.degree === 270 &&
        obstacleArr[i].color === pinkColor &&
        obstacleArr[i].direction === "left"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
        hitmarker();
      } else if (
        didCollide &&
        circle.degree === 270 &&
        obstacleArr[i].color === greenColor &&
        obstacleArr[i].direction === "right"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
        hitmarker();
      } else if (
        didCollide &&
        circle.degree === 0 &&
        obstacleArr[i].color === pinkColor &&
        obstacleArr[i].direction === "top"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
        hitmarker();
      } else if (
        didCollide &&
        circle.degree === 0 &&
        obstacleArr[i].color === greenColor &&
        obstacleArr[i].direction === "bot"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
        hitmarker();
      } else if (
        didCollide &&
        circle.degree === 180 &&
        obstacleArr[i].color === pinkColor &&
        obstacleArr[i].direction === "bot"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
        hitmarker();
      } else if (
        didCollide &&
        circle.degree === 180 &&
        obstacleArr[i].color === greenColor &&
        obstacleArr[i].direction === "top"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
        hitmarker();
      } else if (didCollide) {
        gameOver();
      }
    }
  }
  //GAME OVER FUNCTION
  function gameOver() {
    window.cancelAnimationFrame(engine);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = greenColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = pinkColor;
    ctx.font = "bold 48px arial";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 10;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeText("Game Over", 260, 350);
    ctx.fillText("Game Over", 260, 350);
    ctx.strokeText(`Level: ${level} Score: ${score}`, 205, 400);
    ctx.fillText(`Level: ${level} Score: ${score}`, 205, 400);
    gameOverSound();
    backgroundAudio.pause();
  }
};
function detectCollision(player, obj1) {
  if (
    player.x < obj1.x + obj1.r &&
    player.x + player.w > obj1.x &&
    player.y < obj1.y + obj1.r &&
    player.y + player.h > obj1.y
  ) {
    return true;
  } else {
    return false;
  }
}
