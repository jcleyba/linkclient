import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import WithSidebar from '../components/withSidebar';
import Router from '../components/Router';

import './App.css';
import { AUTH_QUERY } from '../queries/users';

export const Context = React.createContext();
export const Consumer = Context.Consumer;

const App = props => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <Query query={AUTH_QUERY} className="App">
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (data && data.auth) {
            setUser(data.auth);
          }
          return (
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
          );
        }}
      </Query>
    </div>
  );
};

export default App;
