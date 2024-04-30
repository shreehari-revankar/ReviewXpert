import { Bar } from "react-chartjs-2";
import { Chart, BarElement, Tooltip, LinearScale, CategoryScale } from "chart.js";
Chart.register(BarElement, Tooltip, LinearScale, CategoryScale);

export default function StarRatingsChart({ chart_name,LikeRange,LikeCounts, width = 320, height = 230 }) {
  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 0
      }
    },
    responsive: false,
    scales: {
      y: {
        stacked: true,
        display: false,
        grid: {
          display: false
        }
      },
      x: {
        stacked: true,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        mode: "y",
      }
    }
  };
  const data = {
    labels: LikeRange,
    datasets:  [
      {
        label: "Counts",
        data: LikeCounts,
        // backgroundColor: [
        //     'rgba(0, 154, 225,)',   // #009ae1
        //     'rgba(164, 140, 238,)', // #a48cee
        //     'rgba(255, 114, 194,)', // #ff72c2
        //     'rgba(255, 118, 112, )', // #ff7670
        //     'rgba(255, 166, 0, )',   // #ffa600
        //   ],
        backgroundColor:[ 'rgba(0, 154, 225)','rgba(164, 140, 238)','rgba(255, 114, 194)','rgba(255, 118, 112)','rgba(255, 166, 0)'],
        borderColor: 'rgba(177, 105, 18)',
        borderWidth: 1,
      },
    ],
  };
  

  

  return (
    <div className="h-[100%] md:p-5 p-2 star-ratings-chart rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center px-[20px]">
        <p className="sentencecase font-bold text-lg my-4">{chart_name}</p>
      </div>
      <div className="border-2">
        <div className="flex justify-center py-2">
        </div>
        <div className="pl-12 m-2 ">
          <Bar
          options={options}
            data={data}
            width={width}
            height={height}
          />
        </div>
      </div>
    </div>
  );
}

