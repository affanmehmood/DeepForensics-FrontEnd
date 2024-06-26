/* eslint-disable react/destructuring-assignment */
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

import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import ReportTable from './Table';
import './Analyze.css';
import sideimage from '../images/people.png';
import Slide from '@material-ui/core/Slide';
import updateStateAction from '../redux/actions/updateStateActions';

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

const VotFront = (props) => {
  const history = useHistory();
  const [inputState, setInputState] = useState({
    tiny: true,
    iou: 45,
    score: 50,
    classes: [],
  });
  const classes = useStyles();
  const classes2 = useStyles2();

  const [state, setState] = useState('0');

  const [videoFilePath, setVideoFilePath] = useState(null);

  const [isDisabled, setIsDisabled] = useState(false);

  const themeColor = '#394457';
  const setFilePath = () => {
    const path = document.getElementById('myFile').files[0].path;
    props.setVideoFilePath(path);
  };
  useEffect(() => {
    setState(props.state);
    setVideoFilePath(props.videoFilePath);
    setIsDisabled(props.isDisabled);

    // if (props.state == '0') setIsDisabled(false);
  }, [props, state]);
  const startProcessing = () => {
    props.setIsDisabled(true);
    try {
      if (videoFilePath == null) {
        // myConsole.log('RAN');
        props.openAlertError();
        props.setIsDisabled(false);
        return;
      }
      props.beginProcessing(videoFilePath, inputState);
    } catch (error) {
      myConsole.log('error');
      props.setIsDisabled(false);
      props.props.openAlertError();
    }
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
                onClick={props.haltProcessing}
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

  const getInputState = (inputs: any) => {
    setInputState(inputs);
  };
  return (
    <>
      <section id="header" className="home-section">
        <div className="container-fluid pb-4">
          <div className="row">
            <div className=" col-lg-7 col-md-7 col-xl-7">
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
                  <h5>Model Configurations</h5>
                </div>
              </div>
              <div className="row mt-2 ml-3">
                <div className="col-lg-12 col-md-12 d-flex align-items-center">
                  <div className="row">
                    <InputGroup sendInputState={getInputState} />
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
                className="img-fluid animateds w-100"
                alt="home"
              />
            </div>
          </div>
          <div className="row mt-2 ml-0">
            <div className="col-lg-12 col-md-12 d-flex align-items-center ml-0">
              <h5 className="ml-0">Last 5 Processed Videos</h5>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-12 col-md-12 d-flex align-items-center">
              <ReportTable
                setSelectedRowInTable={props.setSelectedRowInTable}
                shouldUpdateTable = {props.shouldUpdateTable}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VotFront;
