import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import ProvidersForm from '../components/ProvidersForm';
import { PROVIDER_QUERY, PROVIDERS_MUTATION } from '../queries/providers';
class AddProvider extends React.Component {
  state = {};

  onCompleted = data => {
    this.props.history.push('/providers');
  };

  onSubmit = (state, mutation) => {
    this.setState({ ...state }, mutation);
  };

  parseState = () => {
    const { phoneNumber1, phoneNumber2 } = this.state;

    return {
      ...this.state,
      phoneNumber1: parseInt(phoneNumber1),
      phoneNumber2: parseFloat(phoneNumber2),
    };
  };

  renderQuery = (id, values) => {
    return (
      <Query query={PROVIDER_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          if (data.provider) {
            values = data.provider;
          }

          return this.renderMutation(id, values);
        }}
      </Query>
    );
  };

  renderMutation = (id, values) => {
    return (
      <Mutation
        mutation={id ? PROVIDERS_MUTATION : PROVIDERS_MUTATION}
        variables={this.parseState(this.state)}
        onCompleted={data => this.onCompleted(data)}
      >
        {(providers, { data, loading, error }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <ProvidersForm
              mutation={providers}
              onSubmit={this.onSubmit}
              {...values}
            />
          );
        }}
      </Mutation>
    );
  };

  render() {
    const {
      match: { params },
    } = this.props;

    let values = {};

    return (
      <div>
        <Header>Nuevo Proveedor</Header>
        <Segment>
          {params.id
            ? this.renderQuery(params.id, values)
            : this.renderMutation(params.id, values)}
        </Segment>{' '}
      </div>
    );
  }
}

export default withRouter(AddProvider);
