import React from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <a className="item active">Home</a>
        <a className="item">Favorites</a>
        <div className="right menu">
          <a className="ui item">Cart</a>
          <a className="ui item">Logout</a>
        </div>
      </div>
    );
  }
}

export default Nav;