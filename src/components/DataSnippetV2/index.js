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
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    // if (dropResult) {
    //   console.log(dropResult);
    // }

    return props;
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
    direct: PropTypes.bool
  };

  static defaultProps = {
    label: null,
    values: ["-"],
    direct: false
  };

  state = {
    hover: false,
    showMultiple: false
  };

  mouseEnter = () => this.setState({ hover: true });
  mouseLeave = () => this.setState({ hover: false });

  toggleMultiple = () =>
    this.props.values.length > 1
      ? this.setState({
          showMultiple: !this.state.showMultiple
        })
      : {};

  render() {
    const {
      isDragging,
      connectDragSource,
      connectDragPreview,
      src,
      direct
    } = this.props;

    const multiValueTooltip =
      this.props.values.length > 1
        ? `Es existieren ${this.props.values
            .length} Einträge. Hier klicken, um alle zu sehen.`
        : `Es existiert 1 Eintrag.`;

    const mainVal = this.props.direct
      ? this.props.values[0]
      : this.props.values[0].value;
    let isImage = false;
    let isAudio = false;

    if (mainVal.indexOf(".jpg") !== -1 || mainVal.indexOf(".svg") !== -1) {
      isImage = true;
    }

    if (mainVal.indexOf(".ogg") !== -1 || mainVal.indexOf(".oga") !== -1) {
      isAudio = true;
    }

    return connectDragSource(
      <div
        style={{
          padding: "5px",
          background: "white",
          cursor: "grab",
          borderBottom: "1px solid #ddd",
          borderTop: "1px solid #ddd",
          position: "relative",
          minHeight: "65px"
        }}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {this.props.label &&
          <p style={{ color: "#aaa", marginBottom: "0", marginLeft: "25px" }}>
            {this.props.label}
          </p>}
        {!this.props.direct &&
          <Tooltip title={multiValueTooltip}>
            <Popover
              content={
                <DataList
                  title={this.props.label}
                  data={this.props.values}
                  direct
                />
              }
              trigger="click"
              placement="bottom"
            >
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
          <div style={{ width: "calc(100% - 25px)", marginLeft: "25px" }}>
            {isImage &&
              <span>
                {!this.props.direct && <img src={mainVal} width="200" />}
                {this.props.direct && <img src={mainVal} width="200" />}
              </span>}
            {isAudio &&
              <audio controls>
                <source src={mainVal} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>}
            {!isImage &&
              !isAudio &&
              <div>
                {!this.props.direct &&
                  <Tooltip title={this.props.values[0].tip}>
                    {this.props.values[0].value}
                  </Tooltip>}
                {this.props.direct && this.props.values[0]}
              </div>}
          </div>
        )}
        {this.state.hover &&
          <img
            src={dragIcon}
            width="35"
            style={{ position: "absolute", left: 0, bottom: 8 }}
          />}
      </div>
    );
  }
}

export default DragSource(Types.ITEM, itemSource, collect)(Snippet);
