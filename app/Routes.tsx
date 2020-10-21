import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import Home from './src/Home';
import VotFront from './src/VOT/VOTFront';
import Features from './src/Features';
import About from './src/About';
import Contact from './src/Contact';
import Navbar from './src/Navbar';
import Footer from './src/ReusableCompnents/footer';

export default function Routes() {
  return (
    <App>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
      />
      <div className="d-flex flex-column flex-sm-column">
        <Navbar />
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route exact path={routes.VOT} component={VotFront} />
          <Route exact path={routes.FEATURES} component={Features} />
          <Route exact path={routes.ABOUT} component={About} />
          <Route exact path={routes.CONTACT} component={Contact} />
        </Switch>
        <Footer />
      </div>
    </App>
  );
}
