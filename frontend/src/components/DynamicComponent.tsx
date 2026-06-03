// Components: Dynamic Component Renderer
// Đây là trái tim của hệ thống - render component dựa trên config từ backend

import React from 'react';
import { ComponentConfig } from '../types/dynamic';

// Import các component renderers
import HeaderRenderer from './renderers/HeaderRenderer';
import HeroRenderer from './renderers/HeroRenderer';
import FeatureGridRenderer from './renderers/FeatureGridRenderer';
import StatsCardsRenderer from './renderers/StatsCardsRenderer';
import DataTableRenderer from './renderers/DataTableRenderer';

// Registry các component renderers
const componentRegistry: Record<string, React.ComponentType<any>> = {
  'header': HeaderRenderer,
  'hero': HeroRenderer,
  'feature-grid': FeatureGridRenderer,
  'stats-cards': StatsCardsRenderer,
  'data-table': DataTableRenderer,
};

interface DynamicComponentProps {
  component: ComponentConfig;
}

export const DynamicComponent: React.FC<DynamicComponentProps> = ({ component }) => {
  const { type, props, children } = component;
  
  // Tìm renderer cho component type
  const Renderer = componentRegistry[type];
  
  if (!Renderer) {
    console.warn(`No renderer found for component type: ${type}`);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-semibold">Unknown component type: {type}</p>
        <p className="text-red-500 text-sm">This component type is not registered in the renderer registry.</p>
      </div>
    );
  }
  
  // Render component với props từ backend
  return (
    <Renderer {...props}>
      {children?.map((child, index) => (
        <DynamicComponent key={index} component={child} />
      ))}
    </Renderer>
  );
};

export default DynamicComponent;
