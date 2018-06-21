import { DragSource } from "react-dnd";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "material-icons-react";
import dragIcon from "./Press-and-Drag.svg";
import { List, Tag, Tooltip, Popover } from "antd";
import DataList from "../DataList/";

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
    values: PropTypes.arrayOf(PropTypes.object),
    direct: PropTypes.bool,
  };

  static defaultProps = {
    label: null,
    values: [ "-" ],
    direct: false,
  };

  state = {
    hover: false,
    showMultiple: false
  };

  mouseEnter = () => this.setState({ hover: true });
  mouseLeave = () => this.setState({ hover: false });

  toggleMultiple = () => this.props.values.length > 1 ? this.setState({
    showMultiple: !this.state.showMultiple
  }) : {};

  render() {
    const {
      isDragging,
      connectDragSource,
      connectDragPreview,
      src
    } = this.props;

    const multiValueTooltip = this.props.values.length > 1 ? 
      `Es existieren ${this.props.values.length} Einträge. Hier klicken, um alle zu sehen.` :
      `Es existiert 1 Eintrag.`;

    const mainVal = this.props.direct ? this.props.values[0] : this.props.values[0].value;
    let isImage = false;

    if (this.props.direct && this.props.values[0].indexOf(".jpg") !== -1) {
      isImage = true;
    }

    if (!this.props.direct && this.props.values[0].value.indexOf(".jpg") !== -1) {
      isImage = true;
    }

    return connectDragSource(
      <div
        style={{
          padding: "5px",
          background: "white",
          cursor: "grab",
          borderBottom: "2px solid #ddd",
          position: "relative",
          minHeight: "65px"
        }}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {this.props.label &&
          <p style={{ color: "#aaa", marginBottom: "0" }}>
            {this.props.label}
          </p>}
          { !this.props.direct && <Tooltip title={multiValueTooltip}>
            <Popover
              content={<DataList title={this.props.label} data={this.props.values} direct />}
              trigger="click"
              placement="bottom">
              <Tag
                style={{
                  position: "absolute",
                  right: 0,
                  top: 3,
                  color: "#aaa",
                  borderRadius: "20px",
                  background: "none",
                  borderColor: "#ccc"
                }}
                color="#ddd"
              >
                {this.props.values.length}
              </Tag>
            </Popover>
          </Tooltip>}
        {connectDragPreview(
          <div style={{ width: "100%"}}>
            {
              isImage && <span>
                {!this.props.direct && <img src={this.props.values[0].value} width="200" />}
                {this.props.direct && <img src={this.props.values[0]} width="200" />}
              </span>
            }
            { !isImage && <span>
              {!this.props.direct && <Tooltip title={this.props.values[0].label}>{this.props.values[0].value}</Tooltip>}
              {this.props.direct && this.props.values[0]}
            </span>}
          </div>
        )}
        {this.state.hover &&
          <img
            src={dragIcon}
            width="35"
            style={{ position: "absolute", right: 0, bottom: 3 }}
          />}
      </div>
    );
  }
}

export default DragSource(Types.ITEM, itemSource, collect)(Snippet);
