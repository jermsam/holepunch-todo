import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import wasm from 'vite-plugin-wasm';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), wasm()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    esbuild: {
      supported: {
        'top-level-await': true //browsers can handle top-level-await features
      },
    },
    optimizeDeps: {
      // This is necessary because otherwise `vite dev` includes two separate
      // versions of the JS wrapper. This causes problems because the JS
      // wrapper has a module level variable to track JS side heap
      // allocations, initializing this twice causes horrible breakage
      exclude: ["@automerge/automerge-wasm"]
    }
  };
});
