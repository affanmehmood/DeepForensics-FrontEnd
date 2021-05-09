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

export default function LiveTracker(props): JSX.Element {
  const [state, setState] = useState({
    url: null,
  });
  const { taskId, trackId } = props;
  const classes = useStyles();
  const history = useHistory();


  useEffect(() => {
        // Anything in here is fired on component mount.
        socket.emit('get-trackvideo', { trackId, taskId });
        socket.on('trackvideo-done', (data) => {
          setState(data.detections);
        });
  }, []);

  return (
    <>
      <section id="header" className="home-section  m-0 p-0 mt-2">
        <div className="container-fluid m-0 p-0">
          <div className="row m-0 p-0">
            <div className="col-lg-12 col-md-12 col-xl-12 ml-0">
              <div
                className="row justify-content-center  m-0 p-0 pt-3 pb-3"
              >
                {state.url ? (
                  <Player className="m-0 p-0" url={state.url} />
                ) : (
                  <div className="row justify-content-center pt-5 pb-5">
                    <h4 className="text-center align-self-center mr-3">
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
