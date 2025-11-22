// Yılan Oyunu (Level + Countdown) — Selim için

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const cols = 20, rows = 20;
const cell = canvas.width / cols;

let snake, dir, pendingDir, food, score, level, intervalMs, timerId, paused, walls, baseLength, targetLengthToPass, countdownRunning;

const elScore = document.getElementById('score');
const elLevel = document.getElementById('level');
const elSpeed = document.getElementById('speed');
const elMsg = document.getElementById('message');
const btnRestart = document.getElementById('restart');
const btnPause = document.getElementById('pauseBtn');

btnRestart.addEventListener('click', () => reset(1, true));
btnPause.addEventListener('click', handlePauseStart);

function handlePauseStart() {
  if (countdownRunning) return;

  // Oyun başlamamışsa (interval yoksa), başlat
  if (!timerId && !paused) {
    showCountdown(startGame);
    return;
  }

  paused = !paused;
  btnPause.textContent = paused ? 'Devam' : 'Duraklat';
}

function reset(levelStart = 1, fullReset = false) {
  clearInterval(timerId);
  timerId = null;
  paused = true;
  countdownRunning = false;

  if (fullReset) {
    score = 0;
    elScore.textContent = score;
    level = 1;
  } else {
    level = levelStart;
  }
  elLevel.textContent = level;

  baseLength = 5;
  initSnake();
  intervalMs = 200;
  walls = [];
  setupLevel(level);
  placeFood();
  updateSpeedUI();
  render();
  showMessage('Hazır mısın? Başlamak için "Başlat" butonuna 2 defa bas.');
  btnPause.textContent = 'Başlat';
}

function initSnake() {
  const startX = Math.floor(cols / 2);
  const startY = Math.floor(rows / 2);
  snake = [];
  for (let i = 0; i < baseLength; i++) {
    snake.push({ x: startX - i, y: startY });
  }
  dir = { x: 1, y: 0 };
  pendingDir = null;
}

function setupLevel(lv) {
  walls = [];
  targetLengthToPass = baseLength + 6 + (lv - 1) * 3;

  if (lv >= 2) {
    const count = 6 + (lv - 2) * 2;
    for (let i = 0; i < count; i++) {
      const horizontal = Math.random() < 0.5;
      const len = Math.floor(3 + Math.random() * 6);
      if (horizontal) {
        const y = Math.floor(Math.random() * rows);
        const xStart = Math.floor(Math.random() * (cols - len));
        for (let x = xStart; x < xStart + len; x++) walls.push({ x, y });
      } else {
        const x = Math.floor(Math.random() * cols);
        const yStart = Math.floor(Math.random() * (rows - len));
        for (let y = yStart; y < yStart + len; y++) walls.push({ x, y });
      }
    }
  }
}

function placeFood() {
  const candidateYs = [];
  const want = Math.min(6, rows);
  while (candidateYs.length < want) {
    const y = Math.floor(Math.random() * rows);
    if (!candidateYs.includes(y)) candidateYs.push(y);
  }
  const fy = candidateYs[Math.floor(Math.random() * candidateYs.length)];
  let fx;
  do {
    fx = Math.floor(Math.random() * cols);
  } while (isCellOccupied(fx, fy));
  food = { x: fx, y: fy };
}

function isCellOccupied(x, y) {
  for (const s of snake) if (s.x === x && s.y === y) return true;
  for (const w of walls) if (w.x === x && w.y === y) return true;
  return false;
}

function tick() {
  if (paused || countdownRunning) return;

  if (pendingDir) {
    if (!(pendingDir.x === -dir.x && pendingDir.y === -dir.y)) dir = pendingDir;
    pendingDir = null;
  }

  let head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // wrap-around
  if (head.x < 0) head.x = cols - 1;
  if (head.x >= cols) head.x = 0;
  if (head.y < 0) head.y = rows - 1;
  if (head.y >= rows) head.y = 0;

  // duvar çarpışması
  for (const w of walls)
    if (w.x === head.x && w.y === head.y) return gameOver();

  // kendi kuyruğu
  for (let i = 0; i < snake.length; i++)
    if (snake[i].x === head.x && snake[i].y === head.y) return gameOver();

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 20;
    elScore.textContent = score;
    intervalMs = Math.max(50, Math.floor(intervalMs * 0.95));
    updateSpeedUI();
    placeFood();
    if (snake.length >= targetLengthToPass) return levelUp();
  } else {
    snake.pop();
  }

  render();
}

