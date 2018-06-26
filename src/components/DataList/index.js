import React from "react";
import PropTypes from "prop-types";
import SnippetV2 from "../DataSnippetV2/";
import { Scrollbars } from "react-custom-scrollbars";
import _ from "lodash";

export default class DataList extends React.Component {
  static propTypes = {
    first: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.array,
    title: PropTypes.string,
    lang: PropTypes.string,
    direct: PropTypes.bool,
  }

  static defaultProps = {
    first: false,
    type: null,
    data: [],
    title: "-",
    lang: "de",
    direct: false,
  }

  render() {
    const leftMargin = this.props.first ? {} : {
      marginLeft: "10px"
    };
    const { direct } = this.props;

    const orderedData = this.props.data;

    return (
      <div style={{ width: "350px", display: "inline-block", ...leftMargin }}>
        <span
          style={{
            background: "white",
            textAlign: "center",
            padding: "0 8px 5px 6px",
            height: "20px",
            marginBottom: "0",
            borderTopRadius: "25px",
            borderTop: "3px solid white",
            borderBottom: direct ? "2px solid #ccc" : "none",
          }}
        >
          {this.props.title}
        </span>
        <Scrollbars style={{ height: "290px", width: "350px", border: "3px solid white" }} hideTracksWhenNotNeeded>
          {!direct && orderedData.map(item => <SnippetV2 label={item.label} values={item.values} />)}
          {direct && this.props.data.map(item => <SnippetV2 label={item.label} values={[item.value]} direct />)}
          <div style={{ background: "white", height: "20px" }} />
        </Scrollbars>
      </div>
    );
  }
}
