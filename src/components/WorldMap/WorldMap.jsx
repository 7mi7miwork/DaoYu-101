import React from 'react';
import archipelagosData from '../../data/archipelagos';
import ArchipelagoCard from './ArchipelagoCard';

const WorldMap = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-5xl font-bold mb-4"
            style={{ 
              color: 'var(--color-text)',
              fontFamily: 'var(--font-display)'
            }}
          >
            🏝️ Choose Your Archipelago
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Select an archipelago to start your learning journey. Each island represents a new skill to master!
          </p>
        </div>

        {/* Archipelagos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {archipelagosData.map(archipelago => (
            <ArchipelagoCard 
              key={archipelago.id} 
              archipelago={archipelago} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
