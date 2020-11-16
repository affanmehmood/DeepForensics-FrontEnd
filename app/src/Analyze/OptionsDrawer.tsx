/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Zoom from '@material-ui/core/Zoom';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Inputs from './Inputs';

// const themeColor = '#394457';
const useStyles = makeStyles(
  {
    list: {
      width: 300,
    },
    fullList: {
      width: 'auto',
    },
  },
  (theme: Theme) => {
    createStyles({
      button: {
        margin: theme.spacing(1),
        marginRight: '15px',
      },
    });
  }
);

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(-7),
    },
  })
);
type Anchor = 'right';

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Inputs />
    </div>
  );

  return (
    <div>
      {(['right'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="d-flex align-items-right justify-content-right float-right">
            <Tooltip
              TransitionComponent={Zoom}
              title="configure"
              aria-label="configure"
            >
              <Button
                style={{
                  position: 'fixed',
                  right: '0%',
                  top: '45%',
                  paddingTop: '60px',
                  paddingBottom: '60px',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                  backgroundColor: '#394457',
                  borderRadius: '4px',
                }}
                onClick={toggleDrawer(anchor, true)}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                <ArrowLeft style={{ color: 'white' }} />
              </Button>
            </Tooltip>
          </div>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
