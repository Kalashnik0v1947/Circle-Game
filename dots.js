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

  const endScreen = new Image();
  function theEnd() {
    endScreen.onload = function () {
      ctx.drawImage(endScreen, 0, 0, 750, 750);
    };
    endScreen.src = "/images/gameover-screen.png";
  }

  //PLAYER IMAGE
  const player = new Image();
  player.onload = function () {
    ctx.drawImage(player, 350, 325, 50, 100);
  };
  player.src = "/images/Player.png";

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
      this.y = this.y + 1.25;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS TOP
  const ob1 = new ItemMidTop();
  obstacleArr.push(ob1);
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
      this.y = this.y - 1.25;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS BOT
  const ob2 = new ItemMidBot();
  obstacleArr.push(ob2);
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
      this.x = this.x + 1.25;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS LEFT
  const ob3 = new ItemMidLeft();
  obstacleArr.push(ob3);
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
      this.x = this.x - 1.25;
    }
  }
  //CiRCLE VARIABLES AND FUNCTIONS RIGHT
  const ob4 = new ItemMidRight();
  obstacleArr.push(ob4);
  function createObj4() {
    obstacleArr.push(new ItemMidRight());
  }

  //GAME ENGINE AND COLLISION VARIABLES AND FUNCTIONS
  let engine;
  let didCollide;
  let score = 0;

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
    setInterval(createRandomObject, 2000);
    animate();
  }

  //ANIMATE FUNCTION
  function animate() {
    engine = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

      //90 DEGREE COLLISION
      if (
        didCollide &&
        circle.degree === 90 &&
        obstacleArr[i].color === pinkColor &&
        obstacleArr[i].direction === "right"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
      } else if (
        didCollide &&
        circle.degree === 90 &&
        obstacleArr[i].color === greenColor &&
        obstacleArr[i].direction === "left"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
      } else if (
        didCollide &&
        circle.degree === 270 &&
        obstacleArr[i].color === pinkColor &&
        obstacleArr[i].direction === "left"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
      } else if (
        didCollide &&
        circle.degree === 270 &&
        obstacleArr[i].color === greenColor &&
        obstacleArr[i].direction === "right"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
      } else if (
        didCollide &&
        circle.degree === 0 &&
        obstacleArr[i].color === pinkColor &&
        obstacleArr[i].direction === "top"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
      } else if (
        didCollide &&
        circle.degree === 0 &&
        obstacleArr[i].color === greenColor &&
        obstacleArr[i].direction === "bot"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
      } else if (
        didCollide &&
        circle.degree === 180 &&
        obstacleArr[i].color === pinkColor &&
        obstacleArr[i].direction === "bot"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
      } else if (
        didCollide &&
        circle.degree === 180 &&
        obstacleArr[i].color === greenColor &&
        obstacleArr[i].direction === "top"
      ) {
        score += 1;
        obstacleArr.splice(i, 1);
      }
      // } else if (didCollide) { gameOver()
      // }
    }

    //player
    circle.draw();
    //score
    ctx.font = "24px serif";
    ctx.fillStyle = "#f49ac1";
    ctx.fillText(`Score:${score}`, 600, 50);

    //GAME OVER FUNCTION
    function gameOver() {
      window.cancelAnimationFrame(engine);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f49ac1";
      ctx.font = "bold 48px serif";
      ctx.fillText("Game Over", 250, 200);
      ctx.fillText(`Final Score:${score}`, 250, 250);
      theEnd();
    }
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

// didPinkCollide = detectPinkCollision(circle, obstacleArr[i]);
// didGreenCollide = detectGreenCollision(circle, obstacleArr[i]);

// if(didPinkCollide){
//   console.log("pink collision")
// }

// if(didGreenCollide){
//   console.log("green collision")
// }

