import Phaser from 'phaser';
import Boot from './scenes/Boot';
import Menu from './scenes/Menu';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#111',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 800 }, debug: false }
  },
  scene: [Boot, Menu, Game, GameOver]
});
