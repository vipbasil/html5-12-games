import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
  }

  create() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    if (!this.textures.exists('bird')) {
      graphics.fillStyle(0xffd34d, 1);
      graphics.fillRoundedRect(0, 0, 34, 24, 6);
      graphics.fillStyle(0xffffff, 1);
      graphics.fillCircle(24, 9, 5);
      graphics.fillStyle(0x222222, 1);
      graphics.fillCircle(25, 9, 2);
      graphics.fillStyle(0xff8a3d, 1);
      graphics.fillTriangle(32, 12, 40, 9, 40, 15);
      graphics.generateTexture('bird', 42, 24);
      graphics.clear();
    }

    if (!this.textures.exists('pipe')) {
      graphics.fillStyle(0x2ecc71, 1);
      graphics.fillRect(0, 0, 80, 600);
      graphics.fillStyle(0x25b863, 1);
      graphics.fillRect(0, 0, 10, 600);
      graphics.fillRect(70, 0, 10, 600);
      graphics.fillStyle(0x1f9e55, 1);
      graphics.fillRect(0, 0, 80, 30);
      graphics.fillRect(0, 570, 80, 30);
      graphics.generateTexture('pipe', 80, 600);
      graphics.clear();
    }

    if (!this.textures.exists('scoreZone')) {
      graphics.fillStyle(0xffffff, 1);
      graphics.fillRect(0, 0, 2, 2);
      graphics.generateTexture('scoreZone', 2, 2);
      graphics.clear();
    }

    if (!this.textures.exists('ground')) {
      graphics.fillStyle(0x8e5a2b, 1);
      graphics.fillRect(0, 0, 800, 80);
      graphics.fillStyle(0x79c65a, 1);
      graphics.fillRect(0, 0, 800, 14);
      graphics.fillStyle(0x6ab44f, 1);
      graphics.fillRect(0, 14, 800, 6);
      graphics.generateTexture('ground', 800, 80);
    }
    graphics.destroy();

    this.scene.start('Menu');
  }
}
