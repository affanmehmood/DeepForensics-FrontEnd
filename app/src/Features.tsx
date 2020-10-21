import React from 'react';

import ServiceCard from './ReusableCompnents/service-card';
import Sdata from './Sdata';

export default function Features(): JSX.Element {
  return (
    <>
      <div className="my-5">
        <h1 className="text-center">Tools We Provide</h1>
      </div>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row gy-4">
              {Sdata.map((val) => {
                return (
                  <ServiceCard
                    key={val.key}
                    imgsrc={val.imgsrc}
                    title={val.title}
                    text={val.text}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
