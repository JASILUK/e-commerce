import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './landing.css';
import image from '../assets/img.png';

function Landing() {
  const navigate = useNavigate();

  const gotocollection = () => {
    navigate('/collection');
  };

  return (
    <div className="landing-page">

      <header className="landing-header">
        <div className="logo">TrendZone</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/collection">Collection</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

 <section className="hero">
  <div className="hero-content">
    <img src={image} alt="Hero" className="hero-person" />
    <div className="hero-text">
      <h1>Discover the Latest Trends in Fashion</h1>
      <p>Explore our men, women, and kids collections now</p>
      <button onClick={gotocollection}>🚀 Get Explore</button>
    </div>
  </div>
</section>



      <section className="highlights" id="collections">
        <div className="highlight-box">
          <h2>👔 Men</h2>
          <p>Classy, Bold, Modern.</p>
        </div>
        <div className="highlight-box">
          <h2>👗 Women</h2>
          <p>Trendy, Chic, Elegant.</p>
        </div>
        <div className="highlight-box">
          <h2>🧒 Kids</h2>
          <p>Fun, Cute, Colorful.</p>
        </div>
      </section>

    </div>
  );
}

export default Landing;
