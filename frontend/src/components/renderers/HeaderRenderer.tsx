// Header Renderer Component
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  theme?: 'primary' | 'secondary';
}

const HeaderRenderer: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  theme = 'primary' 
}) => {
  const themeClasses = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white',
    secondary: 'bg-gradient-to-r from-pink-400 to-red-500 text-white',
  };

  return (
    <div className={`text-center mb-8 p-8 rounded-xl ${themeClasses[theme]}`}>
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      {subtitle && <p className="text-lg opacity-90">{subtitle}</p>}
    </div>
  );
};

export default HeaderRenderer;
