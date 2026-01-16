import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.add.text(400, 300, 'GAME RUNNING', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }
}
