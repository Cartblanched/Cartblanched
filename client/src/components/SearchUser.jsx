import React from 'react';

const style = {
  backgroundColor: "#88C057"
}

var SearchUser = (props) => {
  return (
    <div className="ui segment">
      <form className="ui form">
        <div className="ui field">
          <div className="ui header small">Friend Search</div>
          <input value={props.userSearch} onChange={props.onUserSearch}/>
        </div>
        <button className="ui button"
          style= {style}
          onClick={props.onUserSearchClick}>
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchUser;