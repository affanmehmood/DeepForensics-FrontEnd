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
import { ProgressBar } from 'react-bootstrap';
import Player from './Player';
import votsrc from '../images/vot2.png';
import './VOTFront.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { statTrackingFile, getProgress, stopProcess, getFrames } from '../API';

var TimerMixin = require('react-timer-mixin');
const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

export default function VotFront(): JSX.Element {
  const [modelState, setModelState] = useState({
    isProcessing: false,
    hasProcessedPreviously: false,
    currentlyTracking: 0,
    timeRemaining: null,
    percentageDone: 0,
    inputPath: null,
    outputPath: 'outputs/',
  });
  const [videoFilePath, setVideoFilePath] = useState({
    path: 'No file selected',
    isNotEmpty: false,
    phase1: false,
    phase2Done: false,
  });
  const [intervalProcess, setIntervalProcess] = useState();

  // eslint-disable-next-line
  const handleVideoUpload = () => {
    const path = document.getElementById('myFile').files[0].path;
    setVideoFilePath({
      path,
      isNotEmpty: true,
      phase1: false,
      phase2Done: false,
    });
  };
  const getProgressFromApi = () => {
    getProgress().then((res) => {
      setModelState(res);
    });
  };

  useEffect(() => {
    if (modelState.percentageDone == 100) {
      setVideoFilePath((preVal) => {
        return {
          ...preVal,
          path: 'No file selected',
          isNotEmpty: false,
          phase1: false,
          phase2Done: true,
        };
      });
      TimerMixin.clearTimeout(intervalProcess);
      document.getElementById('cframe').src = votsrc;
    } else if (modelState.isProcessing && modelState.percentageDone > 1) {
      getFrames().then((frame) => {
        document.getElementById('cframe').src =
          'data:image/jpeg;base64,' + frame.ImageBytes;
      });
    }
  }, [modelState.percentageDone]);

  const setFilePath = () => {
    statTrackingFile(videoFilePath).then((res) => {
      myConsole.log('RESPOSNSE ', res);
      if (res) {
        const interval = TimerMixin.setInterval(getProgressFromApi, 1000);
        setIntervalProcess(interval);

        setVideoFilePath((preVal) => {
          return {
            ...preVal,
            phase1: true,
          };
        });
      }
    });
  };
  const stopProcessing = () => {
    stopProcess().then(() => {
      myConsole.log(intervalProcess);
      TimerMixin.clearTimeout(intervalProcess);
    });
    setVideoFilePath({
      path: 'No file selected',
      isNotEmpty: false,
      phase1: false,
      phase2Done: false,
    });
    setModelState({
      isProcessing: false,
      hasProcessedPreviously: false,
      currentlyTracking: 0,
      timeRemaining: null,
      percentageDone: 0,
      inputPath: null,
      outputPath: 'outputs/',
    });
  };
  const pickerBlock = () => {
    if (videoFilePath.phase1) {
      return (
        <div className="row mb-4 border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <h6 className="text-center">
                {videoFilePath.path.replace(/^.*[\\\/]/, '')}
              </h6>
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
    } else {
      return (
        <div className="row mb-4 border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <form>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="myFile"
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                  <label className="custom-file-label">Choose file</label>
                </div>
                <h6 className="text-center">
                  {videoFilePath.path.replace(/^.*[\\\/]/, '')}
                </h6>
              </form>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <button
                onClick={setFilePath}
                type="button"
                className="btn btn-primary btn-lg"
                style={{
                  paddingLeft: '50px',
                  paddingRight: '50px',
                }}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      );
    }
  };
  const statsBlock = () => {
    if (
      !modelState.isProcessing &&
      !videoFilePath.phase1 &&
      !videoFilePath.phase2Done
    ) {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <h6>No Stats to show</h6>
            </div>
          </div>
        </div>
      );
    } else if (!modelState.isProcessing && videoFilePath.phase1) {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <h6>Processing...</h6>
            </div>
          </div>
        </div>
      );
    } else if (!modelState.isProcessing && videoFilePath.phase2Done) {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <h6>Processing Done</h6>
            </div>
          </div>
        </div>
      );
    } else if (modelState.isProcessing) {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <ProgressBar
                style={{
                  padding: 0,
                }}
                className="col-md-12 col-lg-12 border-dark"
                animated
                now={modelState.percentageDone}
                label={`${modelState.percentageDone}%`}
              />
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="row pr-4 pl-4">
              <h6>
                EST:
                {modelState.timeRemaining}
              </h6>
            </div>
            <div className="row pr-4 pl-4 pb-4">
              <h6>
                No. of objects tracking:
                {modelState.currentlyTracking}
              </h6>
            </div>
          </div>
        </div>
      );
    }
    return <></>;
  };
  return (
    <>
      <section id="header" className="d-flex align-items-center home-section">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        />
        <div className="container-fluid ">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div
                  id="framecont"
                  className="votIconDiv col-md-8 col-lg-8 pt-lg-0 order-2 order-lg-1 d-flex align-items-center justify-content-center flex-column"
                >
                  <img
                    src={modelState.isProcessing ? null : votsrc}
                    style={{ width: '100%', height: '100%' }}
                    id="cframe"
                  />
                </div>
                <div className="col-lg-4 col-md-4 order-1 order-lg-2 header-img d-flex align-items-center justify-content-center">
                  <div className="col-md-12 col-lg-12">
                    {pickerBlock()}
                    {statsBlock()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
