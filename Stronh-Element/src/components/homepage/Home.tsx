import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-wrapper">
      
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="section-label">PREMIUM REAL ESTATE</span>
          <h1 className="hero-title">
            Build Your <br/><span>Strongest</span><br/> Investment
          </h1>
          <p className="hero-desc">
            Strong Element delivers elite real estate services with data-driven precision. We find properties that perform — not just today, but for decades.
          </p>
          <div className="hero-buttons">
            <Link to="/listings" className="btn-primary">Explore Properties &rarr;</Link>
            <Link to="/about" className="btn-secondary">About Us</Link>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern Skyscrapers" 
            className="hero-image"
          />
          <div className="hero-glass-card">
            <div className="hero-glass-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>
            </div>
            <div>
              <h3 style={{fontSize: '1.5rem', fontWeight: '800'}}>500+</h3>
              <p style={{color: '#9CA3AF', fontSize: '0.9rem'}}>Properties Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div>
            <div className="stat-number">500+</div>
            <div className="stat-label">Properties Sold</div>
          </div>
          <div>
            <div className="stat-number">98%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div>
            <div className="stat-number">15+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div>
            <div className="stat-number">$2B+</div>
            <div className="stat-label">Transaction Volume</div>
          </div>
        </div>
      </section>

      {/* 3. About / Expertise Section */}
      <section className="about-section">
        <div>
          <span className="section-label">WHO WE ARE</span>
          <h2 className="section-title">A Foundation Built<br/>on Expertise</h2>
          <p className="about-desc">
            Strong Element is a premier real estate firm specializing in high-value residential and commercial properties. With over a decade of market expertise, we connect discerning clients with exceptional investment opportunities.
          </p>
        </div>
        <div className="about-cards">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <h4>Integrity First</h4>
              <p>Transparent dealings and honest counsel form the bedrock of every client relationship.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </div>
            <div>
              <h4>Data-Driven</h4>
              <p>We leverage market analytics and deep local insight to maximize your investment returns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Properties Section */}
      <section className="featured-section">
        <div className="featured-header">
          <div>
            <span className="section-label">FEATURED</span>
            <h2 className="section-title" style={{marginBottom: 0}}>Selected Properties</h2>
          </div>
          <Link to="/listings" className="view-all-link">View All Listings &rarr;</Link>
        </div>

        <div className="property-grid">
          {/* Card 1 */}
          <div className="property-card">
            <div className="property-image-container">
              <div className="property-badge">FOR SALE</div>
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" alt="Property" />
            </div>
            <div className="property-info">
              <div className="property-price">$2,850,000</div>
              <div className="property-name">Luxury Downtown Penthouse</div>
              <div className="property-location">Tribeca, New York</div>
              <div className="property-specs">
                <span className="spec-item">🛏️ 3</span>
                <span className="spec-item">🛁 3</span>
                <span className="spec-item">📐 2800 sqft</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="property-card">
            <div className="property-image-container">
              <div className="property-badge">FOR SALE</div>
              <img src="https://images.unsplash.com/photo-1600607687931-cecebd802404?q=80&w=2070&auto=format&fit=crop" alt="Property" />
            </div>
            <div className="property-info">
              <div className="property-price">$4,200,000</div>
              <div className="property-name">Modern Waterfront Villa</div>
              <div className="property-location">Star Island, Miami</div>
              <div className="property-specs">
                <span className="spec-item">🛏️ 5</span>
                <span className="spec-item">🛁 4</span>
                <span className="spec-item">📐 4500 sqft</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="property-card">
            <div className="property-image-container">
              <div className="property-badge">FOR SALE</div>
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop" alt="Property" />
            </div>
            <div className="property-info">
              <div className="property-price">$950,000</div>
              <div className="property-name">Sleek Urban Apartment</div>
              <div className="property-location">Lincoln Park, Chicago</div>
              <div className="property-specs">
                <span className="spec-item">🛏️ 2</span>
                <span className="spec-item">🛁 2</span>
                <span className="spec-item">📐 1200 sqft</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="cta-section">
        <span className="cta-label">GET STARTED</span>
        <h2 className="cta-title">Ready to Find Your<br/>Next Property?</h2>
        <p className="cta-desc">Whether you're buying, selling, or investing — our team of expert agents is ready to guide you through every step of the journey.</p>
        <div className="cta-buttons">
          <Link to="/listings" className="btn-primary">Browse Listings &rarr;</Link>
          <Link to="/agents" className="btn-secondary">Contact an Agent</Link>
        </div>
      </section>

    </div>
  );
};

export default Home;