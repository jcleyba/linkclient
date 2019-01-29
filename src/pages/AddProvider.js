import React from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

class AddProvider extends React.Component {
  state = {
    cuit: '',
  };
  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  onCompleted = data => {
    this.props.history.push('/providers');
  };

  render() {
    const {
      match: { params },
    } = this.props;
    let values = this.state;

    return (
      <div>
        <Header>Nuevo Proveedor</Header>
        <Segment>
          <Query query={PROVIDERS_QUERY} variables={{ id: params.id }}>
            {({ loading, error, data: providerData }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              if (providerData.provider) {
                values = providerData.provider;
              }

              return (
                <Mutation
                  mutation={params.id ? PROVIDERS_MUTATION : PROVIDERS_MUTATION}
                  variables={this.state}
                  onCompleted={data => this.onCompleted(data)}
                >
                  {(providers, { data, loading, error }) => (
                    <Form onSubmit={providers}>
                      <Form.Group widths="equal">
                        <Form.Field>
                          <label>CUIT (sin espacios o guiones)</label>
                          <input
                            name="cuit"
                            type="number"
                            onChange={this.onInputChange}
                            value={this.state.cuit || values.cuit}
                            required
                            placeholder="CUIT"
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Razon Social</label>
                          <input
                            required
                            placeholder="Razon Social"
                            name="razonSocial"
                            value={this.state.razonSocial || values.razonSocial}
                            onChange={this.onInputChange}
                          />
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths="equal">
                        <Form.Field>
                          <label>Nombre</label>
                          <input
                            placeholder="Nombre"
                            name="name"
                            value={this.state.name || values.name}
                            onChange={this.onInputChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Apellido</label>
                          <input
                            placeholder="Apellido"
                            name="apellido"
                            value={this.state.apellido || values.apellido}
                            onChange={this.onInputChange}
                          />
                        </Form.Field>
                      </Form.Group>
                      <Form.Group widths="equal">
                        <Form.Field>
                          <label>Email</label>
                          <input
                            type="email"
                            required
                            placeholder="Email"
                            name="email"
                            value={this.state.email || values.email}
                            onChange={this.onInputChange}
                          />
                        </Form.Field>
                      </Form.Group>
                      <Button primary type="submit">
                        Submit
                      </Button>
                    </Form>
                  )}
                </Mutation>
              );
            }}
          </Query>
        </Segment>
      </div>
    );
  }
}

const PROVIDERS_MUTATION = gql`
  mutation ProdiversMutation(
    $cuit: String!
    $name: String!
    $apellido: String!
    $razonSocial: String!
    $email: String!
  ) {
    providers(
      cuit: $cuit
      name: $name
      apellido: $apellido
      razonSocial: $razonSocial
      email: $email
    ) {
      id
    }
  }
`;

const PROVIDERS_QUERY = gql`
  query ProvidersQuery($id: String) {
    provider(id: $id) {
      cuit
      name
      razonSocial
      apellido
      email
    }
  }
`;

export default withRouter(AddProvider);
