/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
// bar 1
import LinearProgress, {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

// bar 2
import LinearIndeterminate from './ReusableCompnents/LinearIntermidiate';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import votsrc from './images/vot2.png';

import socket from './socketIoBase';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '35px',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '4px',
    paddingRight: '4px',
  },
});
export default function Home(): JSX.Element {
  const classes = useStyles();
  const processState = sessionStorage.getItem('processState');
  const [state, setState] = useState(processState == null ? '0' : processState);
  const [progressState, setProgressState] = useState({
    progress: 0,
    estimated: 'calculating',
    count: 0,
  });

  const statsBlock = () => {
    if (state == '0') {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <h6>No Stats to show</h6>
            </div>
          </div>
        </div>
      );
    } else if (state == '1') {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <h6>initializing model...</h6>
            </div>
          </div>
        </div>
      );
    } else if (state == '2') {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center pt-3 pb-2">
              <h6>Stats</h6>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="row pr-4 pl-4">
              <h6>
                EST:
                {progressState.estimated}
              </h6>
            </div>
            <div className="row pr-4 pl-4 pb-4">
              <h6>
                No. of objects tracking:
                {progressState.count}
              </h6>
            </div>
          </div>
        </div>
      );
    } else if (state == '3') {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <h6>Processing Done</h6>
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
      document.getElementById('cframe').src =
        'data:image/jpeg;base64,' + data.frame;
      setProgressState({
        progress: data.progress,
        estimated: data.estimated,
        count: data.count,
      });
    });
    socket.on('work-end', () => {
      setState('3');
      sessionStorage.setItem('processState', '3');
      document.getElementById('cframe').src = votsrc;
      myConsole.log('work-end Progress');
    });
    return () => {
      // Anything in here is fired on component unmount.
      socket.off('initialization-start');
      socket.off('work-start');
      socket.off('work-progress');
      socket.off('work-end');
    };
  }, []);
  const getProgressBar = () => {
    if (state == '1') {
      return <LinearIndeterminate />;
    } else if (state == '2') {
      return (
        <div className={classes.root}>
          <LinearProgressWithLabel value={progressState.progress} />
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      <section id="header" className="d-flex align-items-center home-section">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-12 mx-auto">
              <div className="row">
                {' '}
                <div
                  id="framecont"
                  className="votIconDiv col-md-7 col-lg-7 pt-lg-0 order-2 order-lg-1 d-flex align-items-center justify-content-center flex-column"
                >
                  <img
                    alt="frame"
                    src={votsrc}
                    style={{ width: '100%', height: '100%' }}
                    id="cframe"
                  />
                </div>
                <div className="col-lg-3 col-md-3 order-1 order-lg-2 header-img d-flex align-items-center justify-content-center">
                  <div className="col-md-12 col-lg-12">{statsBlock()}</div>
                </div>
              </div>
              <div className="row order-2 order-lg-1 d-flex align-items-center justify-content-center">
                <div className="col-md-8 col-lg-8 order-2 order-lg-1 d-flex align-items-center justify-content-center">
                  {getProgressBar()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
