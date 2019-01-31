import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { withRouter } from 'react-router-dom';
import { SEARCH_QUERY } from '../queries/products';
import { Query } from 'react-apollo';
import { Input, Message } from 'semantic-ui-react';
import { debounce } from 'lodash';

class AddSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: props.term || '',
    };
  }

  renderResults = data => {
    if (data && !data.search.length) {
      return 'Sin resultados';
    }
    return (
      data.search &&
      data.search.map((item, index) => {
        return <div key={index}>{item.description}</div>;
      })
    );
  };

  onInputChange = debounce(term => {
    this.setState({ term });
  }, 250);

  handleError = error => {
    if (error.includes('403')) {
      sessionStorage.clear();
      this.props.history.push('/login');
      return;
    }

    return <Message error header="Error" content={error} />;
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
          if (error) {
            this.handleError();
          }

          return <div>{this.renderResults(data)}</div>;
        }}
      </Query>
    );
  };

  renderInput = () => {
    return (
      <Input
        onChange={e => this.onInputChange(e.target.value)}
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

export default withRouter(AddSale);
