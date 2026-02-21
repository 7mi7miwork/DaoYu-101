import React from 'react';

const Courses = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          📚 Courses
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
          Browse our collection of learning archipelagos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>💻 Programming</h3>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>Learn programming languages and concepts</p>
            <button className="px-4 py-2 rounded" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              Explore
            </button>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>🌐 Languages</h3>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>Master new languages and cultures</p>
            <button className="px-4 py-2 rounded" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
