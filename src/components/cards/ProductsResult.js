import React from 'react';
import { Button, Input, Card, Message } from 'semantic-ui-react';

class Result extends React.Component {
  state = {
    amount: 1,
  };

  onAmountChange = ({ target }) => {
    this.setState({ amount: target.value });
  };

  renderInput = () => {
    const { amount } = this.state;
    const { product, onSelect } = this.props;

    if (product.stock < 1) {
      return <Message error>Sin stock</Message>;
    }

    return (
      <Input
        action
        type="number"
        min="1"
        value={this.state.amount}
        onChange={this.onAmountChange}
        placeholder="Cantidad"
      >
        <input />
        <Button
          primary
          type="submit"
          disabled={this.state.amount < 1}
          onClick={() => onSelect({ ...product, amount })}
        >
          Agregar
        </Button>
      </Input>
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
