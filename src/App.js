import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import routes from './routes';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
      <Header />
      {routes}
      </div>
    );
  }
}

export default App;
