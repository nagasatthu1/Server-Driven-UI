import React, { useState } from 'react';
import { FormConfig, SectionConfig } from '../../types/api';
import { DynamicFieldRenderer } from './DynamicFieldRenderer';

interface DynamicFormProps {
  config: FormConfig;
  formData: Record<string, any>;
  errors: Record<string, string>;
  onChange: (name: string, value: any) => void;
  onSubmit: (e?: React.FormEvent) => Promise<any>;
  submitting?: boolean;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  formData,
  errors,
  onChange,
  onSubmit,
  submitting = false,
}) => {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionIndex: number) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex],
    }));
  };

  const getGridCols = (colspan?: number) => {
    if (!colspan) return '';
    const map: Record<number, string> = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      6: 'col-span-6',
      12: 'col-span-12',
    };
    return map[colspan] || 'col-span-1';
  };

  const renderSection = (section: SectionConfig, sectionIndex: number) => {
    const isCollapsed = collapsedSections[sectionIndex] ?? section.defaultCollapsed ?? false;

    return (
      <div
        key={sectionIndex}
        className={`
          bg-white rounded-xl border border-gray-200 overflow-hidden mb-6
          ${section.style?.className || ''}
        `}
      >
        {/* Section Header */}
        {section.collapsible ? (
          <button
            onClick={() => toggleSection(sectionIndex)}
            className={`
              w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors
              ${section.style?.headerClassName || ''}
            `}
          >
            <div className="flex items-center gap-3">
              {section.icon && <span className="text-xl">{section.icon}</span>}
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                {section.description && (
                  <p className="text-sm text-gray-500 mt-0.5">{section.description}</p>
                )}
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform ${isCollapsed ? '-rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        ) : (
          <div className={`px-6 py-4 bg-gray-50 border-b border-gray-200 ${section.style?.headerClassName || ''}`}>
            <div className="flex items-center gap-3">
              {section.icon && <span className="text-xl">{section.icon}</span>}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                {section.description && (
                  <p className="text-sm text-gray-500 mt-0.5">{section.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section Content */}
        {!isCollapsed && (
          <div className="p-6">
            <div className={`grid gap-6 ${config.columns ? `grid-cols-${config.columns}` : 'grid-cols-1'} ${config.layout === 'horizontal' ? 'md:grid-cols-2' : ''}`}>
              {section.fields.map((field, fieldIndex) => {
                // Skip hidden fields based on conditional logic
                if (field.conditional) {
                  const conditionField = formData[field.conditional.field];
                  const { operator, value } = field.conditional;
                  
                  let isVisible = true;
                  switch (operator) {
                    case 'equals':
                      isVisible = conditionField === value;
                      break;
                    case 'notEquals':
                      isVisible = conditionField !== value;
                      break;
                    case 'contains':
                      isVisible = Array.isArray(conditionField) 
                        ? conditionField.includes(value) 
                        : conditionField?.includes(value);
                      break;
                    case 'greaterThan':
                      isVisible = Number(conditionField) > Number(value);
                      break;
                    case 'lessThan':
                      isVisible = Number(conditionField) < Number(value);
                      break;
                  }
                  
                  if (!isVisible) return null;
                }

                return (
                  <div key={fieldIndex} className={getGridCols(field.grid?.colspan)}>
                    <DynamicFieldRenderer
                      field={field}
                      value={formData[field.name]}
                      error={errors[field.name]}
                      onChange={onChange}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getButtonVariant = (variant?: string) => {
    const variants: Record<string, string> = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      success: 'bg-green-600 hover:bg-green-700 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
    };
    return variants[variant || 'primary'] || variants.primary;
  };

  return (
    <form onSubmit={onSubmit} className={`max-w-6xl mx-auto ${config.style?.className || ''}`}>
      {/* Form Header */}
      {(config.title || config.description) && (
        <div className={`mb-8 pb-6 border-b border-gray-200 ${config.style?.headerClassName || ''}`}>
          {config.title && (
            <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
          )}
          {config.description && (
            <p className="mt-2 text-gray-600">{config.description}</p>
          )}
        </div>
      )}

      {/* Sections */}
      <div className={config.style?.sectionClassName}>
        {config.sections.map((section, index) => renderSection(section, index))}
      </div>

      {/* Form Actions */}
      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
        {config.submitButton && (
          <button
            type="submit"
            disabled={submitting}
            className={`
              px-6 py-2.5 rounded-lg font-medium transition-all duration-200
              flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
              ${getButtonVariant(config.submitButton.variant)}
            `}
          >
            {submitting && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {submitting && config.submitButton.loadingText 
              ? config.submitButton.loadingText 
              : config.submitButton.text}
            {config.submitButton.icon && !submitting && (
              <span>{config.submitButton.icon}</span>
            )}
          </button>
        )}
        
        {config.cancelButton?.show && (
          <button
            type="button"
            onClick={config.cancelButton.onClick}
            className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {config.cancelButton.text}
          </button>
        )}
      </div>
    </form>
  );
};
