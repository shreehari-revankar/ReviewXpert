import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck,faSearch, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "./Styles/Hero.css";

function Hero() {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container" id="hero">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">🔍 Reviews Makes the Difference</p>
          <h2 className="text-title">
            Find Your Product Strength and Weakness
          </h2>
          <p className="text-descritpion">
            We provide real time Social Media Analysis to understand the market better. On-demand analysis
            services at your fingertips.
          </p>
          <Link to="/Workspace"><button
        className="text-appointment-btn"
        type="button"
      >
        <FontAwesomeIcon icon={faSearch} /> TRY NOW
      </button></Link>
          <div className="text-stats">
            <div className="text-stats-container">
              <p>24x7</p>
              <p>Real Time Analysis</p>
            </div>

            <div className="text-stats-container">
              <p>2</p>
              <p>Platform</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>Graphs and Plots</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;