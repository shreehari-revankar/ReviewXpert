import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function TopSelling({chart_name,data_label,data_count}) {
    const options= {
        chart: {
            type: 'donut',
        },
        labels: data_label,
        // responsive: [
        //     {
        //         breakpoint: 480,
        //         options: {
        //             chart: {
        //                 width: 200,
        //             },
        //             legend: {
        //                 position: 'bottom',
        //             },
        //         },
        //     },
        // ],
    }
    

        return (
            <div className='h-[100%] md:p-5 p-2 rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)]'>
                <div className="flex justify-between items-center px-[20px]">
                    <p className="sentencecase font-bold text-lg my-4">{chart_name}</p>
                </div>
                <div id="chart" className='border-2'>
                    <ReactApexChart options={options} series={data_count} type="donut" />
                </div>
            </div>
        );

};

