const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// ===== 物理定数 =====
const GRAVITY = 0.6;
const FRICTION = 0.85;
const MOVE_ACC = 0.7;
const JUMP_POWER = -13;

// ===== 入力 =====
const keys = {};
window.addEventListener("keydown", e => (keys[e.key] = true));
window.addEventListener("keyup", e => (keys[e.key] = false));

// ===== ゲーム状態 =====
let currentStage = 0;
let gameState = "PLAY";

// ===== ステージデータ =====
const STAGES = [
  // 第1ステージ
  {
    player: { x: 80, y: 500 },
    blocks: [
      { x: 0, y: 600, w: 960, h: 40 },
      { x: 300, y: 480, w: 160, h: 20 }
    ],
    goal: { x: 500, y: 360 }
  },

  // 第2ステージ
  {
    player: { x: 60, y: 520 },
    blocks: [
      { x: 0, y: 600, w: 960, h: 40 },
      { x: 200, y: 520, w: 200, h: 20 },
      { x: 450, y: 460, w: 160, h: 20 },
      { x: 700, y: 400, w: 120, h: 20 }
    ],
    goal: { x: 860, y: 280 }
  },

  // 第3ステージ
  {
    player: { x: 60, y: 520 },
    blocks: [
      { x: 0, y: 600, w: 960, h: 40 },
      { x: 650, y: 480, w: 140, h: 20 }, // 右
      { x: 450, y: 360, w: 140, h: 20 }, // 左
      { x: 700, y: 240, w: 140, h: 20 }  // 右
    ],
    goal: { x: 860, y: 120 }
  }
];
