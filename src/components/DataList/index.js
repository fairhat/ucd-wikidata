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

    const orderedData = !this.props.direct && _.map(_.groupBy(this.props.data, "wdLabel"), d => {
      const values = _.map(d, e => ({ value: e.ps_Label, tip: e.pq_Label }));
      
      return ({
        label: d[0].wdLabel,
        values: values,
      });
    });

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
            borderTop: "3px solid white"
          }}
        >
          {this.props.title}
        </span>
        <Scrollbars style={{ height: "290px", width: "350px", border: "3px solid white" }} autoHide hideTracksWhenNotNeeded>
          {!this.props.direct && orderedData.map(item => <SnippetV2 label={item.label} values={item.values} />)}
          {this.props.direct && this.props.data.map(item => <SnippetV2 label={item.label} values={[item.value]} direct />)}
          <div style={{ background: "white", height: "20px" }} />
        </Scrollbars>
      </div>
    );
  }
}
