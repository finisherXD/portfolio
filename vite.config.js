import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Deliberately no manualChunks. Splitting React and Framer Motion into their
// own files was measured slower on a high-latency connection — the extra
// round trips cost more than the parallel compile saved (first paint
// 848ms -> 1812ms at 250ms RTT). One bundle stays faster here.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
