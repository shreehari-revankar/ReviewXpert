import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LayoutGroup, motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

function ExpandedCard({ param }) {
    const data = {
      options: {
        chart: {
          type: "area",
          height: "auto",
        },
  
        yaxis: {
          title: {
            text: param.ytitle,
          },
        },
  
        dropShadow: {
          enabled: false,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: "#000",
          opacity: 0.35,
        },
  
        fill: {
          colors: ["#fff"],
          type: "gradient",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: ["white"],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
        grid: {
          show: true,
        },
  
        xaxis: {
          type: "category",
          categories: param.xaxis,
          title: {
            text: param.xtitle,
          },
        },
      },
    };
  
    return (
      <motion.div>
        <div className="chartContainer">
          <Chart options={data.options} series={param.series} type="area" />
        </div>
      </motion.div>
    );
}
export default ExpandedCard;