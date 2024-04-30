import React, { useEffect, useState } from "react";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import ExpandedCard from "./Graph/Overall";
import Topauthor from "./Top/top_author";
import StarRatingsChart from "./Rating/StarRatingsChart";
import StarRatingsChart1 from "./Rating/StarRatingsChart1";
import StarRatingsChartKey from "./Rating/StarRatingsChartKey";
import TopSelling from "./Time/TopSelling";
import StarRating from "./Rating/StarRating";
import Cards from "./Cards/Cards";

const TotalResult = ({ data }) => {
  const decodedImageData = atob(data.payload.image);

  // Convert the decoded image data into a Uint8Array
  const imageDataArray = new Uint8Array(decodedImageData.length);
  for (let i = 0; i < decodedImageData.length; i++) {
    imageDataArray[i] = decodedImageData.charCodeAt(i);
  }

  // Create a Blob object from the Uint8Array
  const blob = new Blob([imageDataArray], { type: "image/png" });

  // Create a URL for the Blob object
  const imageUrl = URL.createObjectURL(blob);

  const [overResult, setOverResult] = useState([
    {
      title: "Last Month",
      color: {
        backGround: "linear-gradient(180deg, #4d8bff 0%, #72a8ff 100%)",
      },
      barValue: 70,
      value: "25,970",
      png: UilUsdSquare,
      series: [
        {
          name: "Monthly",
          data: data.table.Max_result,
        },
      ],
      xaxis: {
        categories: data.table.Dates,
        title: "Months",
      },

      yaxis: {
        title: "Frequency by Month",
      },
    },
  ]);
  return (
    <div className="p-5 rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)] mb-[30px]">
      {/* <div className="flex justify-center mb-[30px] gap-[30px]">
        <div className="rounded bg-gray-100 p-2 border-2">
          <div className="Cards ">
          </div>
        </div>
      </div> */}<div className="mx-[200px] mb-4">
            <Cards  data={overResult} />
            </div>
      <div className="md:flex gap-[30px] mb-[30px]">
        <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
          <StarRatingsChart
            chart_name={"Likes"}
            LikeRange={data.like.index_like}
            LikeCounts={data.like.index_values}
          />
        </div>
        <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
          <StarRatingsChart1
            chart_name={"Followers"}
            LikeRange={data.follow.index_follow}
            LikeCounts={data.follow.index_Follow_values}
          />
        </div>
        <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
          <TopSelling
            chart_name={"Sentiment Count"}
            data_label={data.overall_sentiment_all.overall_sentiment}
            data_count={data.overall_sentiment_all.overall_sentiment_count}
          />
        </div>
      </div>
      <div className="md:flex gap-[30px] mb-[30px]">
        <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
          <StarRatingsChartKey
            chart_name={"Key Concept Count"}
            LikeRange={data.concept_all.concept}
            LikeCounts={data.concept_all.concept_count}
    />
        </div>
        <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
          <StarRating
            chart_name={"Key Concept Sentiment Count"}
            concept={data.concept_all.concept}
            conceptCount={data.concept_sent}
    />
    </div>
      </div>
      <div className="md:flex gap-[30px] mb-[30px]">
        <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
          <TopSelling
            chart_name={"Activity Time"}
            data_label={data.overall_time.comment_interval}
            data_count={data.overall_time.comment_count}
          />
        </div>
        <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
          <div className="h-[100%] md:p-5 p-2 rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center px-[20px]">
              <p className="sentencecase font-bold text-lg my-4">Word Cloud</p>
            </div>
            <div id="chart" className="border-2">
              <img src={imageUrl} alt="Dynamic Image" />
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex gap-[30px] mb-[30px]">
        <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
          <Topauthor
            title={"Top liked Author"}
            auther={data.max_authorlikes.author}
            value={data.max_authorlikes.likes}
            link={data.max_authorlikes.link}
          />
        </div>
        <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
          <Topauthor
            title={"Top Followed Author"}
            auther={data.max_authorfollow.author}
            value={data.max_authorfollow.author_follower}
            link={data.max_authorlikes.link}
          />
        </div>
    </div>
    </div>
  );
};

export default TotalResult;
