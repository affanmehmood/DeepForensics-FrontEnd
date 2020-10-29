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
const getFrames = async () => {
  var data = null;
  await axios({
    method: 'GET',
    url: `http://127.0.0.1:5000/up-frame`,
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => {
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
const getFString = async () => {
  var data = null;
  axios.get('http://127.0.0.1:5000/newframe').then((res) => {
    data = res.data;
  });
  return data;
};
// eslint-disable-next-line import/prefer-default-export
export { statTrackingFile, getProgress, stopProcess, getFrames, getFString };
