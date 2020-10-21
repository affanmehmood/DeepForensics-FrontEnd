import React from 'react';
import HomeAbout from './ReusableCompnents/home-about';
import './App.css';

import image from './images/laptop.svg';

export default function About(): JSX.Element {
  const msg1 = 'Welcome to about page';
  const msg12 = 'DeepForensics';
  const msg2 = 'We are all about providing solutions';
  const msg3 = 'Contact Now';
  const dest = '/contact';
  const web = image;
  return (
    <HomeAbout
      msg1={msg1}
      msg12={msg12}
      msg2={msg2}
      msg3={msg3}
      web={web}
      dest={dest}
    />
  );
}
