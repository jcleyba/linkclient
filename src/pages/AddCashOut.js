import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import CashOutForm from '../components/CashOutForm';
import { Query, Mutation } from 'react-apollo';
import { CASHOUTS_MUTATION, CASHOUTS_QUERY } from '../queries/cashouts';
import { Consumer } from '../app/App';

class AddCashOut extends React.Component {
  state = {};
  onCompleted = data => {
    this.props.history.push('/cash-out');
  };

  onSubmit = (state, mutation) => {
    this.setState({ ...state }, mutation);
  };

  renderQuery = id => {
    let values = this.state;

    return (
      <Query query={CASHOUTS_QUERY} variables={{ id }}>
        {({ loading, error, data: cashoutData }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          console.log(cashoutData);
          if (cashoutData.cashout) {
            values = cashoutData.cashout;
          }

          return this.renderMutation(id, values);
        }}
      </Query>
    );
  };

  parseState = user => {
    const { amount } = this.state;

    return {
      ...this.state,
      id_User: parseInt(user.id),
      amount: parseFloat(amount),
    };
  };

  renderMutation = (id, values) => {
    return (
      <Consumer>
        {({ user }) => {
          return (
            <Mutation
              mutation={CASHOUTS_MUTATION}
              variables={{ id, ...this.parseState(user) }}
              onCompleted={data => this.onCompleted(data)}
            >
              {(cashouts, { data, loading, error }) => (
                <CashOutForm
                  mutation={cashouts}
                  onSubmit={this.onSubmit}
                  {...values}
                />
              )}
            </Mutation>
          );
        }}
      </Consumer>
    );
  };
  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <>
        <Header>Nuevo Egreso</Header>
        <Segment>
          {params.id
            ? this.renderQuery(params.id)
            : this.renderMutation(params.id, this.state)}
        </Segment>
      </>
    );
  }
}

export default withRouter(AddCashOut);
