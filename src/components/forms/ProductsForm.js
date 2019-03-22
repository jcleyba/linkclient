import React, { useState } from 'react';
import { Form, Button, Radio } from 'semantic-ui-react';
import ProvidersSelect from '../selects/ProvidersSelect';
import ProductTypesSelect from '../selects/ProductTypesSelect';

function ProductsForm(props) {
  const { stock: initialStock } = props.initialValues;
  const {
    stock = '',
    minimumStock = '',
    codProduct = '',
    description = '',
    salePrice = '',
    costPrice = '',
    id_Provider = '',
    id_ProductType = '',
    available = '',
  } = props.initialValues;
  const [state, setState] = useState({
    stock,
    minimumStock,
    codProduct,
    description,
    salePrice,
    costPrice,
    id_Provider,
    id_ProductType,
    available,
  });

  const setProvider = provider => {
    setState({ ...state, id_Provider: provider });
  };

  const setProductType = type => {
    setState({ ...state, id_ProductType: type });
  };

  const onInputChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const onToggleChange = (e, data) => {
    setState({ ...state, available: data.checked });
  };

  const onSubmit = () => {
    props.onSubmit(state, props.mutation);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Codigo</label>
          <input
            placeholder="Codigo"
            name="codProduct"
            required
            value={state.codProduct}
            onChange={onInputChange}
          />
        </Form.Field>
        <Form.Field required>
          <label>Descripcion</label>
          <input
            placeholder="Descripcion"
            name="description"
            value={state.description}
            onChange={onInputChange}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Stock</label>
          <input
            placeholder="Stock"
            name="stock"
            type="number"
            required
            min={initialStock}
            value={state.stock}
            onChange={onInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Stock mínimo</label>
          <input
            placeholder="Stock mínimo"
            name="minimumStock"
            type="number"
            value={state.minimumStock}
            onChange={onInputChange}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Precio Venta</label>
          <input
            placeholder="Precio Venta"
            name="salePrice"
            type="number"
            required
            value={state.salePrice}
            onChange={onInputChange}
          />
        </Form.Field>
        <Form.Field required>
          <label>Precio Costo</label>
          <input
            placeholder="Precio Costo"
            name="costPrice"
            type="number"
            required
            value={state.costPrice}
            onChange={onInputChange}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <ProvidersSelect
          provider={state.id_Provider.toString()}
          setProvider={setProvider}
        />
        <ProductTypesSelect
          productType={state.id_ProductType.toString()}
          setProductType={setProductType}
        />
      </Form.Group>
      <Form.Field>
        <label>Disponible</label>
        <Radio toggle checked={state.available} onChange={onToggleChange} />
      </Form.Field>
      <Button
        primary
        type="submit"
        loading={props.loading}
        disabled={state.id_Provider < 1 || state.id_ProductType < 1}
      >
        Submit
      </Button>
    </Form>
  );
}

export default ProductsForm;
