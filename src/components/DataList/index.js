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
      <div style={{ width: "422.5px", display: "inline-block", ...leftMargin }}>
        <p
          style={{
            background: "white",
            textAlign: "center",
            // padding: "0 8px 5px 6px",
            marginBottom: "0",
            border: "1px solid #a2a9b1",
            borderBottom: "none",
            // borderTop: "3px solid white",
            // borderBottom: direct ? "2px solid white" : "none",
            // bottom: "1px",
            // width: "80px",
            zIndex: 22
          }}
        >
          {this.props.title}
        </p>
        <Scrollbars style={{ height: "290px", width: "422.5px", border: "1px solid #a2a9b1", background: "white" }} hideTracksWhenNotNeeded>
          {!direct && orderedData.map(item => <SnippetV2 label={item.label} values={item.values} />)}
          {direct && this.props.data.map(item => <SnippetV2 label={item.label} values={[item.value]} direct />)}
          <div style={{ background: "white", height: "20px" }} />
        </Scrollbars>
      </div>
    );
  }
}
