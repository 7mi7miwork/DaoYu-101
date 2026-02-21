import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          🏝️ Welcome to Dao-Yu-101
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
          Your learning adventure starts here. Explore archipelagos of knowledge!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Programming</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Learn to code from scratch</p>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Languages</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Speak the world</p>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Finance</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Master money skills</p>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>School Subjects</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Core curriculum</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
