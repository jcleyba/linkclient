import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Bienvenidos</p>
          <Query query={HELLO_QUERY}>
            {props => {
              console.log(props);
              const { data, loading, error, refetch } = props;
              if (loading) {
                return <div>Loading</div>;
              }

              if (error) {
                return <div>An unexpected error occurred</div>;
              }

              setTimeout(() => {
                refetch({
                  name: 'Link',
                });
              }, 5000);

              return (
                <div>
                  <p>What's your name?</p>
                  <h3>{data.hello}</h3>
                </div>
              );
            }}
          </Query>
        </header>
      </div>
    );
  }
}

const HELLO_QUERY = gql`
  query HelloQuery($name: String) {
    hello(name: $name)
  }
`;

export default App;
