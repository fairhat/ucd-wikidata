import React from "react";
import { Button } from "antd";
import { action } from "@storybook/addon-actions";
import Icon from "material-icons-react";
import PropTypes from "prop-types";
import "./style.css";

export default class HelpComponent extends React.Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    return (
      <Button className="HelpButton" shape="circle" size="large" icon="question">
      </Button>
    );
  }
}
