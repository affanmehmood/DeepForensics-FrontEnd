/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FolderOpen from '@material-ui/icons/FolderOpen';

const { dialog } = require('electron').remote;

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const SelectDirectory = () => {
  dialog.showOpenDialog({ properties: ['openDirectory'] }).then((dir) => {
    myConsole.log(dir.filePaths[0].toString());
  });
};

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

export default function UploadButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        onClick={SelectDirectory}
        variant="contained"
        color="default"
        component="span"
        className={classes.button}
        startIcon={<FolderOpen />}
      >
        Select Output Folder
      </Button>
    </div>
  );
}
