import React, { useEffect, useState } from "react";

import Lottie from 'react-lottie';

import * as location from "./1055-world-locations.json";
import * as success from "./1127-success.json";
import ocularx from "../images/ocularx.gif"
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
            <Lottie isClickToPauseDisabled={true} options={defaultOptions1} height={400} width={400} />
          ) : (
            <Lottie isClickToPauseDisabled={true} options={defaultOptions2} height={200} width={200} />
          )}
        </>
      ) : (
        <>
        <div className="container-tanim">
          <div className="box-tanim">
            <div className="title-tanim">
                <span className="block-tanim"></span>
                <h1 className="text1-anim">Ocular<span className="text1-anim" style={{color: "red"}}>X</span> </h1>
            </div>

            <div className="role-tanim">
                <div className="block-tanim"></div>
                <h3 className="text2-anim">Lets Begin</h3>
            </div>
        </div>
    </div>

        </>
      )}
    </>
  );
}

export default PreLoader2;
