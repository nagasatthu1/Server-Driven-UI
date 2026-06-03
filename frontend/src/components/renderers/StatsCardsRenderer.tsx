// Stats Cards Renderer Component
import React from 'react';

interface StatCard {
  label: string;
  value: string;
  trend: string;
}

interface StatsCardsProps {
  cards: StatCard[];
}

const StatsCardsRenderer: React.FC<StatsCardsProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg"
        >
          <div className="text-sm opacity-90 mb-2">{card.label}</div>
          <div className="text-4xl font-bold mb-2">{card.value}</div>
          <div className="text-sm opacity-90">{card.trend}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCardsRenderer;
