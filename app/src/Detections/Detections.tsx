/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-key */
/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapse from '@material-ui/core/Collapse';
import Grow from '@material-ui/core/Grow';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularIntermidiate from '../ReusableCompnents/CircularIntermidiate';
import socket from '../socketIoBase';

const nodeConsole = require('console');

const detections = [
  {
    confidence: '1',
    img:
      'https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=',
  },
  {
    confidence: '2',
    img:
      'https://i.pinimg.com/originals/9e/d8/6f/9ed86f4d59363daf10f67d41282cab6b.jpg',
  },
  {
    confidence: '3',
    img:
      'https://media.istockphoto.com/photos/couple-in-love-picture-id1069131934?k=6&m=1069131934&s=612x612&w=0&h=TLnEENgg4i6W45ZJzkS00SlUZ3LAU3YWxCc9di5etgc=',
  },
  {
    confidence: '4',
    img: 'https://www.w3schools.com/w3images/lights.jpg',
  },
  {
    confidence: '5',
    img:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  },
  {
    confidence: '6',
    img:
      'https://i.pinimg.com/originals/6f/d6/8c/6fd68ced202b643053e9f281de52a016.jpg',
  },
  {
    confidence: '7',
    img:
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80',
  },
  {
    confidence: '8',
    img:
      'https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=',
  },
  {
    confidence: '9',
    img:
      'https://i.pinimg.com/originals/9e/d8/6f/9ed86f4d59363daf10f67d41282cab6b.jpg',
  },
  {
    confidence: '10',
    img:
      'https://media.istockphoto.com/photos/couple-in-love-picture-id1069131934?k=6&m=1069131934&s=612x612&w=0&h=TLnEENgg4i6W45ZJzkS00SlUZ3LAU3YWxCc9di5etgc=',
  },
  {
    confidence: '11',
    img: 'https://www.w3schools.com/w3images/lights.jpg',
  },
  {
    confidence: '12',
    img:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  },
  {
    confidence: '13',
    img:
      'https://i.pinimg.com/originals/6f/d6/8c/6fd68ced202b643053e9f281de52a016.jpg',
  },
  {
    confidence: '14',
    img:
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80',
  },
  {
    confidence: '15',
    img:
      'https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=',
  },
  {
    confidence: '16',
    img:
      'https://i.pinimg.com/originals/9e/d8/6f/9ed86f4d59363daf10f67d41282cab6b.jpg',
  },
  {
    confidence: '17',
    img:
      'https://media.istockphoto.com/photos/couple-in-love-picture-id1069131934?k=6&m=1069131934&s=612x612&w=0&h=TLnEENgg4i6W45ZJzkS00SlUZ3LAU3YWxCc9di5etgc=',
  },
  {
    confidence: '18',
    img: 'https://www.w3schools.com/w3images/lights.jpg',
  },
  {
    confidence: '19',
    img:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  },
  {
    confidence: '20',
    img:
      'https://i.pinimg.com/originals/6f/d6/8c/6fd68ced202b643053e9f281de52a016.jpg',
  },
  {
    confidence: '21',
    img:
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80',
  },
  {
    confidence: '22',
    img:
      'https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=',
  },
  {
    confidence: '23',
    img:
      'https://i.pinimg.com/originals/9e/d8/6f/9ed86f4d59363daf10f67d41282cab6b.jpg',
  },
  {
    confidence: '24',
    img:
      'https://media.istockphoto.com/photos/couple-in-love-picture-id1069131934?k=6&m=1069131934&s=612x612&w=0&h=TLnEENgg4i6W45ZJzkS00SlUZ3LAU3YWxCc9di5etgc=',
  },
  {
    confidence: '25',
    img: 'https://www.w3schools.com/w3images/lights.jpg',
  },
  {
    confidence: '26',
    img:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  },
  {
    confidence: '27',
    img:
      'https://i.pinimg.com/originals/6f/d6/8c/6fd68ced202b643053e9f281de52a016.jpg',
  },
  {
    confidence: '29',
    img:
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80',
  },
  {
    confidence: '30',
    img:
      'https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=',
  },
  {
    confidence: '31',
    img:
      'https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=',
  },
  {
    confidence: '32',
    img:
      'https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=',
  },
  {
    confidence: '33',
    img:
      'https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=',
  },
  {
    confidence: '34',
    img:
      'https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=',
  },
];
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const options = [
  'All',
  'person',
  'bicycle',
  'car',
  'motorbike',
  'aeroplane',
  'bus',
  'train',
  'truck',
  'boat',
  'traffic light',
  'fire hydrant',
  'stop sign',
  'parking meter',
  'bench',
  'bird',
  'cat',
  'dog',
  'horse',
  'sheep',
  'cow',
  'elephant',
  'bear',
  'zebra',
  'giraffe',
  'backpack',
  'umbrella',
  'handbag',
  'tie',
  'suitcase',
  'frisbee',
  'skis',
  'snowboard',
  'sports ball',
  'kite',
  'baseball bat',
  'baseball glove',
  'skateboard',
  'surfboard',
  'tennis racket',
  'bottle',
  'wine glass',
  'cup',
  'fork',
  'knife',
  'spoon',
  'bowl',
  'banana',
  'apple',
  'sandwich',
  'orange',
  'broccoli',
  'carrot',
  'hot dog',
  'pizza',
  'donut',
  'cake',
  'chair',
  'sofa',
  'potted plant',
  'bed',
  'dining table',
  'toilet',
  'tvmonitor',
  'laptop',
  'mouse',
  'remote',
  'keyboard',
  'cell phone',
  'microwave',
  'oven',
  'toaster',
  'sink',
  'refrigerator',
  'book',
  'clock',
  'vase',
  'scissors',
  'teddy bear',
  'hair drier',
  'toothbrush',
];

