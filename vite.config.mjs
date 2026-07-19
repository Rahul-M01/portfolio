import { defineConfig } from 'vitest/config'
import { transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

const jsxInJavaScript = {
  name: 'jsx-in-javascript',
  enforce: 'pre',
  async transform(code, id) {
    if (!/\/src\/.*\.js$/.test(id)) return null
    return transformWithOxc(code, id, { lang: 'jsx', jsx: { runtime: 'automatic' } })
  },
}

export default defineConfig({
  base: '/portfolio/',
  envPrefix: ['VITE_', 'REACT_APP_'],
  plugins: [jsxInJavaScript, react()],
  optimizeDeps: {
    noDiscovery: true,
    include: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/react-fontawesome',
      'prop-types',
      'react',
      'react-dom/client',
      'react-router-dom',
      'styled-components',
    ],
  },
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  },
})
