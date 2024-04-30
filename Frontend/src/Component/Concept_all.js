import React, { useEffect, useState } from 'react';
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import Cards from './Cards/Cards';
import StarRatingsChart from './Rating/StarRatingsChart';
import StarRatingsChart1 from './Rating/StarRatingsChart1';
import TopSelling from './Time/TopSelling';
import CountryList from './Country/Returns';


const Concept_all = ({data}) => {


    const ordersCardsData = [
        {
            title: "Positive",
            color: {
                backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            },
            barValue: 100,
            value: "1500",
            png: UilUsdSquare,
            series: [
                {
                    name: "Weekly",
                    data: data.sentiment.positive.week.values,
                },
            ],
            xaxis: {
                categories: data.sentiment.positive.week.weeks,
                title: 'Week Days'
            },
    
            yaxis: {
                title: 'Frequency by Weekly'
            }
        },
        {
            title: "Neutral",
            color: {
                backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            },
            barValue: 100,
            png: UilUsdSquare,
            series: [
                {
                    name: "Weekly",
                    data: data.sentiment.neutral.week.values,
                },
            ],
            xaxis: {
                categories: data.sentiment.neutral.week.weeks,
                title: 'Week Days'
            },
            yaxis: {
                title: 'Frequency by Week'
            }
        },
        {
            title: "Negative",
            color: {
                backGround:
                    "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            },
            barValue: 100,
            png: UilUsdSquare,
            series: [
                {
                    name: "Weekly",
                    data: data.sentiment.negative.week.values,
                },
            ],
            xaxis: {
                categories: data.sentiment.negative.week.weeks,
                title: 'Week Days'
            },
            yaxis: {
                title: 'Frequency by Week'
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
            <CountryList country={data.country.country_name} value={data.country.country_count}/>
            </div>
          </div>
          </div>
    );
}

export default Concept_all;