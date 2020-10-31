import React from 'react';
import Drawer from './src/Drawer';
import Footer from './src/ReusableCompnents/footer';

export default function Routes() {
  return (
    <div className="d-flex flex-column flex-sm-column">
      <Drawer />
      <Footer />
    </div>
  );
}
