/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
/* eslint-disable promise/always-return */
import React, { useState, useEffect } from 'react';
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

// API
import { getTableData } from '../API';

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
  videolength: number,
  numberobjects: number,
  timetaken: number
) {
  return { videoname, videolength, numberobjects, timetaken };
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

export default function CustomizedTables() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  const fetchData = () => {
    getTableData()
      .then((data) => {
        const newRows = [];
        data.tasks.forEach((task) => {
          // myConsole.log('task', task);
          newRows.push(
            createData(
              task.filePath.split('\\').pop().split('/').pop(),
              task.videoLength,
              task.totalObjects,
              task.timeTaken
            )
          );
        });
        setRows(newRows);
      })
      .catch((err) => {
        myConsole.log(err);
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
            <StyledTableCell align="right">Video Length</StyledTableCell>
            <StyledTableCell align="right">Total Objects</StyledTableCell>
            <StyledTableCell align="right">Time Taken</StyledTableCell>
            <StyledTableCell align="right">Open Report</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.videoname}>
              <StyledTableCell component="th" scope="row">
                {row.videoname}
              </StyledTableCell>
              <StyledTableCell align="right">
                {beauifyTime(row.videolength)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.numberobjects}
              </StyledTableCell>
              <StyledTableCell align="right">
                {beauifyTime(row.timetaken)}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="outlined" color="primary">
                  Open
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
