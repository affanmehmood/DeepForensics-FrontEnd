import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export default function Barchart(): JSX.Element {
  const [state, setState] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996],
      },
      plotOptions: {
        bar: {
          horizontal: true,
          colors: {
            ranges: [
              {
                from: 0,
                to: 10,
                color: '#73889d',
              },
              {
                from: 11,
                to: 20,
                color: '#5c7b99',
              },
              {
                from: 21,
                to: 30,
                color: '#496989',
              },
              {
                from: 31,
                to: 40,
                color: '#375a80',
              },
              {
                from: 41,
                to: 50,
                color: '#60437c',
              },
              {
                from: 51,
                to: 60,
                color: '#583d72',
              },
            ],
          },
        },
      },
    },
    series: [
      {
        name: 'series-1',
        data: [10, 20, 30, 40, 50, 60],
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
