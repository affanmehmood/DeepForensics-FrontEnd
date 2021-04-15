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
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../socketIoBase';
import ReportTable from './Table';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

export default function TaskTable(props): JSX.Element {
  const history = useHistory();

  return (
    <>
      <section id="header" className="home-section">
        <div className="container-fluid pb-4">
          <div className="row mt-2 ml-0">
            <div className="col-lg-12 col-md-12 d-flex align-items-center ml-0">
              <h4 className="ml-0">Processed Video Table</h4>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-12 col-md-12 d-flex align-items-center">
              <ReportTable
                setSelectedRowInTable={props.setSelectedRowInTable}
                shouldUpdateTable = {props.shouldUpdateTable}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
