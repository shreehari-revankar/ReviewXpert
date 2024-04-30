import React, { useEffect, useState } from 'react';
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import Cards from './Cards/Cards';
import StarRatingsChart from './Rating/StarRatingsChart';
import StarRatingsChart1 from './Rating/StarRatingsChart1';
import TopSelling from './Time/TopSelling';
import CountryList from './Country/Returns';


const Sentiment_all = ({data}) => {

    const decodedImageData = atob(data.payload.image);

// Convert the decoded image data into a Uint8Array
  const imageDataArray = new Uint8Array(decodedImageData.length);
  for (let i = 0; i < decodedImageData.length; i++) {
      imageDataArray[i] = decodedImageData.charCodeAt(i);
  }

  // Create a Blob object from the Uint8Array
  const blob = new Blob([imageDataArray], { type: 'image/png' });

  // Create a URL for the Blob object
  const imageUrl = URL.createObjectURL(blob);

    const ordersCardsData = [
        {
            title: "Overall",
            color: {
                backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            },
            barValue: 100,
            value: "1500",
            png: UilUsdSquare,
            series: [
                {
                    name: "Monthly",
                    data: data.month.values,
                },
            ],
            xaxis: {
                categories: data.month.Months,
                title: 'Months'
            },
    
            yaxis: {
                title: 'Frequency by Month'
            }
        },
        {
            title: "Last Week",
            color: {
                backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            },
            barValue: 100,
            png: UilUsdSquare,
            series: [
                {
                    name: "Weekly",
                    data: data.week.values,
                },
            ],
            xaxis: {
                categories: data.week.weeks,
                title: 'Week Days'
            },
            yaxis: {
                title: 'Frequency by Week'
            }
        },
        {
            title: "Today",
            color: {
                backGround:
                    "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            },
            barValue: 100,
            png: UilUsdSquare,
            series: [
                {
                    name: "Daily",
                    data: data.hour.values,
                },
            ],
            xaxis: {
                categories: data.hour.hours,
                title: 'Intervals'
            },
            yaxis: {
                title: 'Frequency by Interval'
            }
        },
    
    ];
    return (
        <div>
            
            <Cards data={ordersCardsData} />
        
            <div className="md:flex gap-[30px] mb-[30px]">
          <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
            <StarRatingsChart chart_name={"Likes"}
            LikeRange={data.overall_like.index_like}
              LikeCounts={data.overall_like.index_values}
            />
          </div>
          <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
            <StarRatingsChart1 chart_name={"Followers"}
            LikeRange={data.overall_follow.index_follow}
              LikeCounts={
                data.overall_follow.index_Follow_values
              }
            />
            </div>
            <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
            <TopSelling chart_name={"Activity Time"} data_label ={data.overall_time.comment_interval} data_count={data.overall_time.comment_count}/>
            </div>
          </div>
          <div className="md:flex gap-[30px] mb-[30px]">
          <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
          <div className="h-[100%] md:p-5 p-2 star-ratings-chart rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center px-[20px]">
        <p className="sentencecase font-bold text-lg my-4">Word Cloud</p>
      </div>
      <div className="border-2">
        <div className="flex justify-center py-2">
        </div>
        <div className="m-2">
          <img src={imageUrl} alt="logo" />
          </div>
          </div>
          </div>
            </div>
            <div className="md:w-1/2 w-full mb-[30px] md:m-[0px]">
            <CountryList country={data.country.country_name} value={data.country.country_count}/>
            </div>
          </div>
          </div>
    );
}

export default Sentiment_all;