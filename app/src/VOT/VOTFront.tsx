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
import votsrc from '../images/vot2.png';
import './VOTFront.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../socketIoBase';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

export default function VotFront(): JSX.Element {
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
    if (false) {
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
                    onChange={setFilePath}
                  />
                  <label className="custom-file-label">Choose file</label>
                </div>
                <h6 className="text-center">cars.mp3</h6>
              </form>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <button
                onClick={startProcessing}
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
    if (true) {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <h6>No Stats to show</h6>
            </div>
          </div>
        </div>
      );
    } else if (true) {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <h6>initializing model...</h6>
            </div>
          </div>
        </div>
      );
    } else if (true) {
      return (
        <div className="row border border-dark rounded-left">
          <div className="col-md-12 col-lg-12">
            <div className="row justify-content-center p-4">
              <h6>Processing Done</h6>
            </div>
          </div>
        </div>
      );
    } else if (true) {
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
                now={80}
                label="80%"
              />
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="row pr-4 pl-4">
              <h6>EST:24</h6>
            </div>
            <div className="row pr-4 pl-4 pb-4">
              <h6>No. of objects tracking: 8</h6>
            </div>
          </div>
        </div>
      );
    }
    return <></>;
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
    socket.on('work-progress', (data) => {
      myConsole.log('work-progress', data);
    });
    socket.on('work-end', () => {
      myConsole.log('work-end');
    });
    return () => {
      // Anything in here is fired on component unmount.
      socket.off('processing-requested');
      socket.off('initialization-start');
      socket.off('work-start');
      socket.off('work-progress');
      socket.off('work-end');
    };
  }, []);
  return (
    <>
      <section id="header" className="d-flex align-items-center home-section">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div
                  id="framecont"
                  className="votIconDiv col-md-8 col-lg-8 pt-lg-0 order-2 order-lg-1 d-flex align-items-center justify-content-center flex-column"
                >
                  <img
                    src={votsrc}
                    style={{ width: '100%', height: '100%' }}
                    id="cframe"
                  />
                </div>
                <div className="col-lg-4 col-md-4 order-1 order-lg-2 header-img d-flex align-items-center justify-content-center">
                  <div className="col-md-12 col-lg-12">{pickerBlock()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
