import React from "react";
import "../Cards/Cards.css";
// import { cardsData } from "../../Data/Data";
import Card from "../Card/Card";

const Cards = (prop) => {
  return (
    <div className="Cards">
      {prop.data.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
              xaxis={card.xaxis.categories}
              xtitle={card.xaxis.title}
              ytitle={card.yaxis.title}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
