/* eslint-disable no-var */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const statTrackingFile = async (path: any) => {
  var data = null;
  await axios
    .post('http://127.0.0.1:5000/set-filepath', path)
    .then((response) => {
      data = response.data.msg;
    });
  return data;
};

const getProgress = async () => {
  var data = null;
  await axios.get('http://127.0.0.1:5000/status').then((res) => {
    // myConsole.log(res.data);
    data = res.data;
  });
  return data;
};

const stopProcess = async () => {
  var data = null;
  await axios.get('http://127.0.0.1:5000/finish-process').then((res) => {
    data = res.data.msg;
  });
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { statTrackingFile, getProgress, stopProcess };
