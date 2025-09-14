import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import { AppDataProvider } from './hooks/useAppData'
import './style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppDataProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AppDataProvider>
  </StrictMode>,
)
