import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Home'
    }
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({
      activeItem: name
    });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item
              name='Home'
              active={activeItem === 'Home'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/favorites">
          <Menu.Item
            name='Favorites'
            active={activeItem === 'Favorites'}
            onClick={this.handleItemClick}
          />
          </Link>
          <Menu.Menu position='right'>
            <Link to="/cart">
              <Menu.Item
                name='Cart'
                active={activeItem === 'Cart'}
                onClick={this.handleItemClick}
              />
            </Link>
            <Link to="/signup">
              <Menu.Item
                name='Signup'
                active={activeItem === 'Signup'}
                onClick={this.handleItemClick}
              />
            </Link>
            <Link to="/login">
              <Menu.Item
                name='Login'
                active={activeItem === 'Login'}
                onClick={this.handleItemClick}
              />
            </Link>
            <Menu.Item
              name='Logout'
              active={activeItem === 'Logout'}
              onClick={this.handleItemClick}
              href="/logout"
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Nav;