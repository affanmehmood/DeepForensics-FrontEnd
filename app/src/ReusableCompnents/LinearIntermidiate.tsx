import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: '35px',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '4px',
      paddingRight: '4px',
    },
  })
);

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
}
