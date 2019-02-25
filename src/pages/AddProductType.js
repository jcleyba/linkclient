import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import ProductTypesForm from '../components/forms/ProductTypesForm';

const AddCashOut = props => {
  const onCompleted = data => {
    props.history.push('/product-types');
  };

  return (
    <>
      <Header>Nuevo Tipo de Product</Header>
      <Segment>
        <ProductTypesForm onCompleted={onCompleted} />
      </Segment>
    </>
  );
};

export default withRouter(AddCashOut);
