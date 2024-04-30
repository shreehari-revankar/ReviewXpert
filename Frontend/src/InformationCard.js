import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InformationCard(props) {
  return (
    <div className="info-cards shadow-md transform transition-transform hover:scale-105">
  <span className="info-card-icon">
    <FontAwesomeIcon className="info-fa-icon" icon={props.icon} />
  </span>
  <p className="info-card-title">{props.title}</p>
  <p className="info-card-description">{props.description}</p>
</div>

  );
}

export default InformationCard;