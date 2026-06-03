import { useState, useEffect, useCallback } from 'react'
import {
  FormConfig,
  FieldConfig,
  FormSubmissionResult,
  ApiResponse,
} from '../types/api'

interface UseDynamicFormProps {
  formConfig?: FormConfig
  apiEndpoint?: string
  initialData?: Record<string, any>
  onSubmit?: (data: Record<string, any>) => Promise<FormSubmissionResult>
}

export function useDynamicForm({
  formConfig,
  apiEndpoint,
  initialData = {},
  onSubmit,
}: UseDynamicFormProps) {
  const [config, setConfig] = useState<FormConfig | null>(formConfig || null)
  const [formData, setFormData] = useState<Record<string, any>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [fieldVisibility, setFieldVisibility] = useState<
    Record<string, boolean>
  >({})

  // Fetch form config from API
  const fetchFormConfig = useCallback(async () => {
    if (!apiEndpoint) return

    setLoading(true)
    try {
      const response = await fetch(apiEndpoint)
      const result: ApiResponse<FormConfig> = await response.json()

      if (result.success && result.data) {
        setConfig(result.data)
        // Initialize default values
        const defaultValues: Record<string, any> = {}
        result.data.sections.forEach((section) => {
          section.fields.forEach((field) => {
            if (field.defaultValue !== undefined) {
              defaultValues[field.name] = field.defaultValue
            }
          })
        })
        setFormData((prev) => ({ ...defaultValues, ...prev }))
      } else {
        console.error('Failed to fetch form config:', result.message)
      }
    } catch (error) {
      console.error('Error fetching form config:', error)
    } finally {
      setLoading(false)
    }
  }, [apiEndpoint])

  // Fetch initial data if provided
  const fetchInitialData = useCallback(async (dataEndpoint: string) => {
    try {
      const response = await fetch(dataEndpoint)
      const result: ApiResponse<Record<string, any>> = await response.json()

      if (result.success && result.data) {
        setFormData(result.data)
      }
    } catch (error) {
      console.error('Error fetching initial data:', error)
    }
  }, [])

  // Evaluate conditional visibility
  const evaluateCondition = useCallback(
    (field: FieldConfig): boolean => {
      if (!field.conditional) return true

      const { field: conditionField, operator, value } = field.conditional
      const fieldValue = formData[conditionField]

      switch (operator) {
        case 'equals':
          return fieldValue === value
        case 'notEquals':
          return fieldValue !== value
        case 'contains':
          return Array.isArray(fieldValue)
            ? fieldValue.includes(value)
            : fieldValue?.includes(value)
        case 'greaterThan':
          return Number(fieldValue) > Number(value)
        case 'lessThan':
          return Number(fieldValue) < Number(value)
        default:
          return true
      }
    },
    [formData]
  )

  // Update field visibility when formData changes
  useEffect(() => {
    if (!config) return

    const visibility: Record<string, boolean> = {}
    config.sections.forEach((section) => {
      section.fields.forEach((field) => {
        visibility[field.name] = evaluateCondition(field)
      })
    })
    setFieldVisibility(visibility)
  }, [config, formData, evaluateCondition])

  // Handle field change
  const handleChange = useCallback(
    (name: string, value: any) => {
      setFormData((prev) => ({ ...prev, [name]: value }))
      // Clear error when user types
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [errors]
  )

  // Validate field
  const validateField = useCallback(
    (field: FieldConfig, value: any): string | null => {
      if (
        field.required &&
        (value === undefined || value === null || value === '')
      ) {
        return field.errorMessage || `${field.label || field.name} is required`
      }

      if (value && field.validation) {
        const { pattern, minLength, maxLength, min, max, custom } =
          field.validation

        if (pattern && !new RegExp(pattern).test(value)) {
          return `Invalid format for ${field.label || field.name}`
        }

        if (
          typeof value === 'string' &&
          minLength &&
          value.length < minLength
        ) {
          return `${field.label || field.name} must be at least ${minLength} characters`
        }

        if (
          typeof value === 'string' &&
          maxLength &&
          value.length > maxLength
        ) {
          return `${field.label || field.name} must be less than ${maxLength} characters`
        }

        if (typeof value === 'number' && min !== undefined && value < min) {
          return `${field.label || field.name} must be at least ${min}`
        }

        if (typeof value === 'number' && max !== undefined && value > max) {
          return `${field.label || field.name} must be less than ${max}`
        }

        if (custom) {
          const customResult = custom(value)
          if (customResult === false || typeof customResult === 'string') {
            return customResult || `Invalid ${field.label || field.name}`
          }
        }
      }

      return null
    },
    []
  )

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    if (!config) return false

    const newErrors: Record<string, string> = {}

    config.sections.forEach((section) => {
      section.fields.forEach((field) => {
        // Skip validation for hidden fields
        if (!fieldVisibility[field.name]) return

        const error = validateField(field, formData[field.name])
        if (error) {
          newErrors[field.name] = error
        }
      })
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [config, formData, fieldVisibility, validateField])

  // Handle form submission
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()

      if (!validateForm()) {
        return { success: false, errors }
      }

      if (!onSubmit) {
        console.log('Form data:', formData)
        return {
          success: true,
          message: 'Form submitted successfully',
          data: formData,
        }
      }

      setSubmitting(true)
      try {
        const result = await onSubmit(formData)

        if (result.success) {
          setErrors({})
        } else if (result.errors) {
          setErrors(result.errors)
        }

        return result
      } catch (error) {
        console.error('Submission error:', error)
        return {
          success: false,
          message: 'An error occurred during submission',
          errors: { _global: 'Submission failed' },
        }
      } finally {
        setSubmitting(false)
      }
    },
    [formData, errors, validateForm, onSubmit]
  )

  // Reset form
  const resetForm = useCallback(() => {
    if (!config) return

    const defaultValues: Record<string, any> = {}
    config.sections.forEach((section) => {
      section.fields.forEach((field) => {
        defaultValues[field.name] = field.defaultValue || ''
      })
    })

    setFormData(defaultValues)
    setErrors({})
  }, [config])

  // Get visible fields for a section
  const getVisibleFields = useCallback(
    (fields: FieldConfig[]): FieldConfig[] => {
      return fields.filter((field) => fieldVisibility[field.name] !== false)
    },
    [fieldVisibility]
  )

  useEffect(() => {
    if (apiEndpoint && !formConfig) {
      fetchFormConfig()
    }
  }, [apiEndpoint, formConfig, fetchFormConfig])

  return {
    config,
    formData,
    errors,
    loading,
    submitting,
    handleChange,
    handleSubmit,
    resetForm,
    validateForm,
    validateField,
    getVisibleFields,
    setFormData,
    setErrors,
  }
}
