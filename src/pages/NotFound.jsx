import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
          Page Not Found
        </h2>
        <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-md font-medium"
          style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
