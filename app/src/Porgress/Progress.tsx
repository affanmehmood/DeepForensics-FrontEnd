/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Chart } from "react-google-charts";
import { makeStyles } from "@material-ui/core/styles";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SpeedIcon from '@material-ui/icons/Speed';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import VideocamIcon from '@material-ui/icons/Videocam';

import LinearProgress from '@material-ui/core/LinearProgress';
// core components
import GridItem from "../ReportDashboard/components/Grid/GridItem";
import GridContainer from "../ReportDashboard/components/Grid/GridContainer";
import Card from "../ReportDashboard/components/Card/Card";
import CardHeader from "../ReportDashboard/components/Card/CardHeader";
import CardIcon from "../ReportDashboard/components/Card/CardIcon";
import CardBody from "../ReportDashboard/components/Card/CardBody";
import CardFooter from "../ReportDashboard/components/Card/CardFooter";
import Stepper from "./Stepper"

// circle 1
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TaskTableIcon from '@material-ui/icons/ListAlt';
import Button from '@material-ui/core/Button';

import { useHistory } from 'react-router-dom';


import styles from "../ReportDashboard/assets/jss/material-dashboard-react/views/dashboardStyle";

import PropTypes from 'prop-types';
// circle 2
import CircularIntermidiate from '../ReusableCompnents/CircularIntermidiate';
import LineChart from './LineChart'
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../socketIoBase';

import Timeline from '../ReusableCompnents/Timeline';

var os = require('os-utils');

const useStyles = makeStyles(styles);


