import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export default function Donut(): JSX.Element {
  const [state, setState] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E'],
  });
  return (
    <Chart
      options={state.options}
      series={state.series}
      type="donut"
      height="300"
    />
  );
}
