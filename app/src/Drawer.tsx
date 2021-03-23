/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prefer-template */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import animation from './images/ripple.svg';
import { bindActionCreators } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
// not working
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// for routing
import { Switch, Route, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// for drawer design
import clsx from 'clsx';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SaveIcon from '@material-ui/icons/Save';

// nav icons
import AnalyzeIcon from '@material-ui/icons/HomeRounded';
import ListAltIcon from '@material-ui/icons/ListAltRounded';
import SettingIcon from '@material-ui/icons/SettingsApplicationsRounded';
import DefaultIcon from '@material-ui/icons/ReorderRounded';
import socket from './socketIoBase';
import logo1 from './images/deep.png';

// main components
import Analyze from './Analyze/Analyze';
import TaskTable from './TaskTable/TaskTable';
import Progress from './Progress';
import Settings from './Settings/Settings';
import Detections from './Detections/Detections';
import Faces from './Detections/Faces';
import Report from './ReportDashboard/Report';
import LiveTracker from './LiveTracker/LiveTracker';

import updateStateAction from './redux/actions/updateStateActions';
import updateProgressAction from './redux/actions/updateProgressActions';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
// custom styles
const drawerWidth = 190;
const themeColor = '#394457';
const dividerTheme = '#232e43';
const chevron = '#ffffff';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: themeColor,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 30,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(5) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);
const useStyles2 = makeStyles((theme) => ({
  appBar: {
    backgroundColor: themeColor,
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles3 = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const MiniDrawer = (props) => {
  // 0 state means noting has happened
  // 1 state means initializing model
  // 2 state means started processing
  // 3 state means face extraction
  // 4 state means report started
  // 5 state means processing finished

  const [state, setState] = useState('0');

  const [progress, setProgress] = useState({
    progress: '0',
    estimated: 'unknown',
    count: '0',
  });

  const [videoFilePath, setVideoFilePath] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  // ALERT STARTS HERE
  const classes3 = useStyles3();
  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  // Alert Sucess starts here
  const [openSucess, setOpenSucess] = React.useState(false);
  const openAlertSucess = () => {
    setOpenSucess(true);
  };
  const closeAlertSucess = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSucess(false);
  };

  // Alert Error starts here
  const [openError, setOpenError] = React.useState(false);
  const openAlertError = () => {
    setOpenError(true);
  };
  const closeAlertError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  // Alert info starts here
  const [openInfo, setOpenInfo] = React.useState(false);
  const openAlertInfo = () => {
    setOpenInfo(true);
  };
  const closeAlertInfo = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenInfo(false);
  };
  // ALERT END HERE

  const classes = useStyles();
  const classes2 = useStyles2();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const getIcon = (name: string) => {
    switch (name) {
      case 'Task Table': {
        return <ListAltIcon />;
      }
      case 'Analyze': {
        return <AnalyzeIcon />;
      }
      default: {
        return <DefaultIcon />;
      }
    }
  };

  const getRoutes = (name: string): string => {
    switch (name) {
      case 'Task Table': {
        return '/tasktable';
      }
      case 'Analyze': {
        return '/';
      }
      default: {
        return '/';
      }
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const beginProcessing = (videoFilePath, inputState) => {
    socket.emit(
      'processing-requested',
      {
        filepath: videoFilePath,
        config: inputState,
      },
      () => {
        myConsole.log('Started from Drawer');
        openAlertInfo();
      }
    );
  };
  useEffect(() => {
    // Anything in here is fired on component mount.
    socket.on('processing-requested');
    socket.on('halt-requested');
    socket.on('initialization-start', () => {
      setState('1');
      closeAlertInfo();
      openAlertSucess();
    });
    socket.on('work-start', () => {
      setState('2');
    });
    socket.on('work-progress', (data) => {
      setProgress({
        progress: data.progress,
        estimated: data.estimated,
        count: data.count,
      });
    });

    socket.on('face-extraction-started', () => {
      setState('3');
    });

    socket.on('report-started', () => {
      setState('4');
    });
    socket.on('work-end', () => {
      setIsDisabled(false);
      setState('0');
      setProgress({ progress: '0', estimated: 'unknown', count: '0' });
      //props.actions.updateStateAction('0');
    });
    return () => {
      // Anything in here is fired on component unmount.
      socket.off('processing-requested');
      socket.off('initialization-start');
      socket.off('halt-requested');
      socket.off('face-extraction-started');
      socket.off('work-start');
      socket.off('work-end');
    };
  }, [state]);
  const haltProcessing = () => {
    socket.emit('halt-requested', () => {
      // props.actions.updateStateAction('0');
      setState('0');
      setIsDisabled(false);
      setProgress({ progress: '0', estimated: 'unknown', count: '0' });
      myConsole.log('process halted!');
    });
  };
  return (
    <div className={classes.root}>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img
            style={{
              marginTop: '4px',
              marginBottom: '4px',
              height: '50px',
              borderRadius: '10px',
            }}
            src={logo1}
            alt="icon"
          />

          <div
            style={{ marginLeft: 'auto' }}
            className="text-center d-flex justify-content-center align-items-center"
          >
            {state !== '0' ? (
              <img className="icon-sm mr-1" src={animation} />
            ) : (
              ''
            )}
            <h6 className="text-sm mb-0 mr-5">
              {state === '1' ? 'Initializing' : ''}
              {state === '2' ? progress.progress + '% done' : ''}
              {state === '3' ? 'Extracting Faces' : ''}
              {state === '4' ? 'Generating Report' : ''}
            </h6>
            <Typography variant="h6" noWrap>
              v1-beta
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <ListItem
            className="text-center ml-2"
            style={{
              textDecoration: 'none',
              color: 'grey',
            }}
          >
            <ListItemText primary="Menu" />
          </ListItem>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Analyze', 'Task Table'].map((text, index) => (
            <NavLink
              style={{
                textDecoration: 'none',
                color: 'grey',
              }}
              to={getRoutes(text)}
              key={text}
            >
              <ListItem
                button
                key={text}
                style={{
                  paddingLeft: '15px',
                  paddingRight: '-7',
                }}
              >
                <ListItemIcon>{getIcon(text)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            onClick={handleClickOpen2}
            button
            style={{
              textDecoration: 'none',
              color: 'grey',
              paddingLeft: '15px',
              paddingRight: '-7',
            }}
          >
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <div>
        <Dialog
          fullScreen
          open={open2}
          onClose={handleClose2}
          TransitionComponent={Transition}
        >
          <AppBar className={classes2.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose2}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes2.title}>
                Settings
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="save"
                onClick={handleClose2}
              >
                <SaveIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Settings />
        </Dialog>
      </div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Analyze
                videoFilePath={videoFilePath}
                setVideoFilePath={setVideoFilePath}
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                openAlertError={openAlertError}
                beginProcessing={beginProcessing}
                haltProcessing={haltProcessing}
                state={state}
              />
            )}
          />
          <Route exact path="/tasktable" component={TaskTable} />
          <Route
            exact
            path="/progress"
            render={() => (
              <Progress
                videoFilePath={videoFilePath}
                state={state}
                progress={progress}
              />
            )}
          />
          <Route exact path="/detections/:taskId" component={Detections} />
          <Route exact path="/faces/:taskId" component={Faces} />
          <Route exact path="/report/:taskId" component={Report} />
          <Route exact path="/track/:taskId/:trackId" component={LiveTracker} />
        </Switch>
        <div className={classes3.root}>
          <Snackbar
            open={openSucess}
            autoHideDuration={6000}
            onClose={closeAlertSucess}
          >
            <Alert onClose={closeAlertSucess} severity="success">
              Processing Started Successfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openError}
            autoHideDuration={3000}
            onClose={closeAlertError}
          >
            <Alert onClose={closeAlertError} severity="error">
              Failed to start processing!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openInfo}
            autoHideDuration={6000}
            onClose={closeAlertInfo}
          >
            <Alert onClose={closeAlertInfo} severity="info">
              Please wait while the system is processing...
            </Alert>
          </Snackbar>
        </div>
      </main>
    </div>
  );
};

export default MiniDrawer;
