import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export default function Donut(props): JSX.Element {
  const [state, setState] = useState({
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
          tools: {
            download: true,
          },
        },
      },
      labels: props.cdata ? props.cdata.labels : [],
    },
  });
  return (
    <div className="app mt-3 mb-3">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={state.options}
            height={400}
            series={props.cdata ? props.cdata.series : []}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
}
