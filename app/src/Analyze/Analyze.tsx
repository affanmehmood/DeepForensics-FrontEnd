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
import { useHistory } from 'react-router-dom';

// material ui
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// Alert
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import InputGroup from './Inputs';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../socketIoBase';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import StopIcon from '@material-ui/icons/Stop';
import ReportTable from './ReportTable';
import './Analyze.css';
import sideimage from '../images/video.svg';

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
  const history = useHistory();

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
      sessionStorage.setItem(
        'curruntVideoName',
        videoFilePath.split('\\').pop().split('/').pop()
      );
    } catch (error) {
      openAlertError();
      setIsDisabled(false);
    }
  };
  const stopProcessing = () => {
    socket.emit('halt-requested', () => {
      setState('0');
      setIsDisabled(false);
      sessionStorage.setItem('processState', '0');
      myConsole.log('process halted!');
    });
  };
  const goToProgress = () => {
    history.push('/progress');
  };
  const pickerBlock = () => {
    switch (state) {
      case '0': {
        return (
          <div className="p-4">
            <Button
              disabled={isDisabled}
              onClick={startProcessing}
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<PlayCircleOutline />}
            >
              Start Processing
            </Button>
          </div>
        );
      }
      default: {
        return (
          <div className="row">
            <div className="p-4">
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
            <div className="p-4 pl-0 ">
              <Button
                variant="outlined"
                color="primary"
                onClick={goToProgress}
                className={classes.button}
              >
                Watch Progress
              </Button>
            </div>
          </div>
        );
      }
    }
  };
  useEffect(() => {
    // Anything in here is fired on component mount.
    if (processState == '1' || processState == '2') {
      setIsDisabled(true);
    }
    socket.on('processing-requested');
    socket.on('halt-requested');
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
      socket.off('halt-requested');
      socket.off('work-start');
      socket.off('work-end');
    };
  }, []);

  return (
    <>
      <section id="header" className="home-section">
        <div className="container-fluid pb-4">
          <div className="row">
            <div className=" col-lg-8 col-md-8 col-xl-8">
              <div className="row">
                <div className="col-lg-12 col-md-12 d-flex align-items-center">
                  <h3>Start Processing Videos!</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 d-flex align-items-center">
                  <div className={classes2.root + 'row mt-2'}>
                    <div className=" col-md-12 col-lg-12">
                      <div
                        className="row justify-content-center align-items-center border p-0"
                        style={{ borderRadius: '8px', borderRight: '0px' }}
                      >
                        <div
                          className="text-center ml-3 mr-3 mb-0 p-0"
                          style={{
                            whiteSpace: 'nowrap',
                            width: '450px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {videoFilePath == null
                            ? 'Choose a file'
                            : videoFilePath.split('\\').pop().split('/').pop()}
                        </div>
                        <div className={classes.root + 'p-0 m-0'}>
                          <input
                            onChange={setFilePath}
                            accept="video/*"
                            className={classes.input + ' m-0'}
                            id="myFile"
                            type="file"
                            disabled={isDisabled}
                          />
                          <label htmlFor="myFile" className=" m-0">
                            <Button
                              variant="contained"
                              color="default"
                              component="span"
                              className={classes.button + ' mt-0 mr-0 mb-0'}
                              startIcon={<CloudUploadIcon />}
                              disabled={isDisabled}
                            >
                              Upload
                            </Button>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4 ml-0">
                <div className="col-lg-12 col-md-12 d-flex align-items-center">
                  <h5>Model Configureations</h5>
                </div>
              </div>
              <div className="row mt-2 ml-3">
                <div className="col-lg-12 col-md-12 d-flex align-items-center">
                  <div className="row">
                    <InputGroup />
                  </div>
                </div>
              </div>

              <div className="row ml-0">
                <div className="col-lg-8 col-md-8 col-xl-8 d-flex align-items-center">
                  {pickerBlock()}
                </div>
              </div>
            </div>

            <div className=" col-lg-4 col-md-4 col-xl-4 d-flex align-items-center ">
              <img
                src={sideimage}
                className="img-fluid animated w-75"
                alt="home"
              />
            </div>
          </div>
          <div className="row mt-2 ml-0">
            <div className="col-lg-12 col-md-12 d-flex align-items-center ml-0">
              <h5 className="ml-0">Processed Video Table</h5>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-12 col-md-12 d-flex align-items-center">
              <ReportTable />
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
