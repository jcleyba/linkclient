import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Input, Message, Card } from 'semantic-ui-react';
import { debounce } from 'lodash';

import { SEARCH_QUERY } from '../queries/products';
import Result from '../components/cards/ProductsResult';
import Cart from '../components/Cart';
import { Consumer } from '../app/App';

const AddSale = props => {
  const [term, setTerm] = useState(props.term || '');
  let inputEl = useRef(null);

  const addProductToCart = (cart, product, setCart) => {
    setTerm('');
    setCart([...cart, product]);
    inputEl.inputRef.value = '';
  };

  const renderResults = data => {
    if (data && data.search && !data.search.length) {
      return 'Sin resultados';
    }
    return (
      <Consumer>
        {({ cart, setCart }) => (
          <Card.Group>
            {data.search &&
              data.search.map((item, index) => {
                return (
                  <Result
                    key={index}
                    product={item}
                    onSelect={product =>
                      addProductToCart(cart, product, setCart)
                    }
                  />
                );
              })}
          </Card.Group>
        )}
      </Consumer>
    );
  };

  const onInputChange = debounce(term => {
    setTerm(term);
  }, 500);

  const handleError = error => {
    if (error.includes('403')) {
      sessionStorage.clear();
      props.history.push('/login');
      return;
    }

    return <Message error header="Error" content={error} />;
  };

  const renderQuery = () => {
    if (term.length < 3) {
      return <div>Debe ingresar al menos 3 caracteres</div>;
    }

    return (
      <Query query={SEARCH_QUERY} variables={{ term }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Buscando...</div>;
          }
          if (error) {
            handleError(error);
          }

          return <div>{renderResults(data)}</div>;
        }}
      </Query>
    );
  };

  const renderInput = () => {
    return (
      <Input
        size="large"
        ref={el => (inputEl = el)}
        onChange={e => onInputChange(e.target.value)}
        placeholder="Producto o codigo"
        style={{ marginBottom: 20 }}
      />
    );
  };

  const renderCart = () => {
    return <Consumer>{({ cart }) => <Cart items={cart} />}</Consumer>;
  };

  return (
    <div>
      {renderInput()}
      {renderQuery()}
      {renderCart()}
    </div>
  );
};

export default withRouter(AddSale);
