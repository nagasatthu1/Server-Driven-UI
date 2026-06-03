import React from 'react';
import { FieldConfig } from '../../types/api';

interface DynamicFieldRendererProps {
  field: FieldConfig;
  value: any;
  error?: string;
  onChange: (name: string, value: any) => void;
}

export const DynamicFieldRenderer: React.FC<DynamicFieldRendererProps> = ({
  field,
  value,
  error,
  onChange,
}) => {
  const baseInputClasses = `
    w-full px-3 py-2 border rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300'}
    ${field.style?.inputClassName || ''}
  `;

  const renderLabel = () => (
    <label 
      className={`block text-sm font-medium text-gray-700 mb-1.5 ${field.style?.labelClassName || ''}`}
    >
      {field.label || field.name}
      {field.required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const renderHelpText = () => (
    field.helpText && (
      <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>
    )
  );

  const renderError = () => (
    error && (
      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )
  );

  const renderPrefixSuffix = (element: React.ReactNode) => {
    if (!field.prefix && !field.suffix) return element;
    
    return (
      <div className="relative">
        {field.prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {field.prefix}
          </span>
        )}
        {element}
        {field.suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {field.suffix}
          </span>
        )}
      </div>
    );
  };

  const getInputClasses = (hasIcon = false) => {
    const iconOffset = hasIcon ? 'pl-10' : '';
    const prefixOffset = field.prefix ? 'pl-8' : '';
    const suffixOffset = field.suffix ? 'pr-8' : '';
    return `${baseInputClasses} ${iconOffset} ${prefixOffset} ${suffixOffset}`;
  };

  const renderTextField = () => {
    const inputType = ['text', 'password', 'email', 'number', 'tel', 'date', 'time', 'datetime-local', 'color'].includes(field.type) 
      ? field.type 
      : 'text';

    return renderPrefixSuffix(
      <input
        type={inputType}
        name={field.name}
        placeholder={field.placeholder}
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        disabled={field.disabled}
        readOnly={field.readonly}
        required={field.required}
        minLength={field.validation?.minLength}
        maxLength={field.validation?.maxLength}
        min={field.validation?.min}
        max={field.validation?.max}
        pattern={field.validation?.pattern}
        className={getInputClasses(!!field.icon)}
      />
    );
  };

  const renderTextarea = () => (
    <textarea
      name={field.name}
      placeholder={field.placeholder}
      value={value || ''}
      onChange={(e) => onChange(field.name, e.target.value)}
      disabled={field.disabled}
      readOnly={field.readonly}
      required={field.required}
      rows={4}
      className={baseInputClasses}
    />
  );

  const renderSelect = () => (
    <select
      name={field.name}
      value={value || ''}
      onChange={(e) => onChange(field.name, e.target.value)}
      disabled={field.disabled}
      required={field.required}
      className={baseInputClasses}
    >
      <option value="">Select...</option>
      {field.options?.map((option) => (
        <option 
          key={option.value} 
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );

  const renderMultiSelect = () => (
    <div className="space-y-2">
      {field.options?.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={(value || []).includes(option.value)}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [...(value || []), option.value]
                : (value || []).filter((v: any) => v !== option.value);
              onChange(field.name, newValue);
            }}
            disabled={field.disabled || option.disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );

  const renderCheckbox = () => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(field.name, e.target.checked)}
        disabled={field.disabled}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{field.label}</span>
    </label>
  );

  const renderRadio = () => (
    <div className="space-y-2">
      {field.options?.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={field.name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(field.name, e.target.value)}
            disabled={field.disabled || option.disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );

  const renderSwitch = () => (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(field.name, e.target.checked)}
          disabled={field.disabled}
          className="sr-only"
        />
        <div className={`
          w-11 h-6 rounded-full transition-colors duration-200
          ${value ? 'bg-blue-600' : 'bg-gray-300'}
          ${field.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}>
          <div className={`
            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200
            ${value ? 'translate-x-5' : 'translate-x-0'}
          `} />
        </div>
      </div>
      {field.label && <span className="ml-3 text-sm text-gray-700">{field.label}</span>}
    </label>
  );

  const renderFile = () => (
    <input
      type="file"
      name={field.name}
      onChange={(e) => onChange(field.name, e.target.files?.[0])}
      disabled={field.disabled}
      className={baseInputClasses}
    />
  );

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return renderTextarea();
      case 'select':
        return renderSelect();
      case 'multiselect':
        return renderMultiSelect();
      case 'checkbox':
        return renderCheckbox();
      case 'radio':
        return renderRadio();
      case 'switch':
        return renderSwitch();
      case 'file':
        return renderFile();
      default:
        return renderTextField();
    }
  };

  // Checkbox, radio, switch don't need label wrapper
  const noLabelWrapper = ['checkbox', 'radio', 'switch'];
  
  if (noLabelWrapper.includes(field.type)) {
    return (
      <div className={field.style?.wrapperClassName}>
        {renderField()}
        {renderHelpText()}
        {renderError()}
      </div>
    );
  }

  return (
    <div className={field.style?.wrapperClassName}>
      {renderLabel()}
      {renderField()}
      {renderHelpText()}
      {renderError()}
    </div>
  );
};
