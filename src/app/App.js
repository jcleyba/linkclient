import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import WithSidebar from '../components/withSidebar';
import Router from '../components/Router';

import './App.css';

class App extends Component {
  getToken() {
    return sessionStorage.getItem('token');
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <WithSidebar>
            <Router />
          </WithSidebar>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
