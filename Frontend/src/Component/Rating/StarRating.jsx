import { Bar } from "react-chartjs-2";
import { Chart, BarElement, Tooltip, LinearScale, CategoryScale } from "chart.js";
Chart.register(BarElement, Tooltip, LinearScale, CategoryScale);

export default function StarRating({ chart_name,concept,conceptCount, width = 320, height = 230 }) {
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
        callbacks: {
          label: (item) => {
            const label = labels[item.datasetIndex];
            return `${label}: ${conceptCount[label][item.dataIndex]}`;
          }
        }
      }
    }
  };

  const data = {
    labels: concept,
    datasets: []
  };
  let labels = Object.keys(conceptCount);
  let numSets = labels.length;
  for (let i = 0; i < numSets; i++) {
    const label = labels[i];
    let series;

      series = conceptCount[label].map(
        (v, j) => v + conceptCount[labels[i]][j]
      );
    data.datasets.push({
      label,
      data: series,
      backgroundColor: getColor(label),
    });
  }
  function getColor(label) {
    switch (label) {
      case 'positive':
        return `rgba(64, 219, 66, 0.78)`;
      case 'negative':
        return `#e63900`;
      case 'neutral':
        return `#ffcc00`;
      default:
        return 'black'; // Default color if label doesn't match any case
    }
  }


  return (
    <div className="h-[100%] md:p-5 p-2 star-ratings-chart rounded-lg bg-white shadow-[0_0_25px_-14px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center px-[20px]">
        <p className="sentencecase font-bold text-lg my-4">{chart_name}</p>
      </div>
      <div className="border-2">
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

