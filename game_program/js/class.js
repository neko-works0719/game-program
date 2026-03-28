class Player {
  constructor(x, y) {
    this.w = 32;
    this.h = 32;
    this.reset(x, y);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.onGround = false;
  }

  update(blocks) {
    if (keys["ArrowLeft"] || keys["a"]) this.vx -= MOVE_ACC;
    if (keys["ArrowRight"] || keys["d"]) this.vx += MOVE_ACC;
    if ((keys["ArrowUp"] || keys["w"]) && this.onGround) {
      this.vy = JUMP_POWER;
      this.onGround = false;
    }

    this.vy += GRAVITY;
    this.vx *= FRICTION;

    this.x += this.vx;
    this.y += this.vy;

    this.onGround = false;
    for (const b of blocks) {
      if (this.hit(b) && this.vy > 0) {
        if (this.y + this.h - this.vy <= b.y) {
          this.y = b.y - this.h;
          this.vy = 0;
          this.onGround = true;
        }
      }
    }
  }

  hit(obj) {
    return (
      this.x < obj.x + obj.w &&
      this.x + this.w > obj.x &&
      this.y < obj.y + obj.h &&
      this.y + this.h > obj.y
    );
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Block {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  update() {}

  draw() {
    ctx.fillStyle = "#666";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Goal {
  constructor(x, y) {
    this.w = 32;
    this.h = 32;
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
