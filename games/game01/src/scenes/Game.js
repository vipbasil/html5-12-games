import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.score = 0;
    this.hasStarted = false;
    this.isGameOver = false;
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(0, 0, width, height, 0x70c5ce).setOrigin(0, 0);

    this.groundHeight = 80;
    this.ground = this.physics.add.staticImage(width / 2, height - this.groundHeight / 2, 'ground');
    this.ground.refreshBody();

    this.pipes = this.physics.add.group({ allowGravity: false, immovable: true });
    this.scoreZones = this.physics.add.group({ allowGravity: false, immovable: true });

    this.bird = this.physics.add.sprite(width * 0.28, height * 0.45, 'bird');
    this.bird.setCollideWorldBounds(false);
    this.bird.body.setAllowGravity(false);
    this.bird.body.setSize(32, 20, true);

    this.scoreText = this.add
      .text(width / 2, 60, '0', {
        fontSize: '56px',
        color: '#ffffff',
        fontStyle: 'bold'
      })
      .setOrigin(0.5);

    this.pipeSpeed = 220;
    this.pipeGap = 175;
    this.pipeIntervalMs = 1350;
    this.pipeSpawnX = width + 80;
    this.pipeMinCenterY = 140;
    this.pipeMaxCenterY = height - this.groundHeight - 140;

    this.pipeTimer = this.time.addEvent({
      delay: this.pipeIntervalMs,
      loop: true,
      paused: true,
      callback: this.spawnPipePair,
      callbackScope: this
    });

    const flap = () => {
      if (this.isGameOver) return;
      if (!this.hasStarted) this.startRun();
      this.bird.setVelocityY(-320);
      this.bird.setAngularVelocity(0);
    };

    this.input.on('pointerdown', flap);
    this.input.keyboard?.on('keydown-SPACE', flap);

    this.physics.add.collider(this.bird, this.ground, () => this.gameOver(), undefined, this);
    this.physics.add.collider(this.bird, this.pipes, () => this.gameOver(), undefined, this);
    this.physics.add.overlap(this.bird, this.scoreZones, (_, zone) => this.onScoreZone(zone), undefined, this);

    this.add
      .text(width / 2, height - this.groundHeight - 30, 'Click / Space to flap', {
        fontSize: '18px',
        color: '#ffffff'
      })
      .setOrigin(0.5)
      .setAlpha(0.9);
  }

  startRun() {
    this.hasStarted = true;
    this.bird.body.setAllowGravity(true);
    this.spawnPipePair();
    this.pipeTimer.paused = false;
  }

  spawnPipePair() {
    if (this.isGameOver) return;

    const { height } = this.scale;
    const centerY = Phaser.Math.Between(this.pipeMinCenterY, this.pipeMaxCenterY);
    const topY = centerY - this.pipeGap / 2;
    const bottomY = centerY + this.pipeGap / 2;

    const topPipe = this.pipes.create(this.pipeSpawnX, topY, 'pipe');
    topPipe.setOrigin(0.5, 1);
    topPipe.setFlipY(true);
    topPipe.setVelocityX(-this.pipeSpeed);

    const bottomPipe = this.pipes.create(this.pipeSpawnX, bottomY, 'pipe');
    bottomPipe.setOrigin(0.5, 0);
    bottomPipe.setVelocityX(-this.pipeSpeed);

    const zoneHeight = height - this.groundHeight;
    const scoreZone = this.scoreZones.create(this.pipeSpawnX + 40, zoneHeight / 2, 'scoreZone');
    scoreZone.setVisible(false);
    scoreZone.body.setSize(12, zoneHeight, true);
    scoreZone.setVelocityX(-this.pipeSpeed);
  }

  onScoreZone(zone) {
    if (this.isGameOver) return;
    zone.destroy();
    this.score += 1;
    this.scoreText.setText(String(this.score));
  }

  gameOver() {
    if (this.isGameOver) return;
    this.isGameOver = true;

    this.pipeTimer.paused = true;
    this.pipes.setVelocityX(0);
    this.scoreZones.setVelocityX(0);
    this.bird.setTint(0xff6b6b);

    this.time.delayedCall(450, () => {
      this.scene.start('GameOver', { score: this.score });
    });
  }

  update() {
    if (!this.bird) return;

    if (!this.isGameOver) {
      if (this.bird.y < -50) this.gameOver();

      if (this.hasStarted) {
        const angle = Phaser.Math.Clamp(this.bird.body.velocity.y / 8, -30, 90);
        this.bird.setAngle(angle);
      } else {
        this.bird.setAngle(0);
      }
    }

    for (const pipe of this.pipes.getChildren()) {
      if (pipe.x < -120) pipe.destroy();
    }
    for (const zone of this.scoreZones.getChildren()) {
      if (zone.x < -120) zone.destroy();
    }
  }
}
