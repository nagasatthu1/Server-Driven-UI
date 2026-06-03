// backend/configs/componentRegistry.js
// Registry mapping các component types với metadata

const ComponentRegistry = {
  // Layout components
  'row': {
    type: 'layout',
    tagName: 'div',
    className: 'flex flex-row gap-4',
    allowedChildren: ['stat-card', 'chart', 'table', 'data-table', 'search-box', 'button']
  },
  
  'grid': {
    type: 'layout',
    tagName: 'div',
    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
  },

  // Data display components
  'stat-card': {
    type: 'display',
    tagName: 'div',
    className: 'bg-white rounded-lg shadow p-6',
    propsSchema: {
      title: { type: 'string', required: true },
      value: { type: 'string', required: true },
      icon: { type: 'string', required: false },
      color: { type: 'string', enum: ['blue', 'green', 'orange', 'red', 'purple'] }
    },
    dataBinding: ['value']
  },

  'chart': {
    type: 'visualization',
    tagName: 'div',
    className: 'bg-white rounded-lg shadow p-6',
    propsSchema: {
      title: { type: 'string', required: true },
      chartType: { type: 'string', enum: ['line', 'bar', 'pie', 'area'] },
      height: { type: 'number', default: 300 }
    },
    dataBinding: ['datasets', 'labels']
  },

  'data-table': {
    type: 'display',
    tagName: 'div',
    className: 'bg-white rounded-lg shadow overflow-hidden',
    propsSchema: {
      columns: { type: 'array', required: true },
      pagination: { type: 'object', required: false },
      actions: { type: 'array', required: false }
    },
    dataBinding: ['rows']
  },

  // Input/Interactive components
  'search-box': {
    type: 'input',
    tagName: 'input',
    className: 'border rounded-lg px-4 py-2 w-full',
    propsSchema: {
      placeholder: { type: 'string', required: false },
      debounce: { type: 'number', default: 300 }
    },
    events: ['change', 'submit']
  },

  'button': {
    type: 'action',
    tagName: 'button',
    className: 'px-4 py-2 rounded-lg font-medium',
    propsSchema: {
      label: { type: 'string', required: true },
      variant: { type: 'string', enum: ['primary', 'secondary', 'danger', 'ghost'] },
      icon: { type: 'string', required: false }
    },
    events: ['click']
  },

  'toolbar': {
    type: 'layout',
    tagName: 'div',
    className: 'flex items-center justify-between mb-4',
    allowedChildren: ['search-box', 'button', 'dropdown', 'filter']
  }
};

/**
 * Validate component config dựa trên schema
 */
function validateComponent(component) {
  const registry = ComponentRegistry[component.type];
  
  if (!registry) {
    return {
      valid: false,
      error: `Component type "${component.type}" not registered`
    };
  }

  if (!component.props) {
    return {
      valid: false,
      error: `Component "${component.type}" missing props`
    };
  }

  // Validate required props
  if (registry.propsSchema) {
    for (const [propName, schema] of Object.entries(registry.propsSchema)) {
      if (schema.required && !(propName in component.props)) {
        return {
          valid: false,
          error: `Component "${component.type}" missing required prop "${propName}"`
        };
      }

      // Validate enum values
      if (schema.enum && component.props[propName]) {
        if (!schema.enum.includes(component.props[propName])) {
          return {
            valid: false,
            error: `Invalid value for prop "${propName}". Must be one of: ${schema.enum.join(', ')}`
          };
        }
      }
    }
  }

  return { valid: true };
}

module.exports = {
  ComponentRegistry,
  validateComponent
};
