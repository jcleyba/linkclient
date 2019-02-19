import { config as dotenvConfig } from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'react-table/react-table.css';

dotenvConfig();

const client = new ApolloClient({
  uri: process.env.REACT_APP_GATEWAY_URI,
  request: async operation => {
    const { token } = JSON.parse(sessionStorage.getItem('user')) || {};
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(err => {
        console.error(err);
        if (err.message.includes('403')) {
          sessionStorage.clear();
        }
      });
    }
    if (networkError) {
      console.log(networkError);
    }
  },
});

const Client = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Client />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
