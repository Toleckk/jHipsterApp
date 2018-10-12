import React from 'react';
import { Form, Grid, Message, Segment, Button } from 'semantic-ui-react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { login } from 'app/shared/reducers/authentication';

interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

interface ILoginState {
  username: string;
  password: string;
  rememberMe: boolean;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
  state: ILoginState = {
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
      this.setState(prevState => ({rememberMe: !this.state.rememberMe}));
    else
    // @ts-ignore
      this.setState(prevState => ({[name]: value}));
  };

  getLocationForRedirect = () => {
    const { from } = this.props.location.state || { from: { pathname: '/', search: location.search } };
    return from;
  };

  render() {
    return (
      <Grid style={{height: 100 + '%'}} centered textAlign="center">
        {this.props.isAuthenticated && <Redirect to={this.getLocationForRedirect()}/>}
        <Grid.Row centered>
          <Grid.Column width={5}>
            <Segment stacked>
              <Form size="big" onSubmit={this.onSubmit}>
                <Form.Input fluid icon="user" iconPosition="left" required onChange={this.onFormDataChanged}
                            placeholder="Login" label="Login" name="username"/>
                <Form.Input icon="lock" iconPosition="left" required onChange={this.onFormDataChanged}
                            placeholder="Login" label="Password" name="password" type="password"/>
                <Form.Group inline widths="equal">
                  <Form.Button basic fluid color="black" content={'Log In'}/>
                  <Form.Checkbox onChange={this.onFormDataChanged} checked={this.state.rememberMe}
                                 name="rememberMe" label="Remember Me"/>
                </Form.Group>
              </Form>
              <Button as={Link} to="/registration" color="black" content="Sign Up" fluid/>
              {this.props.loginError && (
                <Message negative>
                  <strong>Failed to sign in!</strong> Please check your credentials and try again.
                  <Link to={'/reset/request'}> Forgot your password?</Link>
                </Message>
              )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({authentication}: IRootState) => ({
  loginError: authentication.loginError,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = {login};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
