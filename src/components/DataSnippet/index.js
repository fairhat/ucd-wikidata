import React from "react";
import { Button } from "antd";
import Icon from "material-icons-react";
import PropTypes from "prop-types";
import "./style.css";

export default class DataSnippet extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    label: "Label",
    value: "value"
  };

  render() {
    return (
      <div style={{ height: "80px", minWidth: "170px", maxWidth: "300px", textAlign: "left", padding: "5px" }}>
        <span className="label">{this.props.label}</span>
        <div style={{ position: "relative" }}>
          <Button.Group className="stack-lower second">
            <Button disabled>
              {this.props.value}
            </Button>
            <Button disabled className="grabbable-el">
              <div style={{ top: "4px", position: "relative" }}>
                <Icon icon="drag_indicator" size="tiny" />
              </div>
            </Button>
          </Button.Group>
          <Button.Group className="stack-lower first">
            <Button disabled>
              {this.props.value}
            </Button>
            <Button disabled className="grabbable-el">
              <div style={{ top: "4px", position: "relative" }}>
                <Icon icon="drag_indicator" size="tiny" />
              </div>
            </Button>
          </Button.Group>
          <Button.Group className="stack-upper">
            <Button>
              {this.props.value}
            </Button>
            <Button className="grabbable-el">
              <div style={{ top: "4px", position: "relative" }}>
                <Icon icon="control_camera" size="tiny" />
              </div>
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}
