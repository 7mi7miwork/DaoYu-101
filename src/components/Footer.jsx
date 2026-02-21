import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t mt-auto" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              🏝️ Dao-Yu-101
            </h3>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Your gateway to learning adventures. Explore archipelagos of knowledge and master new skills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline" style={{ color: 'var(--color-text-muted)' }}>
                  Home
                </a>
              </li>
              <li>
                <a href="/courses" className="hover:underline" style={{ color: 'var(--color-text-muted)' }}>
                  Courses
                </a>
              </li>
              <li>
                <a href="/login" className="hover:underline" style={{ color: 'var(--color-text-muted)' }}>
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline" style={{ color: 'var(--color-text-muted)' }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline" style={{ color: 'var(--color-text-muted)' }}>
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline" style={{ color: 'var(--color-text-muted)' }}>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            © 2024 Dao-Yu-101. Built with React and ❤️.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
