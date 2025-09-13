import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DownloadsPage from './pages/DownloadsPage'
import PluginsPage from './pages/PluginsPage'
import TutorialsPage from './pages/TutorialsPage'
import DevicesPage from './pages/DevicesPage'
import DebugPage from './pages/DebugPage'
// import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="downloads" element={<DownloadsPage />} />
        <Route path="plugins" element={<PluginsPage />} />
        <Route path="tutorials" element={<TutorialsPage />} />
        <Route path="devices" element={<DevicesPage />} />
        <Route path="debug" element={<DebugPage />} />
        {/* Contact page removed */}
      </Route>
    </Routes>
  )
}

export default App