export default function Detections(): JSX.Element {
  const { taskId } = useParams();
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [detectionData, setDetectionData] = useState([]);
  const processState = sessionStorage.getItem('processState');
  const [state, setState] = useState(processState == null ? '0' : processState);
  function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }
  useEffect(() => {
    // get detection data
    socket.on('get-detections'); // Anything in here is fired on component mount.
    socket.emit('get-detections', {
      taskId,
      isResponseExpected: true,
      isTest: false,
    });
    socket.on('detections-extracted', (data) => {
      setDetectionData(data.detections);
    });
    socket.on('initialization-start', () => {
      setState('1');
      sessionStorage.setItem('processState', '1');
      myConsole.log('initialization-start Progress');
    });
    socket.on('work-start', () => {
      sessionStorage.setItem('processState', '2');
      myConsole.log('work-start Progress');
    });
    socket.on('work-progress', (data) => {
      if (state != '2') {
        setState('2');
        sessionStorage.setItem('processState', '2');
      }
      setProgressState({
        progress: data.progress,
        estimated: data.estimated,
        count: data.count,
      });
    });
    socket.on('work-end', () => {
      setState('3');
      sessionStorage.setItem('processState', '3');
      myConsole.log('work-end Progress');
    });
    return () => {
      // Anything in here is fired on component unmount.
      socket.off('initialization-start');
      socket.off('work-start');
      socket.off('work-progress');
      socket.off('work-end');
      socket.off('get-detections');
      socket.off('detections-extracted');
    };
  }, []);
  function getProgressBar() {
    if (detectionData.length === 0) {
      return (
        <>
          <div className="row mt-5 ml-0 mr-0 p-0 d-flex justify-content-center align-items-center">
            <h4 className="mr-4 mb-0 text-center align-self-center">
              Please Wait...
            </h4>
            <CircularIntermidiate />
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
  return (
    <>
      <section id="header" className="d-flex home-section">
        <div className="container-fluid">
          <Collapse in>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <h3>Object Detections</h3>
                </div>
                <div className="row mt-4">
                  <h5>Check out all the results!</h5>
                </div>
                <div className="row mt-3">
                  <Autocomplete
                    value={value}
                    onChange={(event: any, newValue: string | null) => {
                      setValue(newValue);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Filter"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="row mt-3 justify-content-center">
                  {getProgressBar()}
                  <div className="column-container cols flex-i">
                    {detectionData.map((val, ind) => {
                      return (
                        <Grow
                          in
                          style={{ transformOrigin: '0 0 0' }}
                          {...{ timeout: 100 * ind }}
                        >
                          <div
                            className="col d-inline-block m-0 p-0 border rounded mb-3"
                            style={{ backgroundColor: '#394457' }}
                          >
                            <div className="box one">
                              <img
                                alt="i"
                                src={'data:image/jpeg;base64,' + val.image}
                              />
                            </div>
                            <div className="bottom-div row m-0 d-flex justify-content-center">
                              <h6 className="sub-text text-sm m-0 ">
                                {'100% confident'}
                                {value === 'All' ? ', ' + val.class : ''}
                              </h6>
                              <button
                                className="button m-0"
                                style={{ verticalAlign: 'middle' }}
                              >
                                <span>live tracking</span>
                              </button>
                            </div>
                          </div>
                        </Grow>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </section>
    </>
  );
}
