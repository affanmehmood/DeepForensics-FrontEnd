/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
// circle 1
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TaskTableIcon from '@material-ui/icons/ListAlt';
import Button from '@material-ui/core/Button';

import { useHistory } from 'react-router-dom';

// circle 2
import CircularIntermidiate from './ReusableCompnents/CircularIntermidiate';

import 'bootstrap/dist/css/bootstrap.min.css';
import socket from './socketIoBase';

import Timeline from './ReusableCompnents/Timeline';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        style={{ width: '50px', height: '50px' }}
        variant="determinate"
        {...props}
      />
      <Box
        style={{ width: '50px', height: '50px' }}
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

export default function Progress(): JSX.Element {
  const history = useHistory();
  const processState = sessionStorage.getItem('processState');
  const [state, setState] = useState(processState == null ? '0' : processState);

  const [faceExtractionStarted, setFaceExtractionStarted] = useState(
    sessionStorage.getItem('faceExt') === 'true'
  );
  const [reportStarted, setReportStarted] = useState(
    sessionStorage.getItem('repExt') === 'true'
  );
  const [progressState, setProgressState] = useState({
    progress: 0,
    estimated: 'calculating',
    count: 0,
  });

  function beauifyTime(time: string) {
    if (!time) return;
    const arr = time.split(':');
    return arr[0] + 'h ' + arr[1] + 'm ' + arr[2] + 's';
  }
  const gotoTaskTable = () => {
    history.push('/tasktable');
  };
  const getStatsForFace = () => {
    if (!faceExtractionStarted && !reportStarted) {
      return (
        <div className="row  d-flex justify-content-center align-items-center">
          <div className="col-md-12 col-lg-12 ">
            <div className="row mt-3 d-flex justify-content-center align-items-center">
              <div className="col-5 text-center align-items-center">
                <h5>Estimated Time Remaining</h5>
                <div className="row d-flex align-items-center justify-content-center">
                  <h4 className="text-center mb-0 mr-4 p-0">
                    {beauifyTime(progressState.estimated)}
                  </h4>
                  <CircularProgressWithLabel value={progressState.progress} />
                </div>
              </div>
              <div className="col-md-5 col-lg-5 col-xl-5 d-flex justify-content-center">
                <Timeline state="track" />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (faceExtractionStarted && !reportStarted) {
      return (
        <div className="row  d-flex justify-content-center align-items-center">
          <div className="col-md-12 col-lg-12 ">
            <div className="row mt-3 d-flex justify-content-center align-items-center">
              <div className="col-5 text-center align-items-center">
                <div className="row d-flex align-items-center justify-content-center">
                  <h4 className="text-center mb-0 mr-4 p-0">
                    Extracting Faces
                  </h4>
                  <CircularProgress />
                </div>
              </div>
              <div className="col-md-5 col-lg-5 col-xl-5 d-flex justify-content-center">
                <Timeline state="face" />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (reportStarted) {
      return (
        <div className="row  d-flex justify-content-center align-items-center">
          <div className="col-md-12 col-lg-12 ">
            <div className="row mt-3 d-flex justify-content-center align-items-center">
              <div className="col-5 text-center align-items-center">
                <div className="row d-flex align-items-center justify-content-center">
                  <h4 className="text-center mb-0 mr-4 p-0">
                    Generating a report
                  </h4>
                  <CircularProgress />
                </div>
              </div>
              <div className="col-md-5 col-lg-5 col-xl-5 d-flex justify-content-center">
                <Timeline state="r" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  const statsBlock = () => {
    if (state == '0') {
      return (
        <div className="row d-flex align-items-center">
          <div className="col-md-12 col-lg-12">
            <div className="row d-flex align-items-center justify-content-center ">
              <h4>No stats to show, please start a process.</h4>
            </div>
          </div>
        </div>
      );
    } else if (state == '1') {
      return (
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-5 col-lg-5 col-xl-5">
            <div className="row d-flex justify-content-center align-items-center">
              <h4 className="mr-4 mb-0 text-center align-self-center">
                Initializing model...
              </h4>
              <CircularIntermidiate />
            </div>
          </div>

          <div className="col-md-5 col-lg-5 col-xl-5">
            <Timeline state="init" />
          </div>
        </div>
      );
    } else if (state == '2') {
      return (
        <div className="col-12 ml-0">
          <div className="row ml-0  d-flex justify-content-center">
            <div className="col-md-12 ml-0 col-lg-12 col-xl-12">
              <div className="row ml-0 d-flex justify-content-center">
                <div
                  className="mb-0 p-0"
                  style={{
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    width: '550px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '22px',
                    color: 'grey',
                  }}
                >
                  Video being processesd:{' '}
                  {sessionStorage.getItem('curruntVideoName')}
                </div>
              </div>
              {!faceExtractionStarted && !reportStarted ? (
                <div className="row ml-0 mt-5 d-flex justify-content-center">
                  <div className="col-5 text-center">
                    <h6>No. of object being tracked:</h6>
                    <h5 className="text-center">{progressState.count}</h5>
                  </div>
                </div>
              ) : (
                <div className="row ml-0 mt-5 d-flex justify-content-center">
                  <div className="col-5 text-center">
                    <h6>Tracking Finished</h6>
                    <h5 className="text-center">
                      Waiting for other processes to finish
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </div>
          {getStatsForFace()}
        </div>
      );
    } else if (state == '3') {
      return (
        <div className="row ml-0 d-flex align-items-center">
          <div className="col-md-12 col-lg-12 ml-0">
            <div className="row d-flex align-items-center justify-content-center ml-0">
              <h4 className="mr-4 mb-0">Processing Done!</h4>
              <Button
                onClick={gotoTaskTable}
                variant="outlined"
                color="default"
                endIcon={<TaskTableIcon />}
              >
                Task Table
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
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
    socket.on('face-extraction-started', () => {
      setFaceExtractionStarted(true);
      sessionStorage.setItem('faceExt', 'true');
    });
    socket.on('report-started', () => {
      setReportStarted(true);
      sessionStorage.setItem('repExt', 'true');
    });
    socket.on('work-end', () => {
      setState('3');
      sessionStorage.setItem('processState', '0');
      sessionStorage.removeItem('faceExt');
      sessionStorage.removeItem('repExt');
    });
    return () => {
      // Anything in here is fired on component unmount.
      socket.off('initialization-start');
      socket.off('work-start');
      socket.off('work-progress');
      socket.off('work-end');
    };
  }, []);

  return (
    <>
      <section id="header" className="d-flex align-items-center home-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-xl-12">
                  {statsBlock()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