const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const Progress = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState('0');
  const [resIntervalID, setResIntervalID] = useState(null)
  const [sysres, setSysres] = useState({
    cpu: 0,
    memory: 0
  })
  const [progressState, setProgressState] = useState({
    progress: 0,
    estimated: 'calculating',
    count: 0,
    fps: 0,
  });

  if(resIntervalID == null){
    const resID = setInterval( ()=>{
      os.cpuUsage(function(v){
        setSysres({
          cpu: Math.round(v * 100 * 10) / 10,
          memory: 100 - Math.round((os.freememPercentage()) * 100 * 10) / 10
        })
    });
    }, 1000);
    setResIntervalID(resID)
    myConsole.log("resID is NULL")
  }

  function beauifyTime(time: string) {
    if (!time) return;
    const arr = time.split(':');
    return arr[0] + 'h ' + arr[1] + 'm ' + arr[2] + 's';
  }
  const gotoTaskTable = () => {
    history.push('/tasktable');
  };
  const getStatsForFace = () => {
  if (state === '3') {
      return (
        <div className="row mt-2 d-flex justify-content-center align-items-center">
          <div className="col-md-12 col-lg-12 ">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 text-center align-items-center">
                <div className="row d-flex align-items-center justify-content-center">
                  <h4 className="text-center mb-0 mr-4 p-0">
                    Extracting Faces
                  </h4>
                  <CircularProgress />
                </div>
                <div className="row d-flex align-items-center justify-content-center mt-3">
                <Chart
                  width={250}
                  height={120}
                  chartType="Gauge"
                  loader={<div>Loading Chart</div>}
                  data={
                    [
                    ['Label', 'Value'],
                    ['CPU', sysres.cpu],
                    ['Memory', sysres.memory]
                  ]}
                  options={{
                    redFrom: 90,
                    redTo: 100,
                    yellowFrom: 75,
                    yellowTo: 90,
                    minorTicks: 5,
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (state === '4') {
      return (
        <div className="row mt-2 d-flex justify-content-center align-items-center">
          <div className="col-md-12 col-lg-12 ">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 text-center align-items-center">
                <div className="row d-flex align-items-center justify-content-center">
                  <h4 className="text-center mb-0 mr-4 p-0">
                    Generating a report
                  </h4>
                  <CircularProgress />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  const statsBlock = () => {
    if (state == '6') {
      return (
        <div className="row mt-3 ml-0 d-flex align-items-center">
          <div className="col-md-12 col-lg-12 ml-0">
            <div className="row d-flex align-items-center justify-content-center ml-0">
              <h4 className="mr-4 mb-0">Processing Finished!</h4>
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
    } else if (state == '1') {
      return (
        <div className="row mt-3 d-flex align-items-center justify-content-center">
          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="row d-flex justify-content-center align-items-center">
              <h4 className="mr-4 mb-0 text-center align-self-center">
                Initializing model...
              </h4>
              <CircularIntermidiate />
            </div>
          </div>
        </div>
      );
    } else if (state == '2') {
      return (
        <div className="col-12 ml-0">
        <GridContainer >
          <GridItem xs={12} sm={12} md={12}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <HourglassEmptyIcon />
                </CardIcon>
                <p className={classes.cardCategory}>% Completed</p>
               <h3 className={classes.cardTitle}>{progressState.progress}%</h3>
              </CardHeader>
              <CardBody>
                <LinearProgress variant="determinate" value={progressState.progress} />
                </CardBody>
              <CardFooter stats>
                <div className={classes.stats}>
                <CheckCircleIcon />
                  This shows how how much processing is done.
                </div>
              </CardFooter>
            </Card>
          </GridItem>

        <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <SpeedIcon />
                </CardIcon>
                <p className={classes.cardCategory}>FPS</p>
                <h3 className={classes.cardTitle}>{Math.round((progressState.fps + Number.EPSILON) * 100) / 100}</h3>
              </CardHeader>
              <CardBody className="d-flex justify-content-center">
                <Chart
                  width={250}
                  height={120}
                  chartType="Gauge"
                  loader={<div>Loading Chart</div>}
                  data={
                    [
                    ['Label', 'Value'],
                    ['CPU', sysres.cpu],
                    ['Memory', sysres.memory]
                  ]}
                  options={{
                    redFrom: 90,
                    redTo: 100,
                    yellowFrom: 75,
                    yellowTo: 90,
                    minorTicks: 5,
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
              </CardBody>
              <CardFooter stats>
                <div className={classes.stats}>
                <SpeedIcon />
                  This shows the processing capabilities of your system.
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        <GridItem xs={11} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                <EmojiObjectsIcon />
                </CardIcon>
                <p className={classes.cardCategory}>No. of objects</p>
                <h3 className={classes.cardTitle}>
                {progressState.count}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <EmojiObjectsIcon />
                    Objects that are currently being tracked by the model.
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                <HourglassEmptyIcon />
                </CardIcon>
                <p className={classes.cardCategory}>ETC</p>
                <h3 className={classes.cardTitle}>{beauifyTime(progressState.estimated)}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <HourglassEmptyIcon />
                  This shows the estimated time to completetion.
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          </GridContainer>
      <LineChart fpsArray={props.progress.fpsArray} noOfObjsArray={props.progress.noOfObjsArray} />

          </GridItem>
        </GridContainer>
        </div>
      );
    } else if (state >= '2' && state < '5') {
      return (
        <>
          <div className="row ml-0 mt-3 d-flex justify-content-center">
            <div className="col-5 text-center">
              <h4>Tracking Finished</h4>
              <h5 className="text-center mt-2">
                Waiting for other processes to finish
              </h5>
            </div>
          </div>
          {getStatsForFace()}
        </>
      );
    } else {
      return <></>;
    }
  };
  useEffect(() => {
    if(props.state=='0')
      setState('6');
    else
      setState(props.state)

    setProgressState(props.progress);
  });
  return (
    <>
      <section id="header" className="d-flex align-items-top home-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Stepper state = {state} />
              <div className="row">
                <div className="col-lg-12 col-md-12 col-xl-12">
                <Card>
              <div className="row">
                <div className="col-8">
                <h3 className={classes.cardTitle + ' ml-4 mt-4'}>Progress Overview</h3>
                <p className={classes.cardCategory+ ' ml-4 mt-2 pt-0'}>Please wait while the video is being processed.</p>
                </div>
                </div>
              <CardFooter stats>
                <div className={classes.stats} >
                  <VideocamIcon />
                  <div style={{
                    whiteSpace: 'nowrap',
                    width: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                  {props.videoFilePath == null
                    ? 'Unknown'
                    : props.videoFilePath.split('\\').pop().split('/').pop()}
                    </div>
                </div>
              </CardFooter>
              <CardBody className="pb-5">
              {statsBlock()}
              </CardBody>
              </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Progress;
