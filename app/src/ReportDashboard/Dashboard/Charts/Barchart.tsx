import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
export default function Barchart(props): JSX.Element {
  const [state, setState] = useState({
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
        id: 'basic-bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: props.cdata ? props.cdata.categories : [],
      },
    },
  });
  useEffect(()=>{
    setState({
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
          id: 'basic-bar',
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          categories: props.cdata ? props.cdata.categories : [],
        },
      },
    });
  }, [props.cdata])
  return (
    <div className="app">
      <div className="row ml-0">
        <div className="col-12">
          <Chart
            options={state.options}
            series={props.cdata ? props.cdata.series : []}
            type="bar"
          />
        </div>
      </div>
    </div>
  );
}
