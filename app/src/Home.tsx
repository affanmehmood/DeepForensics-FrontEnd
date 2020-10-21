import React from 'react';
import './index.css';
import HomeAbout from './ReusableCompnents/home-about';

import image from './images/video.svg';

export default function Home(): JSX.Element {
  const msg1 = 'Investigate crimes with';
  const msg12 = 'DeepForensics';
  const msg2 = 'The leading video forensics toolkit in the market.';
  const msg3 = 'Get Started';
  const dest = '/vot';
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
