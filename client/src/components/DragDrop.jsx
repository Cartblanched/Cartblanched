import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
  <div>{value}</div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="ui seven link cards">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class DragDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.favoriteImages
    }
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  }

  render() {
    return (
      <div className="ui segment topmargin">
        <h3>Drag and Drop Meal Planner</h3>
        <div className="ui centered grid">
          <div className="seven column row">
            <div className="column daylabel"><a className="ui green label day">Monday</a></div>
            <div className="column daylabel"><a className="ui green label day">Tuesday</a></div>
            <div className="column daylabel"><a className="ui green label day">Wednesday</a></div>
            <div className="column daylabel"><a className="ui green label day">Thursday</a></div>
            <div className="column daylabel"><a className="ui green label day">Friday</a></div>
            <div className="column daylabel"><a className="ui green label day">Saturday</a></div>
            <div className="column daylabel"><a className="ui green label day">Sunday</a></div>
          </div>
        </div>
        <SortableList items={this.state.items} onSortEnd={this.onSortEnd} axis="xy" />
      </div>
    )
  }
}

export default DragDrop;





