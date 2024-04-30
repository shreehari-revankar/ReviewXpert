import { Select } from "antd";
import { useState } from "react";

import StarRatingsChart from "./dashcomponents/Rating/StarRatingsChart.jsx";
import TopSelling from "./dashcomponents/Products/TopSelling.jsx";
import Orders from "./dashcomponents/Orders_Status/Orders_Status.jsx";
import RecentOrders from "./dashcomponents/Returns/Returns.jsx";

import Sales from "./dashcomponents/Sales_Orders/Sales_Orders.jsx";

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState("Year");
  // const [selectedStore, setSelectedStore] = useState("All Stores");

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  // const handleStoreChange = (value) => {
  //   setSelectedStore(value);
  // };

  return (
    <div className="">
      <div className="md:m-[30px] m-[12px]">
        <div className="md:flex gap-[30px] mb-[30px]">
          <div className="flex items-center w-full md:w-1/3 p-5 rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)] mb-[30px] md:m-[0px]">
            <div className="flex justify-between items-center gap-[30px]">
              <div className="text-center uppercase text-lg">Most active day of the week:</div>
              <div className="text-center uppercase text-lg font-bold text-[#FD7603]">Sunday</div>
            </div>
          </div>
          {/* <div className="md:flex w-full md:w-1/3 p-5 gap-[30px] justify-center rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)] mb-[30px] md:m-[0px]">
            <div className="flex justify-between items-center">
              <p className="sentencecase font-bold text-lg my-4">Select Store</p>
            </div>
            <div className="flex justify-between items-center">
              <Select
                defaultValue="All Stores"
                value={selectedStore}
                onChange={handleStoreChange}
                className="w-[220px]">
                <Select.Option value="Krishna Medical">Krishna Medical</Select.Option>
                <Select.Option value="Wellness forever">Wellness forever</Select.Option>
                <Select.Option value="Sangam Medical">Sangam Medical</Select.Option>
              </Select>
            </div>
          </div> */}
          <div className="md:flex w-full md:w-1/3 p-5 gap-[30px] justify-center rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center">
              <p className="sentencecase font-bold text-lg my-4">Select Year</p>
            </div>
            <div className="flex justify-between items-center">
              <Select
                defaultValue="Year"
                value={selectedYear}
                onChange={handleYearChange}
                className="w-[220px]">
                <Select.Option value="2023">2023</Select.Option>
                <Select.Option value="2022">2022</Select.Option>
                <Select.Option value="2021">2021</Select.Option>
                <Select.Option value="2020">2020</Select.Option>
                <Select.Option value="2019">2019</Select.Option>
                <Select.Option value="2018">2018</Select.Option>
                <Select.Option value="2017">2017</Select.Option>
              </Select>
            </div>
          </div>
        </div>

        <Sales />

        <div className="md:flex gap-[30px] mb-[30px]">
          <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
            <StarRatingsChart
              starCounts={{
                Total: [10, 43, 32, 91, 40],
                "Last Year": [0, 29, 8, 32, 25],
                "Last Month": [0, 4, 0, 7, 5],
              }}
            />
          </div>
          <div className="md:w-1/2 w-full">
            <Orders />
          </div>
        </div>
        <div className="md:flex gap-[30px]">
          <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
            <TopSelling />
          </div>
          <div className="md:w-1/2 w-full">
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
