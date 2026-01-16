import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const gameIds = Array.from({ length: 12 }, (_, index) =>
  `game${String(index + 1).padStart(2, '0')}`
);

const input = Object.fromEntries([
  ['index', resolve(__dirname, 'index.html')],
  ...gameIds.map((gameId) => [
    gameId,
    resolve(__dirname, `games/${gameId}/index.html`)
  ])
]);

export default defineConfig({
  build: {
    rollupOptions: {
      input
    }
  }
});
