/* eslint-disable no-alert */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Contact(): JSX.Element {
  const [state, setstate] = useState({
    fullname: '',
    phone: '',
    email: '',
    msg: '',
  });
  // eslint-disable-next-line
  const InputEvent = (event: any) => {
    const { name, value } = event.target;
    setstate((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const formSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    alert(`${state.email}`);
  };

  return (
    <>
      <div className="my-5">
        <h1 className="text-center">Contact Us</h1>
      </div>
      <div className="container contact_div">
        <div className="row ">
          <div className="col-md-6 col-10 mx-auto">
            <form onSubmit={formSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Full Name
                </label>
                <input
                  required
                  type="name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="fullname"
                  value={state.fullname}
                  onChange={InputEvent}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Phone
                </label>
                <input
                  required
                  type="phone"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="phone"
                  value={state.phone}
                  onChange={InputEvent}
                  placeholder="Phone Number"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  required
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="email"
                  value={state.email}
                  onChange={InputEvent}
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Message
                </label>
                <textarea
                  required
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  name="msg"
                  value={state.msg}
                  onChange={InputEvent}
                ></textarea>
              </div>
              <div className="col-12">
                <button className="btn btn-outline-primary" type="submit">
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
