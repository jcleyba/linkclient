import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Input, Message, Card } from 'semantic-ui-react';
import { debounce } from 'lodash';

import { SEARCH_QUERY } from '../queries/products';
import Result from '../components/ProductsResult';
import Cart from '../components/Cart';

class AddSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: props.term || '',
      cart: [],
    };
  }

  addProductToCart = product => {
    this.setState({ cart: [...this.state.cart, product], term: '' });
    this.termText.inputRef.value = '';
  };

  renderResults = data => {
    if (data && !data.search.length) {
      return 'Sin resultados';
    }
    return (
      <Card.Group>
        {data.search &&
          data.search.map((item, index) => {
            return (
              <Result
                key={index}
                product={item}
                onSelect={this.addProductToCart}
              />
            );
          })}
      </Card.Group>
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
            this.handleError(error);
          }

          return <div>{this.renderResults(data)}</div>;
        }}
      </Query>
    );
  };

  renderInput = () => {
    return (
      <Input
        size="large"
        ref={el => (this.termText = el)}
        onChange={e => this.onInputChange(e.target.value)}
        placeholder="Producto o codigo"
        style={{ marginBottom: 20 }}
      />
    );
  };

  renderCart = () => {
    const { cart } = this.state;

    return <Cart items={cart} />;
  };

  render() {
    return (
      <div>
        {this.renderInput()}
        {this.renderQuery()}
        {this.renderCart()}
      </div>
    );
  }
}

export default withRouter(AddSale);
