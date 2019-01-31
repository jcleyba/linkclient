import React from 'react';

import { SEARCH_QUERY } from '../queries/products';
import { Query } from 'react-apollo';
import { Input } from 'semantic-ui-react';

export default class AddSale extends React.Component {
  state = {
    term: '',
  };

  renderResults = data => {
    return (
      data.search &&
      data.search.map((item, index) => {
        return <div key={index}>{item.description}</div>;
      })
    );
  };

  onInputChange = ({ target }) => {
    this.setState({ term: target.value });
  };
  renderQuery = () => {
    const { term } = this.state;

    if (term.length < 3) {
      return <div>Debe ingresar al menos 3 caracteres</div>;
    }

    return (
      <Query query={SEARCH_QUERY} variables={{ term }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return <div>{this.renderResults(data)}</div>;
        }}
      </Query>
    );
  };

  renderInput = () => {
    return (
      <Input
        value={this.state.term}
        onChange={this.onInputChange}
        placeholder="Producto o codigo"
      />
    );
  };

  render() {
    return (
      <div>
        {this.renderInput()}
        {this.renderQuery()}
      </div>
    );
  }
}
