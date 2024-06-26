import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import {useHistory } from 'react-router-dom';
import LiveTracker from '../../LiveTracker/LiveTrackerDialoge'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(
  name: string,
  average: string,
  max: string,
  min: string,
  total: number,
  objects: Array<any>
) {
  return {
    name,
    average,
    max,
    min,
    total,
    objects: objects
  };
}

function Row(props: { row: ReturnType<typeof createData>, openTracker: Function }) {
  const { row, openTracker } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell align="right">{row.average}</TableCell>
        <TableCell align="right">{row.min}</TableCell>
        <TableCell align="right">{row.max}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography style={{textTransform:"capitalize"}}  variant="h6" gutterBottom component="div">
                {row.name} Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Initial Time</TableCell>
                    <TableCell align="right">Final Time</TableCell>
                    <TableCell align="right">Confidence</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.objects.map((objectsRow) => (
                    <TableRow key={objectsRow.id}>
                      <TableCell component="th" scope="row">
                        {objectsRow.id}
                      </TableCell>
                      <TableCell align="right">{objectsRow.initialTime}</TableCell>
                      <TableCell align="right">{objectsRow.finalTime}</TableCell>
                      <TableCell align="right">
                        {objectsRow.confidence}
                      </TableCell>
                      <TableCell align="right">
                      <Tooltip title="Live Tracking">
                      <IconButton
                          onClick={() => {
                            openTracker(objectsRow.id);
                          }}
                          color="secondary"
                          aria-label="delete">
                          <TrackChangesIcon />
                        </IconButton>
                      </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

export default function CollapsibleTable(props) {
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
  const openTracker = (trackId) => {
    // history.push('/track/' + taskId + '/' + trackId);
    setTrackingID(trackId)
    handleClickOpenLTdialog()
   };
  const [rows, setRows] = useState([])
  useEffect(()=>{

    const newRows = []

    if(!props.tableData.labels)
      return
    props.tableData.labels.map((val)=>{
      newRows.push(createData(val, props.tableData.data[val].average, props.tableData.data[val].max, props.tableData.data[val].min, props.tableData.data[val].total, props.tableData.data[val].history))
    })
    setRows(newRows)
  }, [props])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Class</TableCell>
            <TableCell align="right">#&nbsp;Objs</TableCell>
            <TableCell align="right">Avg&nbsp;Duration</TableCell>
            <TableCell align="right">First Occurence Timestamp</TableCell>
            <TableCell align="right">Last Occurence Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} openTracker={openTracker}/>
          ))}
        </TableBody>
      </Table>
      <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openLTdialog}
            onClose={handleClickCloseLTdialog}>
            <LiveTracker taskId = {props.taskId} trackId = {trackingID}/>
      </Dialog>
    </TableContainer>
  );
}
