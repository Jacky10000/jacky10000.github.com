var score = 0,
    canvas = document.getElementById("game"),
    ctx = canvas.getContext("2d"),
    px = 10, py = 10,
    w = Math.floor(window.innerWidth / 20),
    h = Math.floor(window.innerHeight / 20),
    gs = 20,
    tc = 20,
    ax = Math.floor(w / 2),
    ay = Math.floor(h / 2),
    xv = 1,
    yv = 0,
    trail = [],
    tail = 2,
    speed = 2,
    time = 0,
    currentInput = true;
window.onresize = function() {
  w = Math.floor(window.innerWidth / 20);
  h = Math.floor(window.innerHeight / 20);
  canvas.height = h * 20;
  canvas.width = w * 20;
  ax = Math.floor(w / 2);
  ay = Math.floor(h / 2);
};
setInterval(function () { time++; }, 30);

canvas.height = h * 20;
canvas.width = w * 20;
ctx.lineJoin = "meter";

function game() {
  if (time > 5) {
    time = 0;
    px += xv;
    py += yv;
    if (px < 0) {
      px = w - 1;
    }
    if (px > w - 1) {
      px = 0;
    }
    if (py < 0) {
      py = h - 1;
    }
    if (py > h - 1) {
      py = 0;
    }
    ctx.fillStyle = "#a4b6ad";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (x = 0; x < w; x++)
      for (y = 0; y < h; y++) {
        ctx.fillStyle = "#9ca9a3";
        ctx.fillRect(x * gs, y * gs, gs - 2, gs - 2);
        ctx.fillStyle = "#a4b6ad";
        ctx.fillRect(x * gs + 2, y * gs + 2, gs - 6, gs - 6);
        ctx.fillStyle = "#9ca9a3";
        ctx.fillRect(x * gs + 4, y * gs + 4, gs - 10, gs - 10);
      }

    ctx.fillStyle = "#000000";
    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
      ctx.fillStyle = "#a4b6ad";
      ctx.fillRect(trail[i].x * gs + 2, trail[i].y * gs + 2, gs - 6, gs - 6);
      ctx.fillStyle = "#000000";
      ctx.fillRect(trail[i].x * gs + 4, trail[i].y * gs + 4, gs - 10, gs - 10);
      if (trail[i].x == px && trail[i].y == py) {
        tail = 2;
      }
    }
    trail.push({ x: px, y: py });
    while (trail.length > tail) {
      trail.shift();
    }

    if (ax == px && ay == py) {
      tail++;
      document.getElementById('score').innerHTML = ++score;
      ax = Math.floor(Math.random() * w);
      ay = Math.floor(Math.random() * h);
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
    ctx.fillStyle = "#a4b6ad";
    ctx.fillRect(ax * gs + 2, ay * gs + 2, gs - 6, gs - 6);
    ctx.fillStyle = "#000000";
    ctx.fillRect(ax * gs + 4, ay * gs + 4, gs - 10, gs - 10);

    currentInput = true;
  }
  requestAnimationFrame(game);
}

game();

var dir = 'LR';

var goleft = function () {
  if (!currentInput) return;
  if (dir == 'LR') return;
  dir = 'LR';
  xv = -1; yv = 0;
  currentInput = false;
}
var goright = function () {
  if (!currentInput) return;
  if (dir == 'LR') return;
  dir = 'LR';
  xv = 1; yv = 0;
  currentInput = false;
}
var goup = function () {
  if (!currentInput) return;
  if (dir == 'DU') return;
  dir = 'DU';
  xv = 0; yv = -1;
  currentInput = false;
}
var godown = function () {
  if (!currentInput) return;
  if (dir == 'DU') return;
  dir = 'DU';
  xv = 0; yv = 1;
  currentInput = false;
}

document.addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 37:
      goleft();
      break;
    case 38:
      goup();
      break;
    case 39:
      goright();
      break;
    case 40:
      godown();
      break;
                   }
});

