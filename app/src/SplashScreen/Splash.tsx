import React, { useEffect, useState } from "react";

import Lottie from 'react-lottie';

import * as location from "./1055-world-locations.json";
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

function PreLoader2(props) {
  const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setcompleted(props.completed)
    myConsole.log(props.loading, props.loading);
  }, [props]);

  return (
    <>
      {!completed ? (
        <>
            <Lottie isClickToPauseDisabled={true} options={defaultOptions1} height={400} width={400} />
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
                <h3 className="text2-anim">A video forensics toolkit</h3>
            </div>
        </div>
    </div>
        </>
      )}
    </>
  );
}

export default PreLoader2;
