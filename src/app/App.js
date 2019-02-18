import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import WithSidebar from '../components/withSidebar';
import Router from '../components/Router';

import './App.css';

export const Context = React.createContext();
export const Consumer = Context.Consumer;

const getUser = async () => {
  return JSON.parse(sessionStorage.getItem('user'));
};

const App = props => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(getUser() || {});

  return (
    <div className="App">
      <Context.Provider
        value={{
          user,
          cart,
          setCart,
          setUser,
        }}
      >
        <BrowserRouter>
          <WithSidebar user={user}>
            <Router />
          </WithSidebar>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;
