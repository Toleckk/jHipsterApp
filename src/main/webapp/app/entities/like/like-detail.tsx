import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './like.reducer';
import { ILike } from 'app/shared/model/like.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILikeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LikeDetail extends React.Component<ILikeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { likeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Like [<b>{likeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>On</dt>
            <dd>{likeEntity.on ? likeEntity.on.id : ''}</dd>
            <dt>Owner</dt>
            <dd>{likeEntity.owner ? likeEntity.owner.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/like" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/like/${likeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ like }: IRootState) => ({
  likeEntity: like.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeDetail);
