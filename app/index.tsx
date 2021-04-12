import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { history, configuredStore } from './store';
import './app.global.css';
import * as path from 'path';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const store = configuredStore();
const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

const script = path.join( 'server', 'run_flask', 'run_flask.exe');
myConsole.log('script exe path', script)

 const pyProc = require('child_process').execFile(script, (error, stdout, stderr) => {
  if (error) {
    myConsole.log("error ", error)
    throw error;
  }
  myConsole.log(stdout);
});


document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
});
