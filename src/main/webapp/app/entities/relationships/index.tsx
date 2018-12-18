import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Relationships from './relationships';
import RelationshipsDetail from './relationships-detail';
import RelationshipsUpdate from './relationships-update';
import RelationshipsDeleteDialog from './relationships-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RelationshipsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RelationshipsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RelationshipsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Relationships} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RelationshipsDeleteDialog} />
  </>
);

export default Routes;
