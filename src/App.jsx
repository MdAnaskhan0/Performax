import React from 'react'
import Navbar from './components/Header'
import { Route, Routes } from 'react-router-dom'
import MonitorPageTest from './pages/MonitorTestPage'
import KeyboardTestPage from './pages/KeyboardTestPage'
import MouseTestPage from './pages/MouseTestPage'
import MicroPhoneTestPage from './pages/MicroPhoneTestPage'
import WebCamTestPage from './pages/WebCamTestPage'
import CpuTestPage from './pages/CpuTestPage'
import GpuTestPage from './pages/GpuTestPage'


const App = () => {
  return (
    <>
      <Navbar />
      <div className='mx-30'>
        <Routes>
          <Route path="/monitor-test" element={<MonitorPageTest />} />
          <Route path="/keyboard-test" element={<KeyboardTestPage />} />
          <Route path="/mouse-test" element={<MouseTestPage />} />
          <Route path="/webcam-test" element={<WebCamTestPage />} />
          <Route path="/microphone-test" element={<MicroPhoneTestPage />} />
          <Route path="/cpu-test" element={<CpuTestPage />} />
          <Route path="/gpu-test" element={<GpuTestPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App