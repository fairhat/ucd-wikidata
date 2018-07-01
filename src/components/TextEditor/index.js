import React from "react";
import {
	DropTarget,
	DropTargetConnector,
	DropTargetMonitor,
	ConnectDropTarget,
} from 'react-dnd';

const Types = {
  ITEM: "snippet"
};

const boxTarget = {
  drop(props, monitor, comp, ...args) {
    const item = monitor.getItem();
    const val = item ? item.values[0].value : "";
    console.log(props, monitor, comp, ...args);
    comp.addValue(val);
    return { name: "TextEditor" };
  }
}

class TextEditor extends React.Component {
  state = {
    text: "Die Erde hat einen Radius von m"
  };

  SnippedDropped = event => {
    const dt = event.dataTransfer.getData("text");
    debugger;
    var val = "Text aus Snippet"; //event.dataTransfer.getData('id');
    this.setState({ text: this.state.text + val });
  };

  addValue = value => {
    this.setState({ text: this.state.text + value });
  }

  handleChange = event => {
    this.setState({ text: event.target.value });
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver

    return (
      connectDropTarget &&
      connectDropTarget (
        <div>
        <textarea
          style={{ width: "100%", border: "1px solid #ccc", }}
          rows="15"
          placeholder="Text hier eingeben"
          onChange={this.handleChange}
          value={this.state.text}
        />
        </div>
      )
    );
  }
}

export default DropTarget(Types.ITEM, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(TextEditor);
