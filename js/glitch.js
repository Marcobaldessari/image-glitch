
var
  canvas, ctx,
  logoWhite, logoBlue, logoRed,
  xPosition, yPosition,
  imageObjShadow, imageObjWithShadow
  ;

canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');
logoWhite = new Image();
logoBlue = new Image();
logoRed = new Image();
logoWhite.src = '../img/logo-white.png';
logoBlue.src = '../img/logo-blue.png';
logoRed.src = '../img/logo-red.png';

imageObjShadow = new Image();
imageObjWithShadow = new Image();

xPosition = (canvas.width / 2) - 67; // 67 = logo size / 2
yPosition = 0;

canvas.addEventListener('click', drawText, false);
window.addEventListener('load', windowLoaded, false);

function windowLoaded() {
  getShadowsTxt();
  gfctx.clearRect(0, 0, canvas.width, canvas.height);
  drawText();
}

function glitch() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(logoWhite, xPosition, yPosition);
  var arr = lineShadowsHeight();
  var sy = 0;
  for (var i = 0; i < arr.length; i++) {
    ctx.drawImage(this, 0, sy, canvas.width, arr[i], getRandomInt(-2 * offset(), 2 * offset()), sy, canvas.width, arr[i]);
    sy = sy + arr[i];
  }
}

function drawText() {
  ctx.drawImage(logoWhite, xPosition, yPosition);
}

function getShadowsTxt() {
  ctx.save();
  ctx.globalCompositeOperation = "destination-over";  //  ???
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(logoBlue, xPosition - 4, yPosition);
  ctx.drawImage(logoRed, xPosition + 4, yPosition);
  imageDataShadows = canvas.toDataURL("image/png", 1.0);
  ctx.restore();

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var glitchLinesAmount = function () {
  return Math.floor((Math.random() * 4) + 4);
};

var offset = function () {
  return Math.floor((Math.random() * 2) + 2);
}

var lineShadowsHeight = function () {
  var h = canvas.height;
  var count = glitchLines();
  var arr = [];
  var s = 0;
  console.log("-------------------------");

  for (var i = 0; i < count; i++) {
    arr[i] = Math.floor(Math.random() * (h / (count - 1) - 1) + 2);
    h = h - arr[i];
    s = s + arr[i];
    arr[count] = canvas.height - s;
    console.log("arr[i]: " + arr[i]);
    console.log("h: " + h);
    console.log("s: " + s);
    console.log("arr[count]: " + arr[count]);
  }
  return arr;
}