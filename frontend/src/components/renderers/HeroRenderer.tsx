// Hero Renderer Component
import React from 'react';

interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
  buttonAction?: string;
}

const HeroRenderer: React.FC<HeroProps> = ({ 
  title, 
  description, 
  buttonText,
  buttonAction 
}) => {
  const handleClick = () => {
    if (buttonAction) {
      // Dispatch custom event for navigation
      window.dispatchEvent(new CustomEvent('navigate', { detail: { pageId: buttonAction } }));
    }
  };

  return (
    <div className="text-center py-12 px-6 bg-gray-50 rounded-xl mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6 text-lg max-w-2xl mx-auto">{description}</p>
      <button
        onClick={handleClick}
        className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default HeroRenderer;
