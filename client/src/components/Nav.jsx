import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment, Image } from 'semantic-ui-react';

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
              name="Home"
              active={activeItem === 'Home'}
              onClick={this.props.handleNavItemClick}
            >
              <Image src='https://c1.staticflickr.com/5/4793/38906403910_2e18fe17c6_s.jpg' avatar />
            </Menu.Item>
          </Link>
          <Link to="/favorites">
          <Menu.Item
            className="menuItem"
            name="Favorites"
            active={activeItem === 'Favorites'}
            onClick={this.props.handleNavItemClick}
          />
          </Link>
          <Menu.Menu position='right'>
            <Link to="/basket">
              <Menu.Item
                className="menuItem"
                name="Basket"
                active={activeItem === 'Basket'}
                onClick={this.props.handleNavItemClick}
              />
            </Link>
            <Menu.Item
              className="menuItem"
              name="Logout"
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
              name="Home"
              active={activeItem === 'Home'}
              onClick={this.props.handleNavItemClick}
            >
              <Image src='https://c1.staticflickr.com/5/4793/38906403910_2e18fe17c6_s.jpg' avatar />
            </Menu.Item>
          </Link>
          <Menu.Menu position='right'>
            <Link to="/basket">
              <Menu.Item
                className="menuItem"
                name="Basket"
                active={activeItem === 'Basket'}
                onClick={this.props.handleNavItemClick}
              />
            </Link>
            <Link to="/login">
              <Menu.Item
                className="menuItem"
                name="Login"
                active={activeItem === 'Login'}
                onClick={this.props.handleNavItemClick}
              />
            </Link>
            <Link to="/signup">
              <Menu.Item
                className="menuItem"
                name="Signup"
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