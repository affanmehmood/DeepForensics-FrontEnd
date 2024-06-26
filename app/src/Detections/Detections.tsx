/* eslint-disable promise/always-return */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-key */
/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapse from '@material-ui/core/Collapse';
import Grow from '@material-ui/core/Grow';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import { getDetections } from '../API';
import LiveTracker from '../LiveTracker/LiveTrackerDialoge'
import CircularIntermidiate from '../ReusableCompnents/CircularIntermidiate';
import socket from '../socketIoBase';

import optionsHard from '../ReusableCompnents/classes';

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
  }),

);

export default function Detections(): JSX.Element {
  const [options, setOptions] = useState(['All']);
  const history = useHistory();
  const classes = useStyles();
  const { taskId } = useParams();
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [detectionData, setDetectionData] = useState([]);
  const [noneState, setNoneState] = useState(false);

  const [trackingID, setTrackingID] = useState(-1)
  const [openLTdialog, setOpenLTdialog] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('md');
  const handleClickOpenLTdialog = () => {
    setOpenLTdialog(true);
  };

  const handleClickCloseLTdialog = () => {
    setOpenLTdialog(false);
  };
  useEffect(() => {
    // Anything in here is fired on component mount.

    // get detection data
    getDetections(taskId)
      .then((data) => {
        setDetectionData(data.detections);
        if (data.detections.length === 0) setNoneState(true);
        const tempArr = ['All'];
        data.detections.forEach((detection) => {
          if (!tempArr.includes(detection.class)) tempArr.push(detection.class);
        });
        setOptions(tempArr);
      })
      .catch((err) => {
        myConsole.log(err.response);
      });
  }, []);
  function getNoneMsg() {
    if (noneState) {
      return (
        <>
          <div className="row mt-5 ml-0 mr-0 p-0 d-flex justify-content-center align-items-center">
            <h4 className="mr-4 mb-0 text-center align-self-center">
              No Objects Detected
            </h4>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
  function extractFaces() {
    history.push('/faces/' + taskId);
  }

  const openTracker = (trackId) => {
    // history.push('/track/' + taskId + '/' + trackId);
    setTrackingID(trackId)
    handleClickOpenLTdialog()
   };
  return (
    <>
      <section id="header" className="d-flex home-section">
        <div className="container-fluid">
          <Collapse in>
            <div className="row">
              <div className="col-12">
                <div className="row ml-0">
                  <h3>Object Detections</h3>
                </div>
                <div className="row ml-0 mt-3">
                  <div className="col-6 d-flex align-items-center">
                    <h5>Check out all the results!</h5>
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    <Button
                      onClick={extractFaces}
                      variant="outlined"
                      color="default"
                      className={classes.button}
                      endIcon={<FaceIcon />}
                    >
                      Show All Faces
                    </Button>
                  </div>
                </div>
                <div className="row ml-0 mt-4">
                  <Autocomplete
                    value={value}
                    onChange={(event: any, newValue: string | null) => {
                      setValue(newValue);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Filter"
                        variant="outlined"
                      />
                    )}
                  />
                </div>

      <div className="container-fluid mb-5 mt-3">
          {getNoneMsg()}
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="row">
                    {detectionData.filter((detection) => {
                        if (value === 'All' || value === null) return true;
                        return detection.class === value;
                      })
                      .map((val, ind) => {
                        return (
                          <Grow
                            in
                            style={{ transformOrigin: '0 0 0' }}
                            {...{
                              timeout: (200 * ind) / (detectionData.length / 3),
                            }}
                          >
                            <div
                              className="col-2 d-inline-block m-0 p-0 border rounded mb-3"
                              style={{ backgroundColor: '#394457' }}
                            >
                              <div className="box one">
                                <img className= "img-flex"

                                 alt="i" src={val.filePath} />
                              </div>
                              <div className="bottom-div row m-0 d-flex justify-content-center">
                                <h6 className="sub-text text-sm m-0 ">
                                  {Math.round(100 * val.score) + '% '}
                                  confident {' ' + val.class}
                                </h6>
                                <button
                                  onClick={() => {
                                    openTracker(val.id);
                                  }}
                                  className="button m-0"
                                  style={{ verticalAlign: 'middle' }}
                                >
                                  <span>live tracking</span>
                                </button>
                              </div>
                            </div>
                            </Grow>
                        )
                      })}
                      </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openLTdialog}
            onClose={handleClickCloseLTdialog}>
            <LiveTracker taskId = {taskId} trackId = {trackingID}/>
          </Dialog>
        </div>
      </section>
    </>
  );
}
