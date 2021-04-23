import React, {useEffect} from "react";
import ReactApexChart from "react-apexcharts";

const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

function Graph(props) {
  const series = [
    {
      name: "FPS",
      data:  props.fpsArray,
    },
    {
      name: "# of objects",
      data:  props.noOfObjsArray,
    }
  ];
  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "numeric",
      categories: Object.keys(Array.apply(0, Array(101))).map(Number),
    },
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <br />
      <h5>FPS Graph.</h5>
      <br />
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />

    </div>
  );
}

export default Graph;
