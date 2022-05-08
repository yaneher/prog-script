const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
};


const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
};

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
};

const brickRowCount = 9;
const brickColumnCount = 5;

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
	bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}



delete bricks[1][2]; //Создание  смайлика задание 2
delete bricks[2][3];
delete bricks[3][1];
delete bricks[3][3];
delete bricks[4][3];
delete bricks[5][1];
delete bricks[5][3];
delete bricks[6][3];
delete bricks[7][2];

let score = 0;

function update() {
  speedupBall();
  movePaddle();
  moveBall();
  draw();
  requestAnimationFrame(update);
}
update();

function speedupBall() { //задание 1
  if (score >= 10 && score < 20) {ball.speed = 5;}
  if (score >= 20 && score < 30) {ball.speed = 6;}
  if (score >= 30 && score < 40) {ball.speed = 7;}
  if (score >= 40 && score < 50) {ball.speed = 8;}
  if (score >= 50 && score < 60) {ball.speed = 9;}
  if (score >= 60 && score < 70) {ball.speed = 10;}
  if (score >= 70) {ball.speed = 11;}
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}



function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScore();
  drawBall();
  drawPaddle();
  drawBricks();
}

function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#D2691E' : 'transparent';
	  ctx.fill();
      ctx.closePath();
    });
  });
}

function drawScore(){ //задание 3
 ctx.font= "20px Arial";
 ctx.fillText(`Score: ${score}`, canvas.width - 100,30 );
 if (score>=25) {ctx.fillText(`ИПЗ лучшие!`, canvas.width - 230,30);}
}


function movePaddle() {
  paddle.x += paddle.dx;


  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}


document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}


function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}



function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; 
  }

  
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

 

  
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }


  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && 
          ball.x + ball.size < brick.x + brick.w && 
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h 
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

function showAllBricks() {
  bricks.forEach(column => {
    column.forEach(brick => (brick.visible = true));
  });
}


function increaseScore() {
  score++;

  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks();
  }
}
