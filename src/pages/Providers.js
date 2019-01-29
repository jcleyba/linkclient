import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Header, Button, Icon } from 'semantic-ui-react';

class Products extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        <Header as="h1">Proveedores</Header>
        <Button
          icon
          primary
          labelPosition="left"
          as={Link}
          to={`${match.path}/add`}
        >
          <Icon name="add" />
          Nuevo
        </Button>
        <Query query={PROVIDERS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <div>
                {data.providers &&
                  data.providers.map(provider => (
                    <li key={provider.cuit}>
                      {provider.cuit} - {provider.name} - {provider.razonSocial}
                    </li>
                  ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

const PROVIDERS_QUERY = gql`
  query ProvidersQuery {
    providers {
      cuit
      name
      razonSocial
    }
  }
`;

export default Products;
