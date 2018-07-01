import React from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import DataList from "../DataList/";
import { Spin, Icon } from "antd";
import HelpComponent from "../HelpComponent/";
import { Motion, spring } from "react-motion";

export default class DataSnippetModule extends React.Component {
  state = {
    offsetLeft: 0,
    height: 0
  };

  componentWillMount() {
    if (this.props.showModule) {
      this.setState({ height: 300 });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showModule !== nextProps.showModule) {
      this.toggle();
    }
  }

  toggle = () => {
    this.setState({
      height: this.state.height === 300 ? 0 : 300
    });
  };

  render() {
    const open = this.props.showModule;

    return (
      <div>
        {/* <h3 style={{ cursor: "pointer", height: "27px" }}><span onClick={this.toggle}>Wikidata-Snippets <Icon type={open ? "up" : "down"} style={{}}/></span>  <HelpComponent style = {{transform: "translate(160px,-35px)"}}/> */}
        {/* </h3> */}
        <Motion
          defaultStyle={{ height: 300 }}
          style={{ height: spring(this.state.height) }}
        >
          {interpolatingStyle =>
            <div
              style={{
                border: "none",
                background: "#ddd",
                overflowY: "hidden",
                width: "100%",
                ...interpolatingStyle
              }}
            >
              {interpolatingStyle.height >= 290 &&
                <div>
                  <Scrollbars
                    style={{ width: `100%`, height: "300px" }}
                    hideTracksWhenNotNeeded
                    onScrollFrame={({ scrollLeft, clientWidth }) =>
                      this.setState({ offsetLeft: scrollLeft })}
                  >
                    <div
                      style={{
                        height: "300px",
                        minWidth: "2000px",
                        paddingBottom: "20px",
                        overflowY: "hidden",
                        overflowX: "show"
                      }}
                    >
                      {this.props.data.map((d, i) =>
                        <DataList
                          title={d.label}
                          data={d.data}
                          first={i === 0}
                        />
                      )}
                    </div>
                  </Scrollbars>
                </div>}
              {interpolatingStyle.height < 290 &&
                <Spin style={{ transform: "translate(50%, 50%)" }} />}
            </div>}
        </Motion>
      </div>
    );
  }
}
