var myCanvas = document.querySelector(".mouse-canvas");
var ctx = myCanvas.getContext("2d");

// create  "score"

var score = 0;

function totalScore () {
    ctx.font = "bold 16px monospace";
    ctx.fillStyle = "green";
    ctx.fillText("SCORE ", 10, 20);
    ctx.fillText(score, 60, 20);
} 

// Create the character and charge image
var persoImg = new Image();
persoImg.src = "./images/ellipse.png";

var perso = {
    x: 180,
    y: 503,
    width: 45,
    height: 45,
    isCrashed: false,
    drawMe: function () {
      ctx.drawImage(persoImg, this.x, this.y, this.width, this.height);
    },
    controlBoundries: function () {
      if (this.x < 0) {
        this.x = 0;
      }

      if (this.y < 0) {
        this.y = 0;
      }

      if (this.x > 400 - this.width) {
        this.x = 400 - this.width;
      }

      if (this.y > 550 - this.height) {
        this.y = 550 - this.height;
      }
    }
  };


// Display the character, waste and bullets

function drawScene () {
  // to not repeat the same image at every moves
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  perso.drawMe();

  totalScore();

  allWaste.forEach(function (oneWaste){
    oneWaste.drawMe();

    bulletsArr.forEach(function (oneBullet) {
      oneBullet.y -= 2;
      oneBullet.drawMe();

      if (collision(oneBullet, oneWaste)) {
        oneWaste.y = -40;
        oneWaste.x = Math.random() * 360; 
        oneBullet.y = -150;
        score += 10;
        }
    });

    if (collision(perso, oneWaste)) { 
        // oneWaste.isCrashed = true;
        oneWaste.y = -40;     
        collisionCounter += 1;
      }

  });

  if (collisionCounter >= 3) {
    perso.isCrashed = true;
    waste1.isCrashed = true;
  }

  if (perso.isCrashed) {
    gameOver.drawMe();
  }

  requestAnimationFrame(function () {
      drawScene();
    });
}

drawScene();


// Move the character -----------------------------------

document.onkeydown = function (event) {
    if (perso.isCrashed) {
      // exit the function without moving if the character is crashed
      return;
    }

    switch (event.keyCode) {
      case 37: // left arrow
        perso.x -= 20;
        break;

      case 32: // space bar
      case 38: // up arrow
        // shoot
        var bullet = new Bullet();
        bulletsArr.push(bullet);
        break;

      case 39: // right arrow
        perso.x += 20;
        break;

      case 40: // down arrow
        // perso.y += 10;
        break;
    }

    perso.controlBoundries();
  };


  // Create the collision

  var collisionCounter = 0;

  function collision (rectA, rectB) {

    return rectA.y + rectA.height >= rectB.y
       &&  rectA.y <= rectB.y + rectB.height
       &&  rectA.x + rectA.width >= rectB.x
       &&  rectA.x <= rectB.x + rectB.width;
  }


  var gameOver = {
    x: 10,
    y: 250,
    opacity: 0,
    drawMe: function () {
      if (this.opacity < 1) {
        this.opacity += 0.5;
      }
  
      // fade in the text with globalAlpha
      ctx.globalAlpha = this.opacity;
      ctx.font = "bold 70px monospace";
  
      ctx.fillStyle = "white";
      ctx.fillRect(0, 100, 400, 300);

      ctx.fillStyle = "red";
      ctx.fillText("Game Over", this.x, this.y);
  
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rebeccapurple";
      ctx.strokeText("Game Over", this.x, this.y);
  
      ctx.globalAlpha = 1;
    }
  }


  // var allWaste = ["image", "image", "image", "image"];
  // var imgWast = allWaste[Math.floor(Math.random()* allWaste.length)];



