/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Player from './Player';
import './VOTFront.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function VotFront(): JSX.Element {
  const [videoFile, setVideoFileURL] = useState({
    videoFileURL: '',
    videoFileObject: null,
  });

  // eslint-disable-next-line
  const handleVideoUpload = (event: any) => {
    setVideoFileURL({
      videoFileURL: URL.createObjectURL(event.target.files[0]),
      videoFileObject: event.target.files[0],
    });
  };
  return (
    <>
      <section id="header" className="d-flex align-items-center home-section">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        />
        <div className="container-fluid ">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="votIconDiv col-md-8 col-lg-8 pt-lg-0 order-2 order-lg-1 d-flex align-items-center justify-content-center flex-column">
                  <Player vidsrc={videoFile.videoFileURL} />
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
                                onChange={handleVideoUpload}
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
                          <ProgressBar
                            style={{
                              padding: 0,
                            }}
                            className="col-md-12 col-lg-12 border-dark"
                            animated
                            now={45}
                            label={`${45}%`}
                          />
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="row pr-4 pl-4">
                          <h6>EST: 00:10:00</h6>
                        </div>
                        <div className="row pr-4 pl-4 pb-4">
                          <h6>No. of objects tracking: 5</h6>
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
