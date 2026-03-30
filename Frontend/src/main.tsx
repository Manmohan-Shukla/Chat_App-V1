import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './index.css'

// Import your components
import BlinkRoomLanding from './mainHomepage.tsx'
import Sidebar from './Sidebar.tsx'
import Appa from './man.tsx'
// Main App wrapper with state management
const App = () => {
  const [user, setUser] = useState<string | null>(null)
  const [room, setRoom] = useState<string | null>(null)
  const [roomType, setRoomType] = useState<"public" | "private">("public")

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed.username)
    }
  }, [])

  // Protected route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/" replace />
    }
    return <>{children}</>
  }

  // Chat route wrapper (requires room)
  const ChatRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user || !room) {
      return <Navigate to="/dashboard" replace />
    }
    return <>{children}</>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={<BlinkRoomLanding />} 
        />
        
        {/* Dashboard/Sidebar Route - Protected */}
        <Route 
          path="/dashboard" 
          element={
            
              <div style={{ 
                minHeight: '100vh', 
                background: '#000000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Sidebar
                  user={user}
                  setUser={setUser}
                  setRoom={setRoom}
                  setRoomType={setRoomType}
                />
              </div>
          } 
        />
        
        {/* Chat Route - Requires Room */}
        <Route 
          path="/chat" 
          element={
            
              <Appa/>
           
          } 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)