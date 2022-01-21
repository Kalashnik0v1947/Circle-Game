const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 700;
canvas.width = 700;

window.onload = () => {
    document.getElementById("play-button").onclick = () => {
      startGame();
    };