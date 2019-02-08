import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import WithSidebar from '../components/withSidebar';
import Router from '../components/Router';

import './App.css';
import { AUTH_QUERY } from '../queries/users';
const Context = React.createContext();

const App = props => {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <Query query={AUTH_QUERY} className="App">
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Context.Provider
              value={{
                user: data.auth,
                cart,
                setCart,
              }}
            >
              <BrowserRouter>
                <WithSidebar>
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
export const Consumer = Context.Consumer;
export default App;
