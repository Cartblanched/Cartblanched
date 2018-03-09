import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const activeItem = this.props.activeItem;

    let loginComponent = null;
    if (this.props.loginStatus) {
      loginComponent = (
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item
              name='Home'
              active={activeItem === 'Home'}
              onClick={this.props.handleNavItemClick}
            />
          </Link>
          <Link to="/favorites">
          <Menu.Item
            name='Favorites'
            active={activeItem === 'Favorites'}
            onClick={this.props.handleNavItemClick}
          />
          </Link>
          <Menu.Menu position='right'>
            <Link to="/basket">
              <Menu.Item
                name='Basket'
                active={activeItem === 'Basket'}
                onClick={this.props.handleNavItemClick}
              />
            </Link>
            <Menu.Item
              name='Logout'
              active={activeItem === 'Logout'}
              onClick={this.props.handleNavItemClick}
              href="/logout"
            />
          </Menu.Menu>
        </Menu>
      )
    } else {
      loginComponent = (
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item
              name='Home'
              active={activeItem === 'Home'}
              onClick={this.props.handleNavItemClick}
            />
          </Link>
          <Menu.Menu position='right'>
            <Link to="/basket">
              <Menu.Item
                name='Basket'
                active={activeItem === 'Basket'}
                onClick={this.props.handleNavItemClick}
              />
            </Link>
            <Link to="/login">
              <Menu.Item
                name='Login'
                active={activeItem === 'Login'}
                onClick={this.props.handleNavItemClick}
              />
            </Link>
            <Link to="/signup">
              <Menu.Item
                name='Signup'
                active={activeItem === 'Signup'}
                onClick={this.props.handleNavItemClick}
              />
            </Link>
          </Menu.Menu>
        </Menu>
      )
    }

    return (
      <div>
        {loginComponent}
      </div>
    );
  }
}

export default Nav;