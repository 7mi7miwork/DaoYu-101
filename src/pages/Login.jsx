import React, { useState } from 'react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md p-8 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          {activeTab === 'login' ? 'Sign In' : 'Sign Up'}
        </h1>
        
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 px-4 ${activeTab === 'login' ? 'border-b-2' : ''}`}
            style={{ 
              borderColor: activeTab === 'login' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'login' ? 'var(--color-primary)' : 'var(--color-text-muted)'
            }}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 px-4 ${activeTab === 'register' ? 'border-b-2' : ''}`}
            style={{ 
              borderColor: activeTab === 'register' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'register' ? 'var(--color-primary)' : 'var(--color-text-muted)'
            }}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {activeTab === 'login' ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md font-medium"
              style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
            >
              Sign In
            </button>
          </form>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                Role
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="school">School</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md font-medium"
              style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
