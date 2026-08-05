import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Browsers restore your previous scroll position on reload, which on a
// one-page site drops you into the middle of it. Always open at the top —
// unless the URL carries an anchor, which the visitor asked for on purpose.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
if (!window.location.hash) {
  window.scrollTo(0, 0)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
