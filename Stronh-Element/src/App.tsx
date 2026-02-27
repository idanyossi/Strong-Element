import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/homepage/Home';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        
        {/* Navigation */}
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">STRONG<span>ELEMENT</span></Link>
          </div>
          <div className="nav-links">
            <Link to="/" className="active">Home</Link>
            <Link to="/listings">Listings</Link>
            <Link to="/about">About</Link>
            <Link to="/agents">Agents</Link>
            <Link to="/articles">Articles</Link>
          </div>
          <div className="nav-signout">
            <span>Sign Out</span>
          </div>
        </nav>

        {/* Routes */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Future routes will go here */}
          </Routes>
        </main>

        {/* Footer */}
        <footer className="modern-footer">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">STRONG<span>ELEMENT</span></div>
              <p>Premium real estate services built on expertise, integrity, and results.</p>
            </div>
            <div>
              <h4>NAVIGATION</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/listings">Listings</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/agents">Agents</Link></li>
                <li><Link to="/articles">Articles</Link></li>
              </ul>
            </div>
            <div>
              <h4>SERVICES</h4>
              <ul>
                <li><Link to="/">Residential Sales</Link></li>
                <li><Link to="/">Commercial Properties</Link></li>
                <li><Link to="/">Property Management</Link></li>
                <li><Link to="/">Investment Advisory</Link></li>
                <li><Link to="/">Market Analysis</Link></li>
              </ul>
            </div>
            <div>
              <h4>CONTACT</h4>
              <ul>
                <li style={{ color: 'white' }}>📍 123 Business Avenue<br/>New York, NY 10001</li>
                <li style={{ color: 'white', marginTop: '15px' }}>📞 +1 (555) 123-4567</li>
                <li style={{ color: 'white', marginTop: '15px' }}>✉️ info@strongelement.com</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 Strong Element. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Terms of Service</Link>
            </div>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;