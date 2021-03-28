/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
/* eslint-disable promise/always-return */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ViewModule from '@material-ui/icons/ViewModule';
import FaceIcon from '@material-ui/icons/Face';
// API
import { getTop5TableData } from '../API';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(
  videoname: string,
  createdAt: string,
  videolength: number,
  numberobjects: number,
  timetaken: number,
  id: number
) {
  return { videoname, createdAt, videolength, numberobjects, timetaken, id };
}

/* const rows = [
  createData('video0.mp4', 159, 6, 24),
  createData('video1.mp4', 237, 9, 37),
  createData('video2.mp4', 262, 16, 24),
  createData('video3.mp4', 305, 3, 67),
]; */

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const history = useHistory();

  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const gotoDetection = (id) => {
    history.push('/detections/' + id);
  };
  const gotoFaceMatching = (row) => {
    props.setSelectedRowInTable(row);
    history.push('/face-match/' + row.id);
  };
  const gotoReport = (id) => {
    history.push('/report/' + id);
  };
  const fetchData = () => {
    getTop5TableData()
      .then((data) => {
        const newRows = [];
        data.tasks.forEach((task) => {
          // myConsole.log('task', task);
          newRows.push(
            createData(
              task.filePath.split('\\').pop().split('/').pop(),
              task.startTime,
              task.videoLength,
              task.totalObjects,
              task.timeTaken,
              task.id
            )
          );
        });
        setRows(newRows);
      })
      .catch((err) => {
        myConsole.log(err.response);
      });
  };
  useEffect(() => {
    fetchData();
  }, [classes]);
  function beauifyTime(time) {
    if (!time) return;
    const arr = time.split(':');
    return arr[0] + 'h ' + arr[1] + 'm ' + arr[2].split('.')[0] + 's';
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label=" customized table" className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Video Name</StyledTableCell>
            <StyledTableCell align="center">Created At</StyledTableCell>
            <StyledTableCell align="center">Video Length</StyledTableCell>
            <StyledTableCell align="center">Total Objects</StyledTableCell>
            <StyledTableCell align="center">Time Taken</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              className={row.timetaken ? '' : 'bg-dark'}
              key={row.videoname}
            >
              <StyledTableCell component="th" scope="row">
                <div
                  className={row.timetaken ? 'mb-0 p-0' : 'mb-0 p-0 inthedark'}
                  style={{
                    whiteSpace: 'nowrap',
                    width: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.videoname}
                </div>
              </StyledTableCell>

              <StyledTableCell align="center">
                <div className={row.timetaken ? '' : ' p-0 inthedark'}>
                  {beauifyTime(row.createdAt)}
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div>{beauifyTime(row.videolength)}</div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div>{row.numberobjects}</div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div>{beauifyTime(row.timetaken)}</div>
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.timetaken ? (
                  <>
                    <IconButton
                      onClick={() => {
                        gotoDetection(row.id);
                      }}
                      color="primary"
                      aria-label="open"
                    >
                      <ViewModule />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        gotoFaceMatching(row);
                      }}
                      color="primary"
                      aria-label="open"
                    >
                      <FaceIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        gotoReport(row.id);
                      }}
                      color="primary"
                      aria-label="report"
                    >
                      <AssessmentIcon />
                    </IconButton>
                  </>
                ) : (
                  <></>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
