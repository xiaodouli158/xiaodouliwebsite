import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AppDataProvider } from './hooks/useAppData'
import './style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppDataProvider>
  </StrictMode>,
)
