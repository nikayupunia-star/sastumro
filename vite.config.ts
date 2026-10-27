import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error — უბრალო .mjs plugin, ტიპები არ სჭირდება
import scopeModules from './tools/postcss-scope-modules.mjs';

export default defineConfig({
  plugins: [react()],
  css: { postcss: { plugins: [scopeModules()] } },
});
