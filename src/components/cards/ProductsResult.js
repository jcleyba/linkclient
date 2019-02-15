import React from 'react';
import { Button, Input, Card, Message, Form } from 'semantic-ui-react';

class Result extends React.Component {
  state = {
    amount: 1,
  };

  onAmountChange = ({ target }) => {
    this.setState({ amount: target.value });
  };

  renderButton = (productAdded, disableByStock) => {
    return (
      <Button
        color={productAdded ? 'red' : 'blue'}
        type="submit"
        disabled={this.state.amount < 1 || productAdded || disableByStock}
      >
        {productAdded ? 'Agregado' : 'Agregar'}
      </Button>
    );
  };

  renderInput = () => {
    const { amount } = this.state;
    const { product, onSelect, productAdded } = this.props;

    if (product.stock < 1) {
      return <Message error>Sin stock</Message>;
    }
    const disableByStock = amount > product.stock;

    return (
      <Form onSubmit={() => onSelect({ ...product, amount })}>
        <Input
          action
          type="number"
          min="1"
          max={product.stock}
          value={amount}
          onChange={this.onAmountChange}
          placeholder="Cantidad"
        >
          <input />
          {this.renderButton(productAdded, disableByStock)}
        </Input>
      </Form>
    );
  };

  render() {
    const { product } = this.props;
    const { description, costPrice, salePrice, stock } = product;

    return (
      <Card>
        <Card.Content>
          <Card.Header>{description}</Card.Header>
          Costo: <b>${costPrice}</b> - Precio: <b>${salePrice} </b>- Stock:{' '}
          <b>{stock}</b>
        </Card.Content>
        <Card.Content extra>{this.renderInput()}</Card.Content>
      </Card>
    );
  }
}

export default Result;
