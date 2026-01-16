import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('player', '/assets/player.png');
    this.load.audio('jump', '/assets/jump.wav');
  }

  create() {
    this.scene.start('Menu');
  }
}
