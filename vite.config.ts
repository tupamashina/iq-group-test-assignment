import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import reactPlugin from '@vitejs/plugin-react-swc';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

import type { UserConfig } from 'vite';

const viteConfig: UserConfig = {
  preview: { port: 8068 },
  build: { target: 'esnext' },
  plugins: [tsconfigPathsPlugin(), reactPlugin(), vanillaExtractPlugin()],
};

export default viteConfig;
