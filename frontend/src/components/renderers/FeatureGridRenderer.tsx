// Feature Grid Renderer Component
import React from 'react';

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

interface FeatureGridProps {
  title: string;
  items: FeatureItem[];
}

const FeatureGridRenderer: React.FC<FeatureGridProps> = ({ title, items }) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
          >
            <div className="text-5xl mb-4 text-center">{item.icon}</div>
            <h4 className="font-bold text-lg mb-2 text-gray-800 text-center">{item.title}</h4>
            <p className="text-gray-600 text-center">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGridRenderer;
