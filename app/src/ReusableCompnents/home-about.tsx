/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line
export default function HomeAbout(props: any): JSX.Element {
  const { msg1 } = props;
  const { msg12 } = props;
  const { msg2 } = props;
  const { msg3 } = props;
  const { web } = props;
  const { dest } = props;

  return (
    <section id="header" className="d-flex align-items-center home-section">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row">
              <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                <h1>
                  {msg1}
                  <strong className="brand-name"> {msg12}</strong>
                </h1>
                <h2 className="my-3">{msg2}</h2>
                <div className="mt-4">
                  <NavLink exact to={dest} className="btn-get-started">
                    {msg3}
                  </NavLink>
                </div>
              </div>

              <div className="col-lg-6 order-1 order-lg-2 header-img d-flex align-items-center justify-content-center">
                <img src={web} className="img-fluid animated w-75" alt="home" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
