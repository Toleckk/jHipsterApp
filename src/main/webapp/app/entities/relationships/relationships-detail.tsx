import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './relationships.reducer';
import { IRelationships } from 'app/shared/model/relationships.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRelationshipsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class RelationshipsDetail extends React.Component<IRelationshipsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { relationshipsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Relationships [<b>{relationshipsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>User</dt>
            <dd>{relationshipsEntity.user ? relationshipsEntity.user.login : ''}</dd>
            <dt>Subscriber</dt>
            <dd>{relationshipsEntity.subscriber ? relationshipsEntity.subscriber.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/relationships" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/relationships/${relationshipsEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ relationships }: IRootState) => ({
  relationshipsEntity: relationships.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelationshipsDetail);
