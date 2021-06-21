/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const getTableData = async () => {
  var data = null;
  await axios.get('http://127.0.0.1:5000/get-tasks').then((res) => {
    // myConsole.log(res.data);
    data = res.data;
  });
  return data;
};
const getTop5TableData = async () => {
  var data = null;
  await axios.get('http://127.0.0.1:5000/get-tasks?top5=true').then((res) => {
    // myConsole.log(res.data);
    data = res.data;
  });
  return data;
};
const getDetections = async (taskId: number) => {
  var data = null;
  await axios
    .get('http://127.0.0.1:5000/get-detections?taskId=' + taskId.toString())
    .then((res) => {
      // myConsole.log(res.detections);
      data = res.data;
    });
  return data;
};
const getFaces = async (taskId: number) => {
  var data = null;
  await axios
    .get('http://127.0.0.1:5000/get-faces?taskId=' + taskId.toString())
    .then((res) => {
      // myConsole.log(res.detections);
      data = res.data;
    });
  return data;
};
const getReport = async (taskId: number) => {
  var data = null;
  await axios
    .get('http://127.0.0.1:5000/generate-report?taskId=' + taskId.toString())
    .then((res) => {
      // myConsole.log(res.detections);
      data = res.data.res;
    });
  return data;
};
const getFaceMatchingResults = async (taskId: number) => {
  var data = null;
  await axios
    .get('http://127.0.0.1:5000/matching-list?taskId=' + taskId.toString())
    .then((res) => {
      data = res.data.matchings;
    });
  return data;
};
const updateRemark = async (matchingID: number, remark: string) =>{
  axios.get('http://127.0.0.1:5000/update-remark?matchingId='+  matchingID.toString() +'&remark=' + remark)

}
// eslint-disable-next-line import/prefer-default-export
export {
  getTableData,
  getDetections,
  getFaces,
  getReport,
  getTop5TableData,
  getFaceMatchingResults,
  updateRemark,
};
