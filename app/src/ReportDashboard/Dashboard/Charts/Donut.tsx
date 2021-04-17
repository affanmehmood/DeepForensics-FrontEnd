import { colors } from '@material-ui/core';
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export default function Donut(props): JSX.Element {
  const [state, setState] = useState({
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    options: {
      tooltip: {
        theme: "dark",
    },
    theme: {
      mode: 'dark',
      palette: 'palette1',
  },
      chart: {
        background: false,
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
        <div className="mixed-chart col-12">
          <Chart
            options={state.options}
            series={props.cdata ? props.cdata.series : []}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
}
