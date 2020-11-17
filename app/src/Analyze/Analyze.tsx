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

// material ui
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// Alert
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import Paper from '@material-ui/core/Paper';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../socketIoBase';
import OptionalDrawer from './OptionsDrawer';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import StopIcon from '@material-ui/icons/Stop';

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
const useStyles2 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));
const useStyles3 = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

export default function VotFront(): JSX.Element {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [isDisabled, setIsDisabled] = useState(false);
  // 0 state means noting has happened
  // 1 state means initializing model
  // 2 state means started processing
  // 3 state means processing finished
  var processState = sessionStorage.getItem('processState');
  if (processState == null || processState == '3') {
    processState = '0';
    sessionStorage.setItem('processState', '0');
  }
  const [state, setState] = useState(processState);
  const [videoFilePath, setVideoFilePath] = useState(null);

  // ALERT STARTS HERE
  const classes3 = useStyles3();
  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  // Alert Sucess starts here
  const [open1, setOpen1] = React.useState(false);
  const openAlertSucess = () => {
    setOpen1(true);
  };
  const closeAlertSucess = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen1(false);
  };

  // Alert Error starts here
  const [open2, setOpen2] = React.useState(false);
  const openAlertError = () => {
    setOpen2(true);
  };
  const closeAlertError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen2(false);
  };

  // Alert info starts here
  const [open3, setOpen3] = React.useState(false);
  const openAlertInfo = () => {
    setOpen3(true);
  };
  const closeAlertInfo = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen3(false);
  };
  // ALERT END HERE

  const themeColor = '#394457';
  const setFilePath = () => {
    const path = document.getElementById('myFile').files[0].path;
    setVideoFilePath(path);
  };
  const startProcessing = () => {
    setIsDisabled(true);
    try {
      if (videoFilePath == null) {
        myConsole.log('RAN');
        openAlertError();
        setIsDisabled(false);
        return;
      }
      socket.emit('processing-requested', { filepath: videoFilePath });
      openAlertInfo();
    } catch (error) {
      openAlertError();
      setIsDisabled(false);
    }
  };
  const stopProcessing = () => {};
  const pickerBlock = () => {
    switch (state) {
      case '0': {
        return (
          <div className={classes2.root + 'row mb-4 mt-4 '}>
            <Paper
              elevation={3}
              className="rounded-left"
              style={{
                paddingTop: '50px',
                paddingBottom: '50px',
                paddingLeft: '80px',
                paddingRight: '80px',
              }}
            >
              <div className=" col-md-12 col-lg-12">
                <div className="row justify-content-center pt-3">
                  <div className={classes.root}>
                    <input
                      onChange={setFilePath}
                      accept="video/*"
                      className={classes.input}
                      id="myFile"
                      type="file"
                      disabled={isDisabled}
                    />
                    <label htmlFor="myFile">
                      <Button
                        variant="contained"
                        color="default"
                        component="span"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                        disabled={isDisabled}
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                </div>
                <h6 className="pt-3 text-center">
                  {videoFilePath == null
                    ? 'No file selected'
                    : videoFilePath.split('\\').pop().split('/').pop()}
                </h6>
              </div>
              <div className="pt-3 pb-3 col-md-12 col-lg-12">
                <div className="row justify-content-center p-4">
                  <Button
                    disabled={isDisabled}
                    onClick={startProcessing}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<PlayCircleOutline />}
                  >
                    Start
                  </Button>
                </div>
              </div>
            </Paper>
          </div>
        );
      }
      default: {
        return (
          <div className={classes2.root + 'row mb-4 mt-4  p-6 rounded-left'}>
            <Paper elevation={3}>
              <div className="col-md-12 col-lg-12">
                <h6 className="pt-3 text-center">
                  {videoFilePath == null
                    ? 'No file selected'
                    : videoFilePath.split('\\').pop().split('/').pop()}
                </h6>
              </div>
              <div className="pt-3 pb-3 col-md-12 col-lg-12">
                <div className="row justify-content-center p-4">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={stopProcessing}
                    className={classes.button}
                    endIcon={<StopIcon />}
                  >
                    Stop
                  </Button>
                </div>
              </div>
            </Paper>
          </div>
        );
      }
    }
  };
  useEffect(() => {
    // Anything in here is fired on component mount.
    socket.on('processing-requested');
    socket.on('initialization-start', () => {
      setState('1');
      sessionStorage.setItem('processState', '1');
      closeAlertInfo();
      openAlertSucess();
      myConsole.log('initialization-start');
    });
    socket.on('work-start', () => {
      setState('2');
      sessionStorage.setItem('processState', '2');
      myConsole.log('work-start');
    });
    socket.on('work-end', () => {
      setState('0');
      setIsDisabled(false);
      sessionStorage.setItem('processState', '0');
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
                  <div className="col-md-7 col-lg-7">{pickerBlock()}</div>
                </div>
                <div className="col-md-1 col-lg-1  order-1 order-lg-2 header-img d-flex align-items-center justify-content-center">
                  <div className="col-md-2 col-lg-2 float-right">
                    <OptionalDrawer />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes3.root}>
            <Snackbar
              open={open1}
              autoHideDuration={6000}
              onClose={closeAlertSucess}
            >
              <Alert onClose={closeAlertSucess} severity="success">
                Processing Started Successfully!
              </Alert>
            </Snackbar>
            <Snackbar
              open={open2}
              autoHideDuration={3000}
              onClose={closeAlertError}
            >
              <Alert onClose={closeAlertError} severity="error">
                Failed to start processing!
              </Alert>
            </Snackbar>
            <Snackbar
              open={open3}
              autoHideDuration={6000}
              onClose={closeAlertInfo}
            >
              <Alert onClose={closeAlertInfo} severity="info">
                Please wait while the system is processing...
              </Alert>
            </Snackbar>
          </div>
        </div>
      </section>
    </>
  );
}
