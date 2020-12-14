import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
export default function Barchart(props): JSX.Element {
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
        categories: props.cdata ? props.cdata.categories : [],
      },
    },
  });
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={state.options}
            series={props.cdata ? props.cdata.series : []}
            type="bar"
            height="300"
          />
        </div>
      </div>
    </div>
  );
}