function updateSpeedUI() {
  elSpeed.textContent = Math.round(1000 / intervalMs) + ' TPS';
  if (timerId) {
    clearInterval(timerId);
    timerId = setInterval(tick, intervalMs);
  }
}

function levelUp() {
  showMessage(`Tebrikler! ${level}. seviyeyi geçtiniz.`);
  clearInterval(timerId);
  paused = true;
  setTimeout(() => {
    level++;
    elLevel.textContent = level;
    baseLength = 5;
    initSnake();
    setupLevel(level);
    placeFood();
    render();
    showCountdown(startGame);
  }, 1500);
}

function gameOver() {
  showMessage(`Kaybettiniz! Skor: ${score}. Yeniden başlatmak için butona basın.`);
  paused = true;
  clearInterval(timerId);
  timerId = null;
  btnPause.textContent = 'Başlat';
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#071029';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // grid
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= cols; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cell, 0);
    ctx.lineTo(i * cell, canvas.height);
    ctx.stroke();
  }
  for (let j = 0; j <= rows; j++) {
    ctx.beginPath();
    ctx.moveTo(0, j * cell);
    ctx.lineTo(canvas.width, j * cell);
    ctx.stroke();
  }

  // çerçeve
  ctx.strokeStyle = '#2a506a';
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // duvarlar
  if (walls.length) for (const w of walls) drawCell(w.x, w.y, '#a23a3a');

  // yem
  drawCircle(food.x, food.y);

  // yılan
  for (let i = 0; i < snake.length; i++) {
    const s = snake[i];
    const shade = i === 0 ? '#9fe2a6' : `rgba(160,220,150,${1 - i / snake.length * 0.6})`;
    drawCell(s.x, s.y, shade, i === 0);
  }
}

function drawCell(x, y, color, isHead) {
  ctx.fillStyle = color;
  const pad = 4;
  ctx.fillRect(x * cell + pad / 2, y * cell + pad / 2, cell - pad, cell - pad);
  if (isHead) {
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x * cell + pad / 2, y * cell + pad / 2, cell - pad, cell - pad);
  }
}

function drawCircle(x, y) {
  ctx.fillStyle = '#ff4d4d';
  const cx = x * cell + cell / 2;
  const cy = y * cell + cell / 2;
  const r = cell * 0.35;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}

// Geri sayım
function showCountdown(onFinish) {
  countdownRunning = true;
  let count = 3;
  const countdown = setInterval(() => {
    showMessage(count);
    count--;
    if (count < 0) {
      clearInterval(countdown);
      countdownRunning = false;
      showMessage('');
      onFinish();
    }
  }, 600);
}

function showMessage(txt) {
  elMsg.textContent = txt;
}

function startGame() {
  paused = false;
  btnPause.textContent = 'Duraklat';
  clearInterval(timerId);
  timerId = setInterval(tick, intervalMs);
  showMessage('');
}

// Kontroller
window.addEventListener('keydown', (e) => {
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','W','A','S','D'].includes(e.key)) e.preventDefault();
  switch (e.key) {
    case 'ArrowUp': case 'w': case 'W': pendingDir = {x:0,y:-1}; break;
    case 'ArrowDown': case 's': case 'S': pendingDir = {x:0,y:1}; break;
    case 'ArrowLeft': case 'a': case 'A': pendingDir = {x:-1,y:0}; break;
    case 'ArrowRight': case 'd': case 'D': pendingDir = {x:1,y:0}; break;
  }
});

// Dokunmatik
let touchStart = null;
canvas.addEventListener('touchstart', e => {
  const t = e.touches[0];
  touchStart = {x:t.clientX, y:t.clientY};
});
canvas.addEventListener('touchend', e => {
  if (!touchStart) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStart.x;
  const dy = t.clientY - touchStart.y;
  if (Math.abs(dx) > Math.abs(dy))
    pendingDir = {x: dx>0?1:-1, y:0};
  else
    pendingDir = {x:0, y: dy>0?1:-1};
  touchStart = null;
});

// Başlangıç
reset(1, true);