// function rotate90(){
//   ctx.save()
//   ctx.translate(canvas.width-25,canvas.height/circle.h-8)
//   ctx.rotate(90*Math.PI/180)
//   ctx.drawImage(player, circle.x, circle.y, circle.w, circle.h);
//   ctx.restore()
//   console.log('test')
//   }

// function detectPinkCollision(player, obj1) {
//   if (
//     player.x < obj1.x + obj1.r &&player.x + player.w > obj1.x && player.y < obj1.y + obj1.r && player.y + player.h > obj1.y
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function detectGreenCollision(player, obj1) {
//   if (
//     player.x < obj1.x + obj1.r &&player.x + player.w > obj1.x && player.y + player.h < obj1.y + obj1.r && player.y > obj1.y
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

// COLLISION DETECTION

//SECOND LOOP FOR CREATING ITEM CLASS OBJECT
// for (let i = 0; i < obstacleArr.length; i++) {
//   ctx.fillStyle = obstacleArr[i].color;
//   obstacleArr[i].move();
//   ctx.beginPath();
//   ctx.arc(
//     obstacleArr[i].x,
//     obstacleArr[i].y,
//     obstacleArr[i].r,
//     obstacleArr[i].a,
//     obstacleArr[i].e,
//     obstacleArr[i].color
//   );
//   ctx.fill();
//   ctx.closePath();
// }

//PLAYER ROTATION ON-CLICK

//90 DEGREE ROTATION
// function rotate90(){
//   ctx.save()
//   ctx.translate(canvas.width-25,canvas.height/circle.h-8)
//   ctx.rotate(90*Math.PI/180)
//   ctx.drawImage(player, circle.x, circle.y, circle.w, circle.h);
//   ctx.restore()
//   console.log('test')
//   }

//180 DEGREE ROTATION
// function rotate180(){
// ctx.save()
// ctx.translate(canvas.width,canvas.height)
// ctx.rotate(180*Math.PI/180)
// ctx.drawImage(player, circle.x, circle.y, circle.w, circle.h);
// ctx.restore()
// }
//270 DEGREE ROTATION
// function rotate270(){
// ctx.save()
// ctx.translate(0,canvas.height)
// ctx.rotate(270*Math.PI/180)
// ctx.drawImage(player, circle.x, circle.y, circle.w, circle.h);
// ctx.restore()
// }

//STARTING POINT
// ctx.drawImage(player, circle.x, circle.y, circle.w, circle.h)

// //180 DEGREE COLLISION
// if(didCollide && circle.degree === 180 && obstacleArr[i].color ==="#f49ac1" && obstacleArr[i].direction === "top"){
//   score +=100
//   obstacleArr.splice(i, 1);
// } else  if(didCollide && circle.degree === 180 && obstacleArr[i].color ==="#82ca9c" && obstacleArr[i].direction === "bot"){
//   score +=100
//   obstacleArr.splice(i, 1);
// }
// else if(didCollide){
//   console.log("180")
// }
// //270 DEGREE COLLISION
// if(didCollide && circle.degree === 270 && obstacleArr[i].color === pinkColor && obstacleArr[i].direction === "left"){
//   score +=100
//   obstacleArr.splice(i, 1);
// } else if(didCollide && circle.degree === 270 && obstacleArr[i].color ===greenColor && obstacleArr[i].direction === "right"){
//   score +=100
//   obstacleArr.splice(i, 1);
// }
// else if(didCollide){
//   console.log("270")
// }

// //0 DEGREE COLLISION
// if(didCollide && circle.degree === 90 && obstacleArr[i].color ==="#f49ac1" && obstacleArr[i].direction === "top"){
//   score +=100
//   obstacleArr.splice(i, 1);
// } else  if(didCollide && circle.degree === 90 && obstacleArr[i].color ==="#82ca9c" && obstacleArr[i].direction === "bot"){
//   score +=100
//   obstacleArr.splice(i, 1);
// }
// else if(didCollide){
//   console.log("collide")
// }
