import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/HomePage.css';
import Footer from '../components/footer/Footer'; // Import Footer component
// Import images for the slider
import img1 from '../assets/images/HomePage_Images/Image1.png';
import img2 from '../assets/images/HomePage_Images/Image2.png';
import img3 from '../assets/images/HomePage_Images/Image3.jpg';
// Add more imports as needed

const QUOTES = [
  'Your dreams deserve more than promises — they deserve support.',
  'Easy access to government schemes, right at your fingertips.',
  'No more waiting in lines. Your future starts online.',
  'Unlock opportunities with every click.',
  'Empowering every farmer, one solution at a time.',
  'Where technology meets tradition, farming thrives.',
  'Grow more. Worry less. Farm easy.',
  'A better harvest starts with better access.',
  'From soil to success — we’re with you every step of the way.'
];

const images = [img1, img2, img3]; // Add more images as needed

const HomePage = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % QUOTES.length);
    }, 3500); // 3.5 seconds per quote
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % images.length);
    }, 3500); // 3.5 seconds per image
    return () => clearInterval(imgInterval);
  }, []);

  return (
    <div
      className="homepage-root"
      style={{
        backgroundColor: '#fff', // Ensure white background
        backgroundImage: 'none'   // Remove farmBg image
      }}
    >
      {/* Centered heading above overlays and content */}
      <div className="homepage-heading-absolute">
        <h1 className="homepage-title">
          Welcome to <span className="homepage-title-highlight">FarmEasy</span> Portal
        </h1>
      </div>

      {/* Transparent overlays */}
      <div className="homepage-gradient-overlay" style={{ background: 'transparent' }} />
      <div className="homepage-pattern-overlay" style={{ background: 'transparent' }} />

      {/* Content directly on background */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <div className="homepage-flex-row">
          <div style={{ flex: 1 }}>
            <div className="homepage-quote-animated" key={quoteIdx}>
              {QUOTES[quoteIdx]}
            </div>
            {/* Info section just below quotes, justified and aligned */}
            <section className="homepage-info-section">
              No middlemen. No confusion. Just transparent, farmer-first access to everything you need — from loans and subsidies to equipment rentals — all in one seamless, easy-to-use portal designed with you in mind.
            </section>
          </div>
          <div className="homepage-image-slider-absolute">
            <img
              src={images[imgIdx]}
              alt={`slide-${imgIdx + 1}`}
              className="homepage-slider-img"
            />
          </div>
        </div>

        {/* Feature Cards Section */}
        <section className="homepage-feature-cards">
          <div className="homepage-feature-grid">
            <div className="homepage-feature-card">
              <div className="homepage-feature-icon">
                <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                  <rect width="40" height="40" rx="12" fill="#22c55e" />
                  <path d="M20 27c-4.5-2.5-7-6.5-7-10.5 0-2.5 2-4.5 4.5-4.5 1.5 0 2.8 0.8 3.5 2 0.7-1.2 2-2 3.5-2 2.5 0 4.5 2 4.5 4.5 0 4-2.5 8-7 10.5z" fill="#fff" />
                </svg>
              </div>
              <h3 className="homepage-feature-title">Crop Management</h3>
              <p className="homepage-feature-desc">
                Track planting, growth stages, harvesting, and yield optimization with intelligent insights and recommendations.
              </p>
            </div>
            <div className="homepage-feature-card">
              <div className="homepage-feature-icon">
                <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                  <rect width="40" height="40" rx="12" fill="#22c55e" />
                  <path d="M13 25v-6c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  <rect x="16" y="19" width="8" height="4" rx="2" fill="#fff" />
                </svg>
              </div>
              <h3 className="homepage-feature-title">Livestock Tracking</h3>
              <p className="homepage-feature-desc">
                Monitor animal health, breeding cycles, feed management, and productivity with comprehensive analytics.
              </p>
            </div>
            <div className="homepage-feature-card">
              <div className="homepage-feature-icon">
                <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                  <rect width="40" height="40" rx="12" fill="#22c55e" />
                  <path d="M12 28V12h16v16H12zm4-4h8m-8-4h8m-8-4h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="homepage-feature-title">Financial Analytics</h3>
              <p className="homepage-feature-desc">
                Real-time financial tracking, profit analysis, expense management, and ROI calculations.
              </p>
            </div>
            <div className="homepage-feature-card">
              <div className="homepage-feature-icon">
                <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                  <rect width="40" height="40" rx="12" fill="#22c55e" />
                  <path d="M13 27V13h14v14H13zm3-3h8m-8-4h8m-8-4h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  <rect x="16" y="19" width="8" height="4" rx="2" fill="#fff" />
                </svg>
              </div>
              <h3 className="homepage-feature-title">Inventory Control</h3>
              <p className="homepage-feature-desc">
                Smart inventory management with automated reorder points, supplier tracking, and cost optimization.
              </p>
            </div>
            <div className="homepage-feature-card">
              <div className="homepage-feature-icon">
                <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                  <rect width="40" height="40" rx="12" fill="#22c55e" />
                  <path d="M14 20h12M14 24h8M14 16h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="homepage-feature-title">Task Management</h3>
              <p className="homepage-feature-desc">
                Organize, assign, and track farm tasks with intelligent scheduling and progress monitoring.
              </p>
            </div>
            <div className="homepage-feature-card">
              <div className="homepage-feature-icon">
                <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                  <rect width="40" height="40" rx="12" fill="#22c55e" />
                  <path d="M20 18a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z" fill="#fff" />
                </svg>
              </div>
              <h3 className="homepage-feature-title">Team Collaboration</h3>
              <p className="homepage-feature-desc">
                Coordinate with your team, manage worker schedules, and streamline communication across operations.
              </p>
            </div>
          </div>
        </section>
        <section className="homepage-stats-banner">
          <div className="homepage-stats-container">
            <div className="homepage-stat-item">
              <h2 className="homepage-stat-number">98%</h2>
              <p className="homepage-stat-label">Efficiency Increase</p>
            </div>
            <div className="homepage-stat-item">
              <h2 className="homepage-stat-number">24/7</h2>
              <p className="homepage-stat-label">System Reliability</p>
            </div>
            <div className="homepage-stat-item">
              <h2 className="homepage-stat-number">500+</h2>
              <p className="homepage-stat-label">Happy Farmers</p>
            </div>
            <div className="homepage-stat-item">
              <h2 className="homepage-stat-number">35%</h2>
              <p className="homepage-stat-label">Profit Growth</p>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="homepage-cta">
          <h2 className="cta-title">Ready to Transform Your Farm?</h2>
          <p className="cta-subtitle">
            Join thousands of successful farmers who have revolutionized their operations with FarmEasy. Start your journey today!
          </p>
          <button className="cta-button">
            🌿 Start Your Free Trial
          </button>
        </section>

        {/* Footer Section */}
      <Footer/>
      </div>
    </div>
  );
};

export default HomePage;
