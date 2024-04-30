import React from "react";
import InformationCard from "./InformationCard";
import { faHourglassStart, faChartSimple, faPerson } from "@fortawesome/free-solid-svg-icons";
import "./Styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
        We bring a comprehensive and unified platform solution for analyzing social media platforms.
         Our integrated system simplifies the process of monitoring, analyzing, and deriving insights
          from social media data, offering a seamless experience for businesses and organizations.
        </p>
      </div>

      <div className="info-cards-content ">
        <InformationCard
      
          title="Save Time"
          description="We save your time by automatically analyzing social 
          media data, allowing you to focus on what matters most—your 
          business.By leveraging cutting-edge technologies, we extract valuable 
          insights and trends from this data, providing you with actionable 
          intelligence to make informed decisions."
          icon={faHourglassStart}
        />

        <InformationCard
          title="Present Beautiful Reports "
          description="Our platform offers visually stunning graphs that are
           not only aesthetically appealing but also highly functional,
            allowing you to extract and analyze data effectively.
            "
          icon={faChartSimple}
        />

        <InformationCard
          title="Help To Win More Customers"
          description="Helping you win customers is at the core of our mission.
           We understand that acquiring and retaining customers is vital
            for the success of your business, and we provide a range of
             solutions and strategies to support you in this endeavor."
          icon={faPerson}
        />
      </div>
    </div>
  );
}

export default Info;