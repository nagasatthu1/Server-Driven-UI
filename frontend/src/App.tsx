import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from '@/pages/DashboardPage'
import GenericPage from '@/pages/GenericPage'

function App() {
  return (
    <Routes>
      {/* Default redirect to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard page */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Generic page for all sidebar paths - fetches content from API */}
      <Route path="/:path" element={<GenericPage />} />

      {/* Not found */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default App
