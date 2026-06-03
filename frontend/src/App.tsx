import { Routes, Route } from 'react-router-dom'
import { useUIConfig } from '@/hooks/useConfig'
import DynamicLayout from '@/components/DynamicLayout'
import ExamplesPage from '@/pages/ExamplesPage'
import { DynamicFormDemoPage } from '@/pages/DynamicFormDemoPage'

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
    <Routes>
      <Route path="/" element={<DynamicLayout config={config}><div>Home Page</div></DynamicLayout>} />
      <Route path="/examples" element={<ExamplesPage />} />
      <Route path="/dynamic-form" element={<DynamicFormDemoPage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default App
