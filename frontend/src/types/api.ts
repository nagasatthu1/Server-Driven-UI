// Types cho dynamic form rendering từ API

export interface FieldConfig {
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'time' | 'datetime-local' | 
        'textarea' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'switch' | 'file' | 'color';
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  helpText?: string;
  errorMessage?: string;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    custom?: (value: any) => boolean | string;
  };
  options?: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
    icon?: string;
  }>;
  grid?: {
    colspan?: 1 | 2 | 3 | 4 | 6 | 12;
    rowspan?: 1 | 2 | 3;
  };
  style?: {
    className?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
  };
  conditional?: {
    field: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
    value: any;
  };
  prefix?: string;
  suffix?: string;
  icon?: string;
}

export interface SectionConfig {
  title: string;
  description?: string;
  icon?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  fields: FieldConfig[];
  style?: {
    className?: string;
    headerClassName?: string;
  };
}

export interface FormConfig {
  id: string;
  title: string;
  description?: string;
  sections: SectionConfig[];
  submitButton?: {
    text: string;
    icon?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    loadingText?: string;
  };
  cancelButton?: {
    text: string;
    show?: boolean;
    onClick?: () => void;
  };
  layout?: 'vertical' | 'horizontal' | 'grid';
  columns?: 1 | 2 | 3 | 4;
  style?: {
    className?: string;
    headerClassName?: string;
    sectionClassName?: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface FormSubmissionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: any;
}
