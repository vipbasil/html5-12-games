import Phaser from 'phaser';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(0, 0, width, height, 0x70c5ce).setOrigin(0, 0);
    this.add.image(width / 2, height / 2 - 40, 'bird').setScale(1.4);

    this.add
      .text(width / 2, 150, 'FLAPPY BIRD', {
        fontSize: '48px',
        color: '#ffffff',
        fontStyle: 'bold'
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 40, 'Click / Tap to start\nSpace or Click to flap', {
        fontSize: '22px',
        color: '#ffffff',
        align: 'center'
      })
      .setOrigin(0.5);

    this.add.image(width / 2, height - 40, 'ground');

    this.input.once('pointerdown', () => {
      this.scene.start('Game');
    });

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start('Game');
    });
  }
}
