import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Header, Button, Icon, Segment } from 'semantic-ui-react';

import ProductTypeTable from '../../components/tables/ProductTypeTable';
import { PRODUCTTYPES_QUERY } from '../../queries/producttypes';

class ProductTypes extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        <Header as="h1">Tipos de Productos</Header>
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
        <Query query={PRODUCTTYPES_QUERY} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <Segment>
                <ProductTypeTable data={data.producttypes || []} />
              </Segment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ProductTypes;
