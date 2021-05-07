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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import CircularIntermidiate from '../ReusableCompnents/CircularIntermidiate';
import socket from '../socketIoBase';
import ViewFaceMatchingResults from '../FaceMatching/ViewFaceMatchingResults'
import { getFaces } from '../API';
import Timeline from '../ReusableCompnents/Timeline';
import options from '../ReusableCompnents/classes';

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

export default function Faces(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const { taskId } = useParams();
  const [facesData, setFacesData] = useState([]);
  const [noneState, setNoneState] = useState(false);

  useEffect(() => {
    // get faces data
    getFaces(taskId)
      .then((data) => {
        setFacesData(data.faces);
        if (data.faces.length === 0) setNoneState(true);
      })
      .catch((err) => {
        myConsole.log(err.response);
      });
  }, []);
  function getNoneMsg() {
    if (noneState) {
      return (
        <div className="row mt-5 ml-0 mr-0 p-0 d-flex justify-content-center align-items-center">
          <h4 className="mr-4 mb-0 text-center align-self-center">
            No Faces Detected
          </h4>
        </div>
      );
    } else {
      return <></>;
    }
  }
  function goBack() {
    history.push('/detections/' + taskId);
  }
  const gotoTracker = (trackId) => {
    history.push('/track/' + taskId + '/' + trackId);
  };
  return (
    <>
      <section id="header" className="d-flex home-section">
        <div className="container-fluid">
          <Collapse in>
            <div className="row">
              <div className="col-12">
                <div className="row ml-0">
                  <Button
                    onClick={goBack}
                    variant="outlined"
                    color="default"
                    className={classes.button}
                  >
                    Back
                  </Button>
                </div>
                <div className="row ml-0 mt-3">
                  <div className="col-6 d-flex align-items-center">
                    <h5>Check out all the faces!</h5>
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    <Button
                      variant="outlined"
                      color="default"
                      className={classes.button}
                    >
                      Open Saved Folder
                    </Button>
                  </div>
                </div>
        <div className="container-fluid mb-5">
          {getNoneMsg()}
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="row">
                    {facesData
                      .map((val, ind) => {
                        return (
                          <Grow
                            in
                            style={{ transformOrigin: '0 0 0' }}
                            {...{
                              timeout: (200 * ind) / (facesData.length / 3),
                            }}
                          >
                            <div
                              className="col-2 d-inline-block m-0 p-0 border rounded mb-3"
                              style={{ backgroundColor: '#394457' }}
                            >
                              <div className="box one">
                                <img className="img-flex" alt="i" src={val.filePath} />
                              </div>
                              <div className="bottom-div row m-0 d-flex justify-content-center">
                                <h6 className="sub-text text-sm m-0 ">
                                  {Math.round(100 * val.score) + '% '}
                                  confident
                                </h6>
                                <button
                                  onClick={() => {
                                    gotoTracker(val.id);
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
                      <div className="col-12 mt-4">
                        <ViewFaceMatchingResults taskId={taskId}/>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </section>
    </>
  );
}
