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

// material ui
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';

import { ProgressBar } from 'react-bootstrap';
import votsrc from './images/vot2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../socketIoBase';
import OptionalDrawer from './OptionsDrawer';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
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
  })
);

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

export default function VotFront(): JSX.Element {
  const classes = useStyles();
  // 0 state means noting has happened
  // 1 state means initializing model
  // 2 state means started processing
  // 3 state means processing finished
  const [state, setState] = useState(0);
  const [videoFilePath, setVideoFilePath] = useState(null);
  // eslint-disable-next-line
  const setFilePath = () => {
    const path = document.getElementById('myFile').files[0].path;
    setVideoFilePath(path);
  };
  const startProcessing = () => {
    try {
      socket.emit('processing-requested', { filepath: videoFilePath });
      myConsole.log('Emmitted start process request');
    } catch (error) {
      myConsole.log('processing-requested =>', error);
    }
  };
  const stopProcessing = () => {};
  const pickerBlock = () => {
    switch (state) {
      case 0: {
        return (
          <div className="row mb-4 mt-4 border border-dark rounded-left">
            <div className="col-md-12 col-lg-12">
              <div className="row justify-content-center pt-3">
                <div className={classes.root}>
                  <input
                    accept="video/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="default"
                      component="span"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload
                    </Button>
                  </label>
                </div>
              </div>
              <h6 className="pt-3 text-center">cars.mp3</h6>
            </div>
            <div className="pt-3 pb-3 col-md-12 col-lg-12">
              <div className="row justify-content-center p-4">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<PlayCircleOutline />}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
        );
      }
      case 1: {
        return (
          <div className="row mb-4 border border-dark rounded-left">
            <div className="col-md-12 col-lg-12">
              <div className="row justify-content-center p-4">
                <h6 className="text-center">Cars.mp3</h6>
              </div>
            </div>
            <div className="col-md-12 col-lg-12">
              <div className="row justify-content-center p-4">
                <button
                  onClick={stopProcessing}
                  type="button"
                  className="btn btn-danger btn-lg"
                  style={{
                    paddingLeft: '50px',
                    paddingRight: '50px',
                  }}
                >
                  Stop
                </button>
              </div>
            </div>
          </div>
        );
      }
      default: {
        return (
          <>
            <h6>Unexpected</h6>
          </>
        );
      }
    }
  };
  useEffect(() => {
    // Anything in here is fired on component mount.
    socket.on('processing-requested');
    socket.on('initialization-start', () => {
      myConsole.log('initialization-start');
    });
    socket.on('work-start', () => {
      myConsole.log('work-start');
    });
    socket.on('work-end', () => {
      myConsole.log('work-end');
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
      <section id="header" className="d-flex align-items-center home-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 mx-auto">
              <div className="row">
                <div className="col-lg-11 col-md-11 order-1 order-lg-2 header-img d-flex align-items-center justify-content-center">
                  <div className="col-md-4 col-lg-4">{pickerBlock()}</div>
                </div>
                <div className="col-md-1 col-lg-1  order-1 order-lg-2 header-img d-flex align-items-center justify-content-center">
                  <OptionalDrawer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
