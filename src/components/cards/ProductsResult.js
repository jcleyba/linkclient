import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Card, Message, Form } from 'semantic-ui-react';

function Result(props) {
  const [amount, setAmount] = useState(1);
  let buttonEl = useRef();

  const onAmountChange = ({ target }) => {
    setAmount(target.value);
  };

  useEffect(() => {
    if (props.focus) {
      buttonEl.current.focus();
    }
  }, []);

  const renderButton = (productAdded, disableByStock) => {
    return (
      <Button
        color={productAdded ? 'red' : 'blue'}
        type="submit"
        ref={buttonEl}
        disabled={amount < 1 || productAdded || disableByStock}
      >
        {productAdded ? 'Agregado' : 'Agregar'}
      </Button>
    );
  };

  const renderInput = () => {
    const { product, onSelect, productAdded } = props;

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
          onChange={onAmountChange}
          placeholder="Cantidad"
        >
          <input />
          {renderButton(productAdded, disableByStock)}
        </Input>
      </Form>
    );
  };

  const { product } = props;
  const { description, costPrice, salePrice, stock } = product;

  return (
    <Card>
      <Card.Content>
        <Card.Header>{description}</Card.Header>
        Costo: <b>${costPrice}</b> - Precio: <b>${salePrice} </b>- Stock:{' '}
        <b>{stock}</b>
      </Card.Content>
      <Card.Content extra>{renderInput()}</Card.Content>
    </Card>
  );
}

export default Result;
