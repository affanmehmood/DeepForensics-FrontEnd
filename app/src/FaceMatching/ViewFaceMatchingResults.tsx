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
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import socket from '../socketIoBase';
import { getFaceMatchingResults } from '../API';
import Grow from '@material-ui/core/Grow';

import styles from "../ReportDashboard/assets/jss/material-dashboard-react/views/dashboardStyle";

// core components
import GridItem from "../ReportDashboard/components/Grid/GridItem";
import GridContainer from "../ReportDashboard/components/Grid/GridContainer";
import Card from "../ReportDashboard/components/Card/Card";
import CardHeader from "../ReportDashboard/components/Card/CardHeader";
import CardIcon from "../ReportDashboard/components/Card/CardIcon";
import CardBody from "../ReportDashboard/components/Card/CardBody";
import CardFooter from "../ReportDashboard/components/Card/CardFooter";

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
const useStyles2 = makeStyles(styles);


export default function Match(props): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const classes2 = useStyles2();

  const { taskId } = props;
  const [matchData, setMatchData] = useState([]);
  const [noneState, setNoneState] = useState(false);

  useEffect(() => {
    // get match data
    getFaceMatchingResults(taskId)
      .then((data) => {
        myConsole.log("face matching results", data)
        myConsole.log("matching", data[0].matching)
        if(data.length < 1)
         setNoneState(true)
        else
          setMatchData(data)
      })
  }, []);
  function getNoneMsg() {
    if (noneState) {
      return (
        <div className="row mt-5 ml-0 mr-0 p-0 d-flex justify-content-center align-items-center">
          <h4 className="mr-4 mb-0 text-center align-self-center">
            No faces matched yet
          </h4>
        </div>
      );
    } else {
      return <></>;
    }
  }
  const gotoTracker = (trackId) => {
    history.push('/track/' + taskId + '/' + trackId);
  };
  return (
    <>
        <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="container-fluid mb-5">
                  <div className="row">
                    <div className="col-12 mx-auto">
                      <div className="row">
                        <div className="col-8">
                          <h3 className={classes2.cardTitle + ' ml-4 mt-4'}>Face Matching History</h3>
                          <p className={classes2.cardCategory+ ' ml-4 mt-2 pt-0'}>All the previously matched faces.</p>
                          {getNoneMsg()}
                        </div>
                      </div>
                      <div className="row">
                      {matchData
                      .map((val, ind) => {
                        return (
                          <div className="row">
                              <div className="col-lg-12 col-md-12 col-xl-12">
                                <Card>
                                  <h5 className={classes2.cardTitle + ' ml-4 mt-3'}>Match #{ind+1}</h5>
                                  <CardBody className="pb-1">
                                    <div className="row">
                                      <div className="col-12">
                                        <div className="row">
                                        <h5 className={classes2.cardTitle + ' ml-2 mt-2 mb-2'}>Known Images</h5>
                                        </div>
                                        <div className="row ml-1">
                                        {val.known_paths
                                          .map((path, ind) => {
                                            return (
                                              <Grow
                                                in
                                                style={{ transformOrigin: '0 0 0' }}
                                                {...{
                                                  timeout: (200 * ind) / (val.known_paths.length / 3),
                                                }}
                                              >
                                                <div
                                                  className="col-2 d-inline-block m-0 p-0 border rounded mb-3"
                                                  style={{ backgroundColor: '#394457' }}
                                                >
                                                  <div className="box one">
                                                    <img className="img-flex" alt="i" src={path} />
                                                  </div>
                                                </div>
                                                </Grow>
                                            )
                                          })}</div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-12">
                                        <div className="row">
                                          <h5 className={classes2.cardTitle + ' ml-2 mt-4'}>Faces matched in the video</h5>
                                        </div>
                                        <div className="row ml-1">
                                          {val.matching
                                            .map((match, ind) => {
                                              return (
                                                <Grow
                                                  in
                                                  style={{ transformOrigin: '0 0 0' }}
                                                  {...{
                                                    timeout: (200 * ind) / (val.matching.length / 3),
                                                  }}
                                                >
                                                  <div
                                                    className="col-2 d-inline-block m-0 p-0 border rounded mb-3"
                                                    style={{ backgroundColor: '#394457' }}
                                                  >
                                                    <div className="box one">
                                                      <img className="img-flex" alt="i" src={match.path} />
                                                    </div>
                                                    <div className="bottom-div row m-0 d-flex justify-content-center">
                                                      <h6 className="sub-text text-sm m-0 ">
                                                        {'at ' + match.appears_at}
                                                      </h6>
                                                      <button
                                                        onClick={() => {
                                                          gotoTracker(match.id);
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
                                  </CardBody>
                                  <CardFooter stats>
                                    <div className={classes2.stats} >
                                      4 faces matched
                                    </div>
                                  </CardFooter>
                                </Card>
                              </div>
                          </div>
                        )
                      })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  );
}
