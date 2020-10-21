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
                  <div className="col-md-12 col-lg-12">
                    <div className="row mb-4 border border-dark rounded-left">
                      <div className="col-md-12 col-lg-12">
                        <div className="row justify-content-center p-4">
                          <form>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                                accept="video/*"
                              />
                              <label className="custom-file-label">
                                Choose file
                              </label>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="row justify-content-center p-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            style={{
                              paddingLeft: '50px',
                              paddingRight: '50px',
                            }}
                          >
                            Start
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row border border-dark rounded-left">
                      <div className="col-md-12 col-lg-12">
                        <div className="row justify-content-center p-4">
                          <h1>BAR</h1>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="row justify-content-center p-4">
                          <h1>TRACK</h1>
                        </div>
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
