import React from 'react';
import { AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Alert, Button, Card, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export interface IUnauthorizedProps extends StateProps, DispatchProps {
}

export interface IUnauthorizedState {
  username: string;
  password: string;
  rememberMe: false;
}

export class Unauthorized extends React.Component<IUnauthorizedProps, IUnauthorizedState> {
  state: IUnauthorizedState = {
    username: '',
    password: '',
    rememberMe: false
  };

  onSubmit = () => {
    const {login} = this.props;
    const {username, password, rememberMe} = this.state;
    login(username, password, rememberMe);
  };

  onFormDataChanged = (e, {name, value}) => {
    if (name == 'rememberMe')
      this.setState({rememberMe: !(this.state.rememberMe), ...this.state});
    else
      this.setState({...this.state, [name]: value});
  };

  render = () => (<Redirect to="/login"/>);

  // render() {
  //   return (
  //     <Grid>
  //       <Grid.Row centered>
  //         <Grid.Column width={ 4 }>
  //           <Form onSubmit={ this.onSubmit }>
  //             <Form.Input required onChange={ this.onFormDataChanged }
  //                         placeholder="Login" label="Login" name="username"/>
  //             <Form.Input required onChange={ this.onFormDataChanged }
  //                         placeholder="Login" label="Password" name="password" type="password"/>
  //             <Form.Group inline widths="equal">
  //               <Form.Button content="Log In" fluid/>
  //               <Form.Checkbox onChange={ this.onFormDataChanged } checked={this.state.rememberMe}
  //                              name="rememberMe" label="Remember Me"/>
  //             </Form.Group>
  //           </Form>
  //         </Grid.Column>
  //       </Grid.Row>
  //     </Grid>
  //   );
  // }

  // render() {
  //   return (<AvForm>
  //     <Row>
  //       <Col md="6">
  //         {this.props.loginError ? (
  //           <Alert color="danger">
  //             <strong>Failed to sign in!</strong> Please check your credentials and try again.
  //           </Alert>
  //         ) : null}
  //       </Col>
  //       <Col md="6" class="center-block">
  //         <AvField
  //           name="username"
  //           label="Username"
  //           placeholder="Your username"
  //           required
  //           errorMessage="Username cannot be empty!"
  //           autoFocus
  //         />
  //         <AvField
  //           name="password"
  //           type="password"
  //           label="Password"
  //           placeholder="Your password"
  //           required
  //           errorMessage="Password cannot be empty!"
  //         />
  //         <AvGroup check inline>
  //           <Label className="form-check-label">
  //             <AvInput type="checkbox" name="rememberMe"/> Remember me
  //           </Label>
  //         </AvGroup>
  //       </Col>
  //     </Row>
  //     <div className="mt-1">&nbsp;</div>
  //     <Alert color="warning">
  //       <Link to="/reset/request">Did you forget your password?</Link>
  //     </Alert>
  //     <Alert color="warning">
  //       <span>You don't have an account yet?</span> <Link to="/register">Register a new account</Link>
  //     </Alert>
  //     <Button color="primary" type="submit">
  //       Sign in
  //     </Button>
  //   </AvForm>);
  // }
}

const mapStateToProps = ({authentication}: IRootState) => ({
  loginError: authentication.loginError
});

const mapDispatchToProps = {login};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Unauthorized);
