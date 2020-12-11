import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export default function Barchart(): JSX.Element {
  const [state, setState] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      autoSelected: 'zoom',

      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996],
      },
    },
    series: [
      {
        name: 'Cars',
        data: [12, 23, 54],
      },
      {
        name: 'Motorbike',
        data: [4, 27, 45],
      },
      {
        name: 'Bus',
        data: [8, 20, 50],
      },
      {
        name: 'Truck',
        data: [15, 25, 35],
      },
    ],
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            height="300"
          />
        </div>
      </div>
    </div>
  );
}
