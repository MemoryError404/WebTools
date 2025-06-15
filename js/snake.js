const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const width = canvas.width;
const height = canvas.height;

let snake;
let direction;
let food;
let score;
let game;

function init() {
  snake = [];
  snake[0] = { x: 9 * box, y: 10 * box };
  direction = "RIGHT";
  food = {
    x: Math.floor(Math.random() * (width / box)) * box,
    y: Math.floor(Math.random() * (height / box)) * box
  };
  score = 0;
  document.getElementById("score").innerText = "分數：" + score;

  // 如果之前有在跑，先清掉
  if(game) clearInterval(game);

  // 隱藏重新開始按鈕
  document.getElementById("restart-btn").style.display = "none";

  // 開始遊戲循環
  game = setInterval(draw, 100);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (key === 38 && direction !== "DOWN") direction = "UP";
  else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function collision(head, array) {
  for(let i = 0; i < array.length; i++) {
    if(head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction === "LEFT") snakeX -= box;
  else if(direction === "UP") snakeY -= box;
  else if(direction === "RIGHT") snakeX += box;
  else if(direction === "DOWN") snakeY += box;

  // 判斷死亡：撞牆或撞自己
  if(snakeX < 0 || snakeX >= width || snakeY < 0 || snakeY >= height || collision({x: snakeX, y: snakeY}, snake)) {
    clearInterval(game);
    // 顯示重新開始按鈕
    document.getElementById("restart-btn").style.display = "inline-block";
    return;
  }

  if(snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById("score").innerText = "分數：" + score;
    food = {
      x: Math.floor(Math.random() * (width / box)) * box,
      y: Math.floor(Math.random() * (height / box)) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift({ x: snakeX, y: snakeY });
}

// 初始啟動
init();
