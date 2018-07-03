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
      <div style={{ width: "419px", display: "inline-block", ...leftMargin }}>
        <p
          style={{
            background: "white",
            textAlign: "center",
            background: "#eaecf0",
            fontWeight: "bold",
            fontFamily: "sans-serif, Georgia",
            marginBottom: "0",
            border: "1px solid #a2a9b1",
            borderBottom: "none",
            zIndex: 22
          }}
        >
          {this.props.title}
        </p>
        <Scrollbars style={{ height: "290px", width: "419px", border: "1px solid #a2a9b1", background: "white" }} hideTracksWhenNotNeeded>
          {!direct && orderedData.map(item => <SnippetV2 label={item.label} values={item.values} key={item.label} />)}
          {direct && this.props.data.map(item => <SnippetV2 label={item.label} values={[item.value]} direct key={item.label} />)}
          <div style={{ background: "white", height: "20px" }} />
        </Scrollbars>
      </div>
    );
  }
}
