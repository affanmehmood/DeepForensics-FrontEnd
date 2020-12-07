/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-key */
/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapse from '@material-ui/core/Collapse';
import Grow from '@material-ui/core/Grow';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularIntermidiate from '../ReusableCompnents/CircularIntermidiate';
import socket from '../socketIoBase';
import options from '../ReusableCompnents/classes';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

export default function Detections(): JSX.Element {
  const { taskId } = useParams();
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [detectionData, setDetectionData] = useState([]);
  const processState = sessionStorage.getItem('processState');
  const [state, setState] = useState(processState == null ? '0' : processState);

  useEffect(() => {
    // get detection data
    socket.on('get-detections'); // Anything in here is fired on component mount.
    socket.emit('get-detections', {
      taskId,
      isResponseExpected: true,
      isTest: false,
    });
    socket.on('detections-extracted', (data) => {
      setDetectionData(data.detections);
    });
    socket.on('initialization-start', () => {
      setState('1');
      sessionStorage.setItem('processState', '1');
      myConsole.log('initialization-start Progress');
    });
    socket.on('work-start', () => {
      sessionStorage.setItem('processState', '2');
      myConsole.log('work-start Progress');
    });
    socket.on('work-progress', (data) => {
      if (state != '2') {
        setState('2');
        sessionStorage.setItem('processState', '2');
      }
      setProgressState({
        progress: data.progress,
        estimated: data.estimated,
        count: data.count,
      });
    });
    socket.on('work-end', () => {
      setState('3');
      sessionStorage.setItem('processState', '3');
      myConsole.log('work-end Progress');
    });
    return () => {
      // Anything in here is fired on component unmount.
      socket.off('initialization-start');
      socket.off('work-start');
      socket.off('work-progress');
      socket.off('work-end');
      socket.off('get-detections');
      socket.off('detections-extracted');
    };
  }, []);
  function getProgressBar() {
    if (detectionData.length === 0) {
      return (
        <>
          <div className="row mt-5 ml-0 mr-0 p-0 d-flex justify-content-center align-items-center">
            <h4 className="mr-4 mb-0 text-center align-self-center">
              Please Wait...
            </h4>
            <CircularIntermidiate />
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
  return (
    <>
      <section id="header" className="d-flex home-section">
        <div className="container-fluid">
          <Collapse in>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <h3>Object Detections</h3>
                </div>
                <div className="row mt-4">
                  <h5>Check out all the results!</h5>
                </div>
                <div className="row mt-3">
                  <Autocomplete
                    value={value}
                    onChange={(event: any, newValue: string | null) => {
                      setValue(newValue);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Filter"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="row mt-3 justify-content-center">
                  {getProgressBar()}
                  {detectionData
                    .filter((detection) => {
                      if (value === 'All' || value === null) return true;
                      return detection.class === value;
                    })
                    .map((val, ind) => {
                      return (
                        <Grow
                          in
                          style={{ transformOrigin: '0 0 0' }}
                          {...{ timeout: 100 * ind }}
                        >
                          <div
                            className="col-1 flex-i-a d-inline-block m-0 p-0 border rounded mb-3"
                            style={{ backgroundColor: '#394457' }}
                          >
                            <div className="box one">
                              <img
                                alt="i"
                                src={'data:image/jpeg;base64,' + val.image}
                              />
                            </div>
                            <div className="bottom-div row m-0 d-flex justify-content-center">
                              <h6 className="sub-text text-sm m-0 ">
                                100% confident, {' ' + val.class}
                              </h6>
                              <button
                                className="button m-0"
                                style={{ verticalAlign: 'middle' }}
                              >
                                <span>live tracking</span>
                              </button>
                            </div>
                          </div>
                        </Grow>
                      );
                    })}
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </section>
    </>
  );
}
