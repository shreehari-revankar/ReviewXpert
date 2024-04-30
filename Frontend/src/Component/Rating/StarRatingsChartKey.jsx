import { Bar } from "react-chartjs-2";
import { Chart, BarElement, Tooltip, LinearScale, CategoryScale } from "chart.js";
Chart.register(BarElement, Tooltip, LinearScale, CategoryScale);

export default function StarRatingsChart({ chart_name,LikeRange,LikeCounts, width = 320, height = 230 }) {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0
      }
    },
    responsive: false,
    scales: {
      x: {
        stacked: true,
        display: false,
        grid: {
          display: false
        }
      },
      y: {
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
        backgroundColor: 'rgba(250, 88,108)',
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
        <div className="m-2">
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

