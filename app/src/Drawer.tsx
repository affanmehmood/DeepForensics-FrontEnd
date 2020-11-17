/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

// not working
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// for routing
import { Switch, Route, NavLink } from 'react-router-dom';

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
import AnalyzeIcon from '@material-ui/icons/SearchRounded';
import ProgressIcon from '@material-ui/icons/AssessmentRounded';
import SettingIcon from '@material-ui/icons/SettingsApplicationsRounded';
import DefaultIcon from '@material-ui/icons/ReorderRounded';
import logo1 from './images/deep.png';

// main components
import Analyze from './Analyze/Analyze';
import Progress from './Progress';
import Footer from './ReusableCompnents/footer';
import Settings from './Settings/Settings';

// custom styles
const drawerWidth = 240;
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
      marginRight: 36,
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
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
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
export default function MiniDrawer() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const getIcon = (name: string) => {
    switch (name) {
      case 'Progress': {
        return <ProgressIcon />;
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
      case 'Progress': {
        return '/progress';
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
              height: '12%',
              width: '12%',
              borderRadius: '10px',
            }}
            src={logo1}
            alt="icon"
          />
          <Typography style={{ marginLeft: 'auto' }} variant="h6" noWrap>
            v1-beta
          </Typography>
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
            style={{ textDecoration: 'none', color: 'grey' }}
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
          {['Analyze', 'Progress'].map((text, index) => (
            <NavLink
              style={{ textDecoration: 'none', color: 'grey' }}
              to={getRoutes(text)}
              key={text}
            >
              <ListItem button key={text} style={{ paddingLeft: '23px' }}>
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
              paddingLeft: '23px',
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
          <Route exact path="/" component={Analyze} />
          <Route exact path="/progress" component={Progress} />
        </Switch>
        <Footer />
      </main>
    </div>
  );
}
