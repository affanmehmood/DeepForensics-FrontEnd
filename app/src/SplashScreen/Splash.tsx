import React, { useEffect, useState } from "react";

import Lottie from 'react-lottie';

import * as location from "./1055-world-locations.json";
import * as success from "./1127-success.json";

const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function PreLoader2(props) {
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setloading(props.loading)
    setcompleted(props.completed)
    myConsole.log(props.loading, props.loading);
  }, [props]);

  return (
    <>
      {!completed ? (
        <>
          {!loading ? (
            <Lottie options={defaultOptions1} height={400} width={400} />
          ) : (
            <Lottie options={defaultOptions2} height={200} width={200} />
          )}
        </>
      ) : (
        <>
          <h1>Welcome to OcularX</h1>
          <br />

        </>
      )}
    </>
  );
}

export default PreLoader2;
