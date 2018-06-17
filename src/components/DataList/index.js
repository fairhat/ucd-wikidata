import React from "react";
import PropTypes from "prop-types";
import SnippetV2 from "../DataSnippetV2/";
import { Scrollbars } from "react-custom-scrollbars";
import _ from "lodash";

export default class DataList extends React.Component {
  static propTypes = {
    first: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.object,
    title: PropTypes.string,
    lang: PropTypes.string,
  }

  static defaultProps = {
    first: false,
    type: null,
    data: {},
    title: "-",
    lang: "de",
  }

  render() {
    const leftMargin = this.props.first ? {} : {
      marginLeft: "10px"
    };

    const data = [];

    if (this.props.type === "alias") {
      this.props.data.aliases[this.props.lang].forEach(alias => data.push({
        label: "alias",
        value: alias.value
      }))
    }

    if (this.props.type === "chronology") {
    }

    return (
      <div style={{ width: "150px", display: "inline-block", ...leftMargin }}>
        <span
          style={{
            background: "white",
            textAlign: "center",
            padding: "0 8px 5px 6px",
            height: "20px",
            marginBottom: "0",
            borderTopRadius: "25px",
            borderTop: "3px solid white"
          }}
        >
          {this.props.title}
        </span>
        <Scrollbars style={{ height: "290px", width: "150px", border: "3px solid white" }} autoHide hideTracksWhenNotNeeded>
          {data.map(item => <SnippetV2 label={item.label} value={item.value} />)}
          <div style={{ background: "white", height: "20px" }} />
        </Scrollbars>
      </div>
    );
  }
}
