import React from "react";
import { Tooltip } from "antd"
import PropTypes from "prop-types";
import "./style.css";

export default class SnippetTip extends React.Component {
  static propTypes = {
    label: PropTypes.string
  };

  static defaultProps = {
    label: "Label"
  };
  
  render(){
    return(
      <div>
        <Tooltip placement="bottom" title={this.props.label}>
          <span>Snippet_Fakt</span>
        </Tooltip>
      </div>
        );
      }
}
