/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import CircularIntermidiate from '../ReusableCompnents/CircularIntermidiate';
import socket from '../socketIoBase';

import animation from '../images/magnify.svg';
import { getFaces } from '../Api';
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

export default function Faces(props): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const { taskId } = useParams();
  const [facesData, setFacesData] = useState([]);
  const [noneState, setNoneState] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [knownImagesPath, setKnownImagesPath] = useState([]);
  const [knownImages, setKnownImages] = useState([]);
  const [matchedImages, setMatchedImages] = useState([]);
  const [progressState, setProgressState] = useState({
    current: 0,
    total: 0,
  });
  const [state, setState] = useState('0');
  useEffect(() => {
    // Face Matching
    socket.on('no-input-faces', () => {
      setState('0');
      setIsRequested(false);
      myConsole.log('no input Face');
    });
    socket.on('face-matching-progress', (data) => {
      if (data.progress.imgDetails != null) {
        const tempArray = matchedImages;
        tempArray.push(data.progress.imgDetails);
        setMatchedImages(tempArray);

        myConsole.log(matchedImages);
      }
      setProgressState({
        current: data.progress.current,
        total: data.progress.total,
      });
    });
    socket.on('face-matching-done', () => {
      setState('0');
      if (matchedImages.length == 0) setNoneState(true);
      myConsole.log('Face Matching Done');
    });
    return () => {
      // Anything in here is fired on component unmount.
      socket.off('no-input-faces');
      socket.off('face-matching-progress');
      socket.off('face-matching-done');
    };
  }, [state]);
  function getInfoMsg() {
    if (knownImagesPath.length == 0) {
      return (
        <h6 className="mt-4">
          Select an Image of the person you want to find.
        </h6>
      );
    } else {
      return <></>;
    }
  }
  function getNoneMsg() {
    if (noneState) {
      return (
        <div className="row mt-2 ml-0">
          <h5>No Matches Found</h5>
        </div>
      );
    } else {
      return <></>;
    }
  }
  function goBack() {
    history.push('/');
  }
  const gotoTracker = (trackId) => {
    history.push('/track/' + taskId + '/' + trackId);
  };
  const resultBlock = () => {
    if (isRequested) {
      return (
        <>
          <div className="row ml-0">
            <h5>The faces that matched</h5>
          </div>
          {getNoneMsg()}
          <div className="column-container cols flex-i ">
            {matchedImages.map((val, ind) => {
              return (
                <Grow
                  in
                  style={{ transformOrigin: '0 0 0' }}
                  {...{
                    timeout: (200 * ind) / (matchedImages.length / 2),
                  }}
                >
                  <div
                    className="col d-inline-block m-0 p-0 border rounded mb-3"
                    style={{ backgroundColor: '#394457' }}
                  >
                    <div className="box one">
                      <img alt="i" src={val.path} />
                    </div>
                    <div className="bottom-div row m-0 d-flex justify-content-center">
                      <h6 className="sub-text text-sm m-0 ">
                        Id: {val.trackingId}
                      </h6>
                      <button
                        onClick={() => {
                          gotoTracker(val.trackingId);
                        }}
                        className="button m-0"
                        style={{ verticalAlign: 'middle' }}
                      >
                        <span>live tracking</span>
                      </button>
                    </div>
                  </div>
                </Grow>
              );
            })}
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };
  const loadingBlock = () => {
    if (state == '1') {
      return (
        <div className="row d-flex justify-content-center align-items-center">
          <h5 className="mr-4 mb-0 text-center align-self-center">
            Finding Matching Faces...
          </h5>
          <img alt="wait" className="icon-sm" src={animation} />
        </div>
      );
    } else {
      return <></>;
    }
  };
  const addFiles = (e) => {
    const paths: string[] = knownImagesPath;
    const fileArray = [];
    knownImages.forEach((image) => {
      fileArray.push(image);
    });

    document.getElementById('myFiles').files.forEach((file, i) => {
      if (!paths.includes(file.path)) {
        paths.push(file.path);
        fileArray.push(URL.createObjectURL(e.target.files[i]));
      }
    });

    setKnownImagesPath(paths);
    setKnownImages(fileArray);
  };
  const startMatching = () => {
    // props.setIsDisabled(true);
    try {
      if (knownImagesPath.length == 0) {
        props.openAlertError();
        return;
      }
      props.beginFaceMatching(knownImagesPath, taskId);
      setState('1');
      setIsRequested(true);
    } catch (error) {
      myConsole.log('error');
      // props.setIsDisabled(false);
      // props.props.openAlertError();
    }
  };

  return (
    <>
      <section id="header" className="d-flex home-section">
        <div className="container-fluid">
          <Collapse in>
            <div className="row">
              <div className="col-12">
                {/* <div className="row ml-0 mb-3">
                  <Button
                    onClick={goBack}
                    variant="outlined"
                    color="default"
                    className={classes.button}
                  >
                    Back
                  </Button>
                </div> */}
                <div className="row m-0 mt-5 d-flex justify-content-start">
                  {getInfoMsg()}
                  {knownImages.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      className="image-preview"
                      alt="known"
                    />
                  ))}
                </div>
                <div className="row m-0 mt-4 d-flex justify-content-start">
                  <div className={classes.root}>
                    <input
                      disabled={state > '0'}
                      accept="image/*"
                      className={classes.input}
                      id="myFiles"
                      type="file"
                      onChange={addFiles}
                      multiple
                    />
                    <label htmlFor="myFiles">
                      <Button
                        disabled={state > '0'}
                        aria-label="upload picture"
                        component="span"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddAPhotoIcon />}
                      >
                        Add Photo
                      </Button>
                    </label>
                  </div>
                </div>
                <div className="p-4 row ml-0 d-flex justify-content-center">
                  {knownImages.length > 0 ? (
                    <Button
                      disabled={state > '0'}
                      onClick={startMatching}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<PlayCircleOutline />}
                    >
                      Start Matching
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="row mt-1 justify-content-center">
                  {loadingBlock()}
                </div>
                <div className="row mt-1">
                  <div className="col-12">{resultBlock()}</div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </section>
    </>
  );
}
