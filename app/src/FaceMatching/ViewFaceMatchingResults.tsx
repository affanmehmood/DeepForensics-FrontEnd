/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-indent */
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
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import LiveTracker from '../LiveTracker/LiveTrackerDialoge'
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import socket from '../socketIoBase';
import DvrIcon from '@material-ui/icons/Dvr';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { getFaceMatchingResults } from '../API';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ListItemText from '@material-ui/core/ListItemText';
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
    button: {
      margin: theme.spacing(1),
    },
    input: {
      width: '75%',
      marginLeft: theme.spacing(1),
      flex: 2,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    }
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
  const [readOnlyState, setReadOnlyState] = useState(true)
  const [remark, setRemark ] = useState('')
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
    // get match data
    getFaceMatchingResults(taskId)
      .then((data) => {
        if(data.length === 0){
         setNoneState(true)}
        else{
          myConsole.log("DATA", data)
          setMatchData(data)}
      })
  }, []);
  function getNoneMsg() {
    if (noneState) {
      return (
        <div className="row mt-4 ml-0 mr-0 p-0">
          <h5 className="mb-0">
            No faces matched yet

          </h5>
        </div>
      );
    } else {
      return <></>;
    }
  }

  const openTracker = (trackId) => {
    // history.push('/track/' + taskId + '/' + trackId);
    setTrackingID(trackId)
    handleClickOpenLTdialog()
   };

  const shuffleReadWriteRemarks = (value) => {
    setReadOnlyState(value)
  }
  const updateRemark = (value)=>{
    setRemark(value.target.value)
  }
  const saveUpdatedRemark=()=>{
    myConsole.log(remark)
  }
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
                          <h3 className={classes2.cardTitle + ' mt-4'}>Face Matching History</h3>
                          <p className={classes2.cardCategory+ ' mt-2 pt-0'}>All the previously matched faces.</p>
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
                                  <h4 className={classes2.cardTitle + ' ml-4 mt-3'}>Match #{ind+1}</h4>
                                  <CardBody className="pb-1">
                                    <div className="row">
                                      <div className="col-12">
                                        <div className="row">
                                        <h5 className={classes2.cardTitle + ' ml-4 mt-2 mb-2'}>Known Images</h5>
                                        </div>
                                        <div className="row ml-2">
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
                                          <h5 className={classes2.cardTitle + ' ml-4 mt-2 mb-2'}>Faces matched in the video</h5>
                                        </div>
                                        <div className="row ml-2">
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
                                                          openTracker(match.id);
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
                                        {val.matching.length===0 ? (<div className="row mt-3 ml-0 mr-0 p-0">
                                            <h4 className="mb-0">
                                              No faces matched
                                            </h4>
                                          </div>
                                          ): (<></>)}
                                      </div>
                                    </div>
                                  </CardBody>

                                  <Paper className={classes.root +" col-5  ml-4"}>
                                    <DvrIcon />
                                    <TextField
                                      label="User Remark"
                                      defaultValue={val.remark}
                                      InputProps={{
                                        readOnly: readOnlyState,
                                      }}
                                      multiline
                                      variant="outlined"
                                      onChange={updateRemark}
                                    />
                                    {readOnlyState ? (<IconButton
                                      onClick={
                                      ()=>{
                                        shuffleReadWriteRemarks(false)
                                      }
                                    }
                                      color="primary"
                                      className={classes.iconButton}
                                      aria-label="edit">
                                      <EditIcon />
                                    </IconButton>) : <IconButton
                                      onClick={
                                        ()=>{
                                          shuffleReadWriteRemarks(true)
                                          saveUpdatedRemark()
                                        }
                                      }
                                      color="primary"
                                      className={classes.iconButton}
                                      aria-label="save">
                                      <CheckCircleIcon />
                                    </IconButton>}

                                  </Paper>
                                  <CardFooter stats>
                                    <div className={classes2.stats} >
                                      {val.matching.length} faces matched
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
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openLTdialog}
            onClose={handleClickCloseLTdialog}>
            <LiveTracker taskId = {taskId} trackId = {trackingID}/>
          </Dialog>
        </div>
    </>
  );
}
