import React from "react";
import { Button } from "antd";
import Icon from "material-icons-react";
import PropTypes from "prop-types";
import "./style.css";

const DataLabel = ({ label }) =>
  <span className="label">
    {label}
  </span>;

class DataSnippet extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    context: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    label: "Label",
    value: "value",
    context: "unused",
    children: null
  };

  render() {
    return (
      <div
        style={{
          height: "80px",
          minWidth: "170px",
          textAlign: "left",
          padding: "5px"
        }}
      >
        <DataLabel label={this.props.label} />
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
          <div className="ant-btn grabbable-el">
            <div style={{ top: "4px", position: "relative" }}>
              <Icon icon="control_camera" size="tiny" />
            </div>
          </div>
        </Button.Group>
        </div>
      </div>
    );
  }
}

export default DataSnippet;
export { DataValue };