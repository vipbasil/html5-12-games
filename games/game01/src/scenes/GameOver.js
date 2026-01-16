import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create(data) {
    const { width, height } = this.scale;
    const score = Number(data?.score ?? 0);
    const best = this.updateBestScore(score);

    this.add.rectangle(0, 0, width, height, 0x1b2b34).setOrigin(0, 0);

    this.add
      .text(width / 2, 170, 'GAME OVER', {
        fontSize: '52px',
        color: '#ffffff',
        fontStyle: 'bold'
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 270, `Score: ${score}\nBest: ${best}`, {
        fontSize: '28px',
        color: '#ffffff',
        align: 'center'
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 390, 'Click / Space to play again\nEsc for menu', {
        fontSize: '20px',
        color: '#ffffff',
        align: 'center'
      })
      .setOrigin(0.5)
      .setAlpha(0.9);

    this.input.once('pointerdown', () => {
      this.scene.start('Game');
    });

    this.input.keyboard?.once('keydown-SPACE', () => this.scene.start('Game'));
    this.input.keyboard?.once('keydown-ESC', () => this.scene.start('Menu'));
  }

  updateBestScore(score) {
    try {
      const key = 'game01_flappy_best';
      const currentBest = Number(localStorage.getItem(key) ?? 0);
      const nextBest = Math.max(currentBest, score);
      localStorage.setItem(key, String(nextBest));
      return nextBest;
    } catch {
      return score;
    }
  }
}
