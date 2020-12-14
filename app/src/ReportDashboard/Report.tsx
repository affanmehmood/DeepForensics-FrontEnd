/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable promise/no-nesting */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable import/order */
/* eslint-disable no-else-return */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-template */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { UpdateRounded } from '@material-ui/icons';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Barchart from './Charts/Barchart';
import Donutchart from './Charts/Donut';

import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../socketIoBase';
import { getReport } from '../API';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
export default function TaskTable(): JSX.Element {
  const [chartData, setChartData] = useState({
    barcharts: {
      barChart1: {
        categories: ['1st half', '2nd half', '3rd half'],
        series: [
          {
            name: 'Cars',
            data: [],
          },
          {
            name: 'Motorbike',
            data: [],
          },
          {
            name: 'Truck',
            data: [],
          },
        ],
      },
      barChart2: {
        categories: ['1st half', '2nd half', '3rd half'],
        series: [
          {
            name: 'Cars',
            data: [],
          },
          {
            name: 'Motorbike',
            data: [],
          },
          {
            name: 'Truck',
            data: [],
          },
        ],
      },
      barChart3: {
        categories: ['1st half', '2nd half', '3rd half'],
        series: [
          {
            name: 'Person',
            data: [],
          },
          {
            name: 'Handbag',
            data: [],
          },
          {
            name: 'Person',
            data: [],
          },
          {
            name: 'Knife',
            data: [],
          },
        ],
      },
      barChart4: {
        categories: ['1st half', '2nd half', '3rd half'],
        series: [
          {
            name: 'Person',
            data: [],
          },
          {
            name: 'Handbag',
            data: [],
          },
          {
            name: 'Person',
            data: [],
          },
          {
            name: 'Knife',
            data: [],
          },
        ],
      },
    },
    donuts: {
      donut1: {
        labels: ['Cars', 'Motorbike', 'Truck'],
        series: [],
      },
      donut2: {
        labels: ['Cars', 'Motorbike', 'Truck'],
        series: [],
      },
      donut3: {
        labels: ['Person', 'Handbag', 'Backpack', 'Knife'],
        series: [],
      },
      donut4: {
        labels: ['Person', 'Handbag', 'Backpack', 'Knife'],
        series: [],
      },
    },
  });
  const [titles, setTitles] = useState({
    countRV: 0,
    avgRV: '',
    countObjs: 0,
    avgObjs: '',
  });
  const { taskId } = useParams();
  const history = useHistory();
  // 0 state means noting has happened
  // 1 state means initializing model
  // 2 state means started processing
  // 3 state means processing finished
  var processState = sessionStorage.getItem('processState');
  if (processState == null || processState == '3') {
    processState = '0';
    sessionStorage.setItem('processState', '0');
  }

  useEffect(() => {
    // Anything in here is fired on component mount.
    getReport(taskId).then((data) => {
      setTitles({
        countRV:
          data.totalOccurrences.car +
          data.totalOccurrences.truck +
          data.totalOccurrences.motorbike,
        avgRV: (
          data.averageOccurrences.car +
          data.averageOccurrences.truck +
          data.averageOccurrences.motorbike
        ).toFixed(2),
        countObjs:
          data.totalOccurrences.person +
          data.totalOccurrences.backpack +
          data.totalOccurrences.knife +
          data.totalOccurrences.handbag,
        avgObjs: (
          data.averageOccurrences.person +
          data.averageOccurrences.backpack +
          data.averageOccurrences.knife +
          data.averageOccurrences.handbag
        ).toFixed(2),
      });
      // column 1 fill
      setChartData({
        barcharts: {
          barChart1: {
            categories: ['1st half', '2nd half', '3rd half'],
            series: [
              {
                name: 'Cars',
                data: data.occurrences.car,
              },
              {
                name: 'Motorbike',
                data: data.occurrences.motorbike,
              },
              {
                name: 'Truck',
                data: data.occurrences.truck,
              },
            ],
          },
          barChart2: {
            categories: ['1st half', '2nd half', '3rd half'],
            series: [
              {
                name: 'Cars',
                data: data.averages.car,
              },
              {
                name: 'Motorbike',
                data: data.averages.motorbike,
              },
              {
                name: 'Truck',
                data: data.averages.truck,
              },
            ],
          },
          barChart3: {
            categories: ['1st half', '2nd half', '3rd half'],
            series: [
              {
                name: 'Person',
                data: data.occurrences.person,
              },
              {
                name: 'Handbag',
                data: data.occurrences.handbag,
              },
              {
                name: 'Backpack',
                data: data.occurrences.backpack,
              },
              {
                name: 'Knife',
                data: data.occurrences.knife,
              },
            ],
          },
          barChart4: {
            categories: ['1st half', '2nd half', '3rd half'],
            series: [
              {
                name: 'Person',
                data: data.averages.person,
              },
              {
                name: 'Handbag',
                data: data.averages.handbag,
              },
              {
                name: 'Backpack',
                data: data.averages.backpack,
              },
              {
                name: 'Knife',
                data: data.averages.knife,
              },
            ],
          },
        },
        donuts: {
          donut1: {
            labels: ['Cars', 'Motorbike', 'Truck'],
            series: [
              data.totalOccurrences.car,
              data.totalOccurrences.motorbike,
              data.totalOccurrences.truck,
            ],
          },
          donut2: {
            labels: ['Cars', 'Motorbike', 'Truck'],
            series: [
              data.averageOccurrences.car,
              data.averageOccurrences.motorbike,
              data.averageOccurrences.truck,
            ],
          },
          donut3: {
            labels: ['Person', 'Handbag', 'Backpack', 'Knife'],
            series: [
              data.totalOccurrences.person,
              data.totalOccurrences.handbag,
              data.totalOccurrences.backpack,
              data.totalOccurrences.knife,
            ],
          },
          donut4: {
            labels: ['Person', 'Handbag', 'Backpack', 'Knife'],
            series: [
              data.averageOccurrences.person,
              data.averageOccurrences.handbag,
              data.averageOccurrences.backpack,
              data.averageOccurrences.knife,
            ],
          },
        },
      });
    });
    socket.on('processing-requested');
    socket.on('initialization-start', () => {
      sessionStorage.setItem('processState', '1');
    });
    socket.on('work-start', () => {
      sessionStorage.setItem('processState', '2');
    });
    socket.on('face-extraction-started', () => {
      sessionStorage.setItem('faceExt', 'true');
    });
    socket.on('work-end', () => {
      sessionStorage.setItem('processState', '0');
    });
    return () => {
      // Anything in here is fired on component unmount.
      socket.off('processing-requested');
      socket.off('initialization-start');
      socket.off('work-start');
      socket.off('work-end');
    };
  }, []);

  return (
    <>
      <section id="header" className="home-section ml-0">
        <div className="container-fluid pb-4 ml-0">
          <div className="row mt-1 ml-0">
            <div className="col-lg-12 col-md-12 col-xl-12 d-flex align-items-center ml-0">
              <h4 className="ml-0">Quantitative analysis report</h4>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-12 col-md-12 col-xl-12">
              <div className="row m-0 mt-2">
                <div className="col-3 pr-1 pl-1">
                  <div className="row report-title-color pt-3 pb-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row d-flex justify-content-center p-0 m-0">
                        <h5 className="mb-0" style={{ color: '#583d72' }}>
                          # of Road Vehicles
                        </h5>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <DriveEtaIcon
                          style={{ fontSize: 58, color: '#583d72' }}
                        />
                        <h1 style={{ color: '#583d72' }} className="ml-1 mb-0">
                          {titles.countRV}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3 pr-1 pl-1">
                  <div className="row report-title-color pt-3 pb-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row d-flex justify-content-center p-0 m-0">
                        <h5 className="mb-0" style={{ color: '#583d72' }}>
                          Avg Duration Road Vehicles
                        </h5>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <UpdateRounded
                          style={{ fontSize: 58, color: '#583d72' }}
                        />
                        <h1 style={{ color: '#583d72' }} className="ml-1 mb-0">
                          {titles.avgRV}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3  pr-1 pl-1">
                  <div className="row report-title-color pt-3 pb-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row d-flex justify-content-center p-0 m-0">
                        <h5 className="mb-0" style={{ color: '#583d72' }}>
                          # of Objects
                        </h5>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <PeopleAltIcon
                          style={{ fontSize: 58, color: '#583d72' }}
                        />
                        <h1 style={{ color: '#583d72' }} className="ml-1 mb-0">
                          {titles.countObjs}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3  pr-1 pl-1">
                  <div className="row report-title-color pt-3 pb-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row d-flex justify-content-center p-0 m-0">
                        <h5 className="mb-0" style={{ color: '#583d72' }}>
                          Avg Duration Objects
                        </h5>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <UpdateRounded
                          style={{ fontSize: 58, color: '#583d72' }}
                        />
                        <h1 style={{ color: '#583d72' }} className="ml-1 mb-0">
                          {titles.avgObjs}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row m-0 mt-2">
                <div className="col-3  pr-1 pl-1">
                  <div className="row report-title-color pt-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row p-0 m-0">
                        <h6 className="mb-0 ml-2" style={{ color: '#583d72' }}>
                          Bar chart
                        </h6>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <Barchart cdata={chartData.barcharts.barChart1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3 pr-1 pl-1">
                  <div className="row report-title-color pt-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row p-0 m-0">
                        <h6 className="mb-0 ml-2" style={{ color: '#583d72' }}>
                          Bar chart
                        </h6>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <Barchart cdata={chartData.barcharts.barChart2} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3  pr-1 pl-1">
                  <div className="row report-title-color pt-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row p-0 m-0">
                        <h6 className="mb-0 ml-2" style={{ color: '#583d72' }}>
                          Bar chart
                        </h6>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <Barchart cdata={chartData.barcharts.barChart3} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3  pr-1 pl-1">
                  <div className="row report-title-color pt-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row p-0 m-0">
                        <h6 className="mb-0 ml-2" style={{ color: '#583d72' }}>
                          Bar chart
                        </h6>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <Barchart cdata={chartData.barcharts.barChart4} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row m-0 mt-2">
                <div className="col-3  pr-1 pl-1">
                  <div className="row report-title-color pt-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row p-0 m-0">
                        <h6 className="mb-0 ml-2" style={{ color: '#583d72' }}>
                          Donut chart
                        </h6>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <Donutchart cdata={chartData.donuts.donut1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3 pr-1 pl-1">
                  <div className="row report-title-color pt-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row p-0 m-0">
                        <h6 className="mb-0 ml-2" style={{ color: '#583d72' }}>
                          Donut Chart
                        </h6>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <Donutchart cdata={chartData.donuts.donut2} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3  pr-1 pl-1">
                  <div className="row report-title-color pt-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row p-0 m-0">
                        <h6 className="mb-0 ml-2" style={{ color: '#583d72' }}>
                          Donut Chart
                        </h6>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <Donutchart cdata={chartData.donuts.donut3} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3  pr-1 pl-1">
                  <div className="row report-title-color pt-3 m-0">
                    <div className="col-12 align-items-center">
                      <div className="row p-0 m-0">
                        <h6 className="mb-0 ml-2" style={{ color: '#583d72' }}>
                          Donut Chart
                        </h6>
                      </div>
                      <div className="row d-flex justify-content-center  p-0 m-0">
                        <Donutchart cdata={chartData.donuts.donut4} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
