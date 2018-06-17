import { DragSource } from "react-dnd";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "material-icons-react";
import dragIcon from "./Press-and-Drag.svg";
import { List } from "antd";

const Types = {
  ITEM: "snippet"
};

const itemSource = {
  beginDrag(props) {
    /* code here */
    return props;
  },
  endDrag(props) {
    /* code here */
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Snippet extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    label: "-",
    value: ""
  };

  state = {
    hover: false
  };

  mouseEnter = () => this.setState({ hover: true });
  mouseLeave = () => this.setState({ hover: false });

  render() {
    const {
      isDragging,
      connectDragSource,
      connectDragPreview,
      src
    } = this.props;

    return connectDragSource(
      <div
        style={{
          padding: "5px",
          background: "white",
          cursor: "grab",
          borderBottom: "2px solid #ddd"
        }}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {this.props.label &&
          <p style={{ color: "#aaa", marginBottom: "0" }}>
            {this.props.label}
          </p>}
        {connectDragPreview(
          (
            <span>
              {this.props.value}
            </span>
          )
        )}
        {this.state.hover &&
          (
            <img
              src={dragIcon}
              width="30"
              style={{ position: "absolute", right: 0 }}
            />
          )}
      </div>
    );
  }
}

export default DragSource(Types.ITEM, itemSource, collect)(Snippet);
