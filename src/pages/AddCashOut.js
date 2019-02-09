import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import CashOutForm from '../components/forms/CashOutForm';
import { Consumer } from '../app/App';

const AddCashOut = props => {
  const onCompleted = data => {
    props.history.push('/cash-out');
  };

  return (
    <>
      <Header>Nuevo Egreso</Header>
      <Segment>
        <Consumer>
          {({ user }) => <CashOutForm user={user} onCompleted={onCompleted} />}
        </Consumer>
      </Segment>
    </>
  );
};

export default withRouter(AddCashOut);
