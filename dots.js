// CANVAS ELEMENTS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 1000;
canvas.width = 1000;
ctx.fillStyle = "#fdc689";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(
      img,
      canvas.width / 2 - 50,
      canvas.height / 2 - 100,
      295 / 4,
      535 / 4
    );
  };
  img.src = "/images/Player.png";
}

draw();

//START FUNCTION
// window.onload = () => {
//   document.getElementById("start-button").onclick = function () {
//     // startGame();

//   };

//PLAYER IMAGE
// const img = new Image();
// img.src = "/images/Player.png"
// img.onload = () => {};
// // ctx.drawImage(img,250,250,250,250)

//   function animate() {
// ctx.clearRect(0,0,canvas.height,canvas.width)
// const img = new Image();
// img.src = "/images/Player.png"
// img.onload = () => {};
//   ctx.drawImage(img,250,250,250,250)
//   }
//   animate()

// }
