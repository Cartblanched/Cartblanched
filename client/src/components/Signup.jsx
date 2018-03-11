import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../styles/forms.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    return (this.state.email.length > 0 && this.state.username.length > 0 && this.state.password.length > 0);
  }

  handleSubmit() {
    let bool = this.validateForm();
    if (bool) {
      this.props.signupSubmit(this.state);
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
      <div className="signup-background">
        <Grid
          textAlign="center"
          verticalAlign="middle"
          style={{ height: '100%' }}
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              Create a New Account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="envelope"
                  iconPosition="left"
                  placeholder="Your Email"
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Create Username"
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Create Password"
                  type="Password"
                  name="password"
                  onChange={this.handleChange}
                />
                <Button
                  fluid
                  color="black"
                  size="large"
                  onClick={this.handleSubmit}
                >
                  Signup
                </Button>
              </Segment>
            </Form>
            {Warning}
            <Message>
              Already have an account? <Link to="/login"> Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Signup;