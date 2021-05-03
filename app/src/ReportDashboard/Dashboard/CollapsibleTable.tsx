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
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useStore } from 'react-redux';

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

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
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
              <Typography variant="h6" gutterBottom component="div">
                Object Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Initial Time</TableCell>
                    <TableCell align="right">Final Time</TableCell>
                    <TableCell align="right">Confidence</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.objects.map((objectsRow) => (
                    <TableRow key={objectsRow.id}>
                      <TableCell component="th" scope="row">
                        {objectsRow.id}
                      </TableCell>
                      <TableCell>{objectsRow.initialTime}</TableCell>
                      <TableCell align="right">{objectsRow.finalTime}</TableCell>
                      <TableCell align="right">
                        {objectsRow.confidence}
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
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
