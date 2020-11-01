import React, { useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import votsrc from './images/vot2.png';

import socket from './socketIoBase';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

export default function Home(): JSX.Element {
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
    } else {
      return <></>;
    }
  };
  useEffect(() => {
    // Anything in here is fired on component mount.
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
