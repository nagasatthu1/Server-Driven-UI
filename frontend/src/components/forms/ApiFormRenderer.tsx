import React from 'react'
import { useDynamicForm } from '../../hooks/useDynamicForm'
import { DynamicForm } from '../forms/DynamicForm'
import { FormConfig } from '../../types/api'

interface ApiFormRendererProps {
  formConfig?: FormConfig
  apiEndpoint?: string
  dataEndpoint?: string
  initialData?: Record<string, any>
  onSubmit?: (data: Record<string, any>) => Promise<any>
}

export const ApiFormRenderer: React.FC<ApiFormRendererProps> = ({
  formConfig,
  apiEndpoint,
  dataEndpoint,
  initialData,
  onSubmit,
}) => {
  const {
    config,
    formData,
    errors,
    loading,
    submitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
  } = useDynamicForm({
    formConfig,
    apiEndpoint,
    initialData,
    onSubmit,
  })

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="mt-4 text-gray-600">Loading form configuration...</p>
        </div>
      </div>
    )
  }

  // No config available
  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center text-gray-500">
          <svg
            className="h-16 w-16 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>No form configuration available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <DynamicForm
        config={config}
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitting={submitting}
      />

      {/* Debug info - remove in production */}
      {import.meta.env.DEV && (
        <details className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <summary className="cursor-pointer font-medium text-gray-700">
            Debug: Form Data
          </summary>
          <pre className="mt-2 text-xs text-gray-600 overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </details>
      )}
    </div>
  )
}
