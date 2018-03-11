import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../styles/forms.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      warn: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    let bool = this.validateForm();
    if (bool) {
      event.preventDefault();
      this.props.loginSubmit(this.state);
    } else {
      this.setState({
        warn: true
      })
    }
  }

  render() {
    let Warning = null;
    if (this.state.warn) {
      Warning = (
        <Message warning>
          <Message.Header>Whoa there!</Message.Header>
          <p>Please enter valid credentials.</p>
        </Message>
      )
    }

    return (
      <div>
        <div className="login-background">
          <Grid
            textAlign="center"
            verticalAlign="middle"
            style={{ height: '100%' }}
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="black" textAlign="center">
                Login to Your Account
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="username"
                    type="text"
                    name="username"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <Button
                    color="black"
                    fluid size="large"
                    onClick={this.handleSubmit}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              {Warning}
              <Message>
                New here? <Link to="/signup"> Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Login;