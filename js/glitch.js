// Based on Okkapi's https://codepen.io/okkapi/pen/ZpNbpb?editors=0010

window.addEventListener('load', windowLoaded, false);

function windowLoaded() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');

  var text = "M";
  var logoWhite = new Image();
  var logoBlue = new Image();
  var logoRed = new Image();
  logoWhite.src = '../img/logo-white.png';
  logoBlue.src = '../img/logo-blue.png';
  logoRed.src = '../img/logo-red.png';

  // var xPosition = (canvas.width / 2);
  // var yPosition = (canvas.height / 2);

  var xPosition = (canvas.width / 2);
  var yPosition = (0);


  var imageObjShadow = new Image();
  //  var imageObj = new Image();
  var imageObjWithShadow = new Image();
  // imageData = canvas.toDataURL("image/png", 1.0);

  canvas.addEventListener('mouseover', loop, false);
  loop();

  function loop() {
    window.setTimeout(function () {
      glitch();
      loop();
    }, Math.random() * 1000)
  }
  function glitch() {
    imageObjShadow.onload = function () { 
      context.clearRect(0, 0, canvas.width, canvas.height);
      var arr = lineShadowsHeight();
      var sy = 0;
      //console.log(arr);
      for (var i = 0; i < arr.length; i++) {
        context.drawImage(this, 0, sy, canvas.width, arr[i], getRandomInt(-2 * offset(), 2 * offset()), sy, canvas.width, arr[i]);
        sy = sy + arr[i];
      }
      drawText();
      imageDataWithShadow = canvas.toDataURL("image/png", 1.0);

      imageObjWithShadow.onload = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(this, 0, 0, canvas.width, canvas.height / 3 + 5, 1, 0, canvas.width, canvas.height / 3 + 5);
        context.drawImage(this, 0, canvas.height / 3 + 5, canvas.width, canvas.height / 3 - 5, 0, canvas.height / 3 + 5, canvas.width, canvas.height / 3 - 5);
        context.drawImage(this, 0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3, 0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3);
      }
      imageObjWithShadow.src = imageDataWithShadow;
    }
    imageObjShadow.src = imageDataShadows;

    setTimeout(function () {
      imageObjWithShadow.onload = function () {
        context.clearRect(0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3);
        var arr = lineShadowsHeight();
        //console.log(arr);
        var sy = 0;
        for (var i = 0; i < arr.length; i++) {
          context.drawImage(this, 0, sy, canvas.width, arr[i], getRandomInt(-2 * offset(), 2 * offset()), sy, canvas.width, arr[i]);
          sy = sy + arr[i];
        }

        //context.drawImage(this, 0, (canvas.height/3)*2, canvas.width, canvas.height/3, 2.5, (canvas.height/3)*2, canvas.width, canvas.height/3);
      }
      imageObjWithShadow.src = imageDataWithShadow;
    }, 80);

    setTimeout(function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawText();
    }, getRandomInt(80, 300));
  }

  function drawText() {
    context.font = "normal 80px Roboto Condensed";
    context.fillStyle = "#FFFFFF";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.drawImage(logoWhite, xPosition + 2, yPosition);
    // context.fillText(text, xPosition, yPosition);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var lineShadows = function () {
    return Math.floor(Math.random() * (7 - 4 + 1) + 4);
  };

  var offset = function () {
    return Math.floor(Math.random() * (3 - 2 + 1) + 2) * 0.8;
  }

  var timeBack = function () {
    var max = 300;
    var min = 80;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var lineShadowsHeight = function () {
    var h = canvas.height;
    var count = lineShadows();
    var arr = [];
    var s = 0;

    for (var i = 0; i < count; i++) {
      arr[i] = Math.floor(Math.random() * (h / (count - 1) - 2 + 1) + 2);
      h = h - arr[i];
      s = s + arr[i];
      arr[count] = canvas.height - s;
    }
    return arr;
  }

  function getShadowsTxt() {
    context.save();
    // context.font = "bold 80px Roboto Condensed";
    // context.textAlign = "center";
    // context.textBaseline = "middle";
    context.globalCompositeOperation = "destination-over";
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = "#a3004a";
    // context.fillText(text, xPosition - 2, yPosition);
    context.drawImage(logoBlue, xPosition - 2, yPosition);
    // context.fillStyle = "#09c4de";
    // context.fillText(text, xPosition + 2, yPosition);
    context.drawImage(logoRed, xPosition + 2, yPosition);

    context.restore();

    imageDataShadows = canvas.toDataURL("image/png", 1.0);
  }

  // function getShadowsImg() {
  //   context.save();
  //   context.globalCompositeOperation = "destination-over";
  //   context.drawImage(logoWhite, 0, 0);
  //   context.restore();
  // }

  getShadowsTxt();
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawText();

  //lineShadowsHeight();
}