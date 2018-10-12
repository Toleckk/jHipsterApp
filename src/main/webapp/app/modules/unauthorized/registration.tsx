import React from 'react';
import { handleRegister, reset } from 'app/modules/account/register/register.reducer';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

import { Header, Grid, Segment, Button } from 'semantic-ui-react';

export type IRegistrationProps = DispatchProps;

export interface IRegistrationState {
  password: string;
}

export class Registration extends React.Component<IRegistrationProps, IRegistrationState> {
  state: IRegistrationState = {
    password: ''
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handleRegister(values.username, values.email, values.firstPassword);
    event.preventDefault();
  };

  updatePassword = event => {
    this.setState({password: event.target.value});
  };

  render() {
    return (
      <Grid textAlign={'center'}>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row centered>
          <Grid.Column width={6}>
            <Segment stacked>
              <Header textAlign={'center'} content={'Registration'}/>
              <AvForm onValidSubmit={this.handleValidSubmit}>
                <AvField
                  name="username"
                  placeholder="Your username"
                  validate={{
                    required: {value: true, errorMessage: 'Your username is required.'},
                    pattern: {value: '^[_.@A-Za-z0-9-]*$', errorMessage: 'Your username can only contain letters and digits.'},
                    minLength: {value: 1, errorMessage: 'Your username is required to be at least 1 character.'},
                    maxLength: {value: 50, errorMessage: 'Your username cannot be longer than 50 characters.'}
                  }}
                />
                <AvField
                  name="email"
                  placeholder="Your email"
                  type="email"
                  validate={{
                    required: {value: true, errorMessage: 'Your email is required.'},
                    minLength: {value: 5, errorMessage: 'Your email is required to be at least 5 characters.'},
                    maxLength: {value: 254, errorMessage: 'Your email cannot be longer than 50 characters.'}
                  }}
                />
                <AvField
                  name="firstPassword"
                  placeholder="Password"
                  type="password"
                  onChange={this.updatePassword}
                  validate={{
                    required: {value: true, errorMessage: 'Your password is required.'},
                    minLength: {value: 4, errorMessage: 'Your password is required to be at least 4 characters.'},
                    maxLength: {value: 50, errorMessage: 'Your password cannot be longer than 50 characters.'}
                  }}
                />
                <AvField
                  name="secondPassword"
                  placeholder="Confirm the password"
                  type="password"
                  validate={{
                    required: {value: true, errorMessage: 'Your confirmation password is required.'},
                    minLength: {value: 4, errorMessage: 'Your confirmation password is required to be at least 4 characters.'},
                    maxLength: {value: 50, errorMessage: 'Your confirmation password cannot be longer than 50 characters.'},
                    match: {value: 'firstPassword', errorMessage: 'The password and its confirmation do not match!'}
                  }}
                />
                <Button basic fluid color={'black'} type="submit" content={'Register'}/>
              </AvForm>
              <br style={{paddingBottom: 0}}/>
              <Button secondary color={'black'} as={Link} to={'/login'} fluid content={'Sign In'}/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = {handleRegister, reset};
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(Registration);
