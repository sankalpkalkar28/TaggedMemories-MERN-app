import React from 'react';
import './Footer.css';

function Footer({ memoryCount }) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // You can add actual navigation logic here later
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>TaggedMemories</h3>
          <p>Preserve your precious moments,<br />one tag at a time.</p>
          <div className="social-links">
            <button className="social-link" onClick={() => window.open('https://facebook.com', '_blank')}>📘</button>
            <button className="social-link" onClick={() => window.open('https://instagram.com', '_blank')}>📷</button>
            <button className="social-link" onClick={() => window.open('https://twitter.com', '_blank')}>🐦</button>
            <button className="social-link" onClick={() => window.location.href = 'mailto:info@taggedmemories.com'}>📧</button>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><button className="footer-link-btn" onClick={() => scrollToSection('home')}>Home</button></li>
            <li><button className="footer-link-btn" onClick={() => scrollToSection('about')}>About Us</button></li>
            <li><button className="footer-link-btn" onClick={() => scrollToSection('privacy')}>Privacy Policy</button></li>
            <li><button className="footer-link-btn" onClick={() => scrollToSection('terms')}>Terms of Service</button></li>
            <li><button className="footer-link-btn" onClick={() => scrollToSection('contact')}>Contact Us</button></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li>✨ Create Memories</li>
            <li>🏷️ Tag Your Moments</li>
            <li>📸 Upload Photos</li>
            <li>✏️ Edit & Update</li>
            <li>🗑️ Delete Memories</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Get updates about new features</p>
          <form className="newsletter-form" onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.querySelector('input').value;
            if (email) {
              alert(`Thanks for subscribing! Updates will be sent to ${email}`);
              e.target.reset();
            } else {
              alert('Please enter a valid email address');
            }
          }}>
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
          <div className="stats">
            <span>📊 Total Memories: </span>
            <strong>
              {typeof memoryCount === 'number' ? memoryCount : 0}
            </strong>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} TaggedMemories. All rights reserved.</p>
          <p>Made with ❤️ for preserving precious moments</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="back-to-top"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;