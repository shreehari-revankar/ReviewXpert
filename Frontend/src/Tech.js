import React from 'react';
import "./Styles/tech.css";
import sparklogo from './Images/spark.png';
import Reactlogo from './Images/react.png';
import Flasklogo from './Images/flask.svg';
import Mongodblogo from './Images/mongodb-logo.png';

function Tech() {
  return (
    <div className="doctor-section" id="tech">
      <div className="dt-title-content" style={{}}>
        <h3 className="dt-title">
          <span>Technology</span>
        </h3>

      </div>

      <div className="dt-cards-content ">
        <img className="dt-card " src={sparklogo}/>
        <img className="dt-card" src={Reactlogo}/>
        <img className="dt-card" src={Flasklogo}/>
        <img className="dt-card" src={Mongodblogo}/>
      </div>
    </div>
  );
}

export default Tech;