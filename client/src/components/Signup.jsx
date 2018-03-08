import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import '../styles/forms.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.signupSubmit(this.state);
  }

  render() {
    return (
      <div className="signup-background">
        <Grid
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Create a New Account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="envelope outline"
                  iconPosition="left"
                  placeholder="Your Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Create Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Create Password"
                  type="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Button
                  color="teal"
                  fluid size="large"
                  onClick={this.handleSubmit}
                >
                  Signup
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <a href='#'> Login</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Signup;