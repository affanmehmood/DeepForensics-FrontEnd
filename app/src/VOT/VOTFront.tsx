import React from 'react';
import Player from './Player';
import './VOTFront.css';

export default function VotFront(): JSX.Element {
  return (
    <>
      <section id="header" className="d-flex align-items-center home-section">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="votIconDiv col-md-8 col-lg-8 pt-lg-0 order-2 order-lg-1 d-flex align-items-center justify-content-center flex-column">
                  <Player />
                </div>
                <div className="col-lg-4 col-md-4 order-1 order-lg-2 header-img d-flex align-items-center justify-content-center">
                  <img
                    src="data:image/png;base64,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"
                    className="img-fluid animated w-75"
                    alt="home"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
