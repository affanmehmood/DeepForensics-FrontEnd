import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Service from './Features';
import About from './About';
import Contact from './Contact';
import NavBar from './Navbar';
import VotFront from './VOT/VOTFront';
import Footer from './ReusableCompnents/footer';
import './App.css';

function App() {
  return (
    <div className="d-flex flex-column flex-sm-column">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/vot" component={VotFront} />
        <Route exact path="/download" component={Service} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
