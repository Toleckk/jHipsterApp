import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Like from './like';
import LikeDetail from './like-detail';
import LikeUpdate from './like-update';
import LikeDeleteDialog from './like-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LikeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LikeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LikeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Like} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LikeDeleteDialog} />
  </>
);

export default Routes;
