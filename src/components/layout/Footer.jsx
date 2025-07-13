import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">🎯 BundleCraft</div>
            <p className="footer-tagline">Turn Printify Products Into Profitable Bundles</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><Link to="/#features">Features</Link></li>
                <li><Link to="/#how-it-works">How It Works</Link></li>
                <li><Link to="/#pricing">Pricing</Link></li>
                <li><Link to="/#demo">Demo</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/support">Support</Link></li>
                <li><Link to="/api">API Status</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/legal">Legal</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} BundleCraft. All rights reserved.
          </div>
          
          <div className="footer-social">
            <a href="https://twitter.com/bundlecraft" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://facebook.com/bundlecraft" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://instagram.com/bundlecraft" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
        
        <div className="system-status">
          <span className="status-indicator"></span> 
          <span className="status-text">
            System Status: All systems operational • API: Running at https://api.bundlecraft.app
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
