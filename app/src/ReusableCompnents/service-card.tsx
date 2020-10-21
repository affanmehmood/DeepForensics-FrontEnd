import React from 'react';

import { NavLink } from 'react-router-dom';

// eslint-disable-next-line
export default function ServiceCard(props: any): JSX.Element {
  const { title } = props;
  const { text } = props;
  const { imgsrc } = props;
  return (
    <>
      <div className="col-md-4 col-10 mx-auto">
        <div className="card">
          <img
            src={imgsrc}
            className="card-img-top service-img"
            alt="Service"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
            <NavLink to="#" className="btn btn-primary">
              Details
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
