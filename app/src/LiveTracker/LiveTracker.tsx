/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable promise/no-nesting */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable import/order */
/* eslint-disable no-else-return */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-template */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Player from './Player';
import CircularIntermidiate from '../ReusableCompnents/CircularIntermidiate';

import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../socketIoBase';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

export default function LiveTracker(): JSX.Element {
  const [state, setState] = useState({
    url: null,
    trackId: '',
    taskId: '',
  });
  const { taskId, trackId } = useParams();
  const classes = useStyles();
  const history = useHistory();
  // 0 state means noting has happened
  // 1 state means initializing model
  // 2 state means started processing
  // 3 state means processing finished
  var processState = sessionStorage.getItem('processState');
  if (processState == null || processState == '3') {
    processState = '0';
    sessionStorage.setItem('processState', '0');
  }
  function goBack() {
    history.push('/detections/' + taskId);
  }
  useEffect(() => {
    // Anything in here is fired on component mount.
    socket.emit('get-trackvideo', { trackId, taskId });
    socket.on('trackvideo-done', (data) => {
      setState(data.detections);
      // myConsole.log(data);
    });

    socket.on('processing-requested');
    socket.on('initialization-start', () => {
      sessionStorage.setItem('processState', '1');
    });
    socket.on('work-start', () => {
      sessionStorage.setItem('processState', '2');
    });
    socket.on('work-end', () => {
      sessionStorage.setItem('processState', '0');
      sessionStorage.removeItem('repExt');
      sessionStorage.removeItem('faceExt');
    });
    return () => {
      // Anything in here is fired on component unmount.
      socket.off('processing-requested');
      socket.off('initialization-start');
      socket.off('work-start');
      socket.off('work-end');
    };
  }, []);

  return (
    <>
      <section id="header" className="home-section ml-0">
        <div className="container-fluid pb-4 ml-0">
          <div className="row mt-2 ml-0">
            <div className="col-lg-12 col-md-12 col-xl-12 ml-0">
              <div className="row m-0 d-flex justify-content-center ml-0">
                <Button
                  onClick={goBack}
                  variant="outlined"
                  color="default"
                  className={classes.button + ' mr-auto'}
                >
                  Back
                </Button>
                <h4 className="mr-auto mt-2" style={{ marginLeft: '-15px' }}>
                  Objects Tracker{' Task: ' + taskId + ' Track: ' + trackId}
                </h4>
              </div>
              <div
                className="row m-0 mt-3 ml-0 justify-content-center"
                style={{ marginLeft: '-15px' }}
              >
                {state.url ? (
                  <Player url={state.url} />
                ) : (
                  <div className="row mt-5 justify-content-center">
                    <h4 className="mr-4 mb-0 text-center align-self-center">
                      Tracking the object...
                    </h4>
                    <CircularIntermidiate />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
