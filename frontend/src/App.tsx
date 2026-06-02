import { Routes, Route } from 'react-router-dom'
import { useUIConfig } from '@/hooks/useConfig'
import DynamicLayout from '@/components/DynamicLayout'

function App() {
  const { data: config, isLoading, error } = useUIConfig()

  if (isLoading) {
    return <div>Loading configuration...</div>
  }

  if (error) {
    return <div>Error loading configuration</div>
  }

  if (!config) {
    return null
  }

  return (
    <DynamicLayout config={config}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </DynamicLayout>
  )
}

export default App
