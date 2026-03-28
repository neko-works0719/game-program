let player;
let blocks = [];
let goal;

function loadStage(index) {
  const data = STAGES[index];
  player = new Player(data.player.x, data.player.y);
  blocks = data.blocks.map(b => new Block(b.x, b.y, b.w, b.h));
  goal = new Goal(data.goal.x, data.goal.y);
  gameState = "PLAY";
}

loadStage(currentStage);

function update() {
  if (gameState !== "PLAY") return;

  player.update(blocks);

  if (player.hit(goal)) {
    gameState = "CLEAR";
    setTimeout(() => {
      currentStage++;
      if (currentStage >= STAGES.length) currentStage = 0;
      loadStage(currentStage);
    }, 1000);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.font = "16px sans-serif";
  ctx.fillText(`STAGE : ${currentStage + 1}`, 20, 30);

  goal.draw();
  blocks.forEach(b => b.draw());
  player.draw();

  if (gameState === "CLEAR") {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.fillText("CLEAR!", canvas.width / 2 - 80, canvas.height / 2);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
