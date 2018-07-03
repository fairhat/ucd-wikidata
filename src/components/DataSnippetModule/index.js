import React from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import DataList from "../DataList/";
import { Spin, Icon, Input } from "antd";
import HelpComponent from "../HelpComponent/";
import { Motion, spring } from "react-motion";

const NORMAL_HEIGHT = 360;
const MAX_HEIGHT = 500;

export default class DataSnippetModule extends React.Component {
  state = {
    offsetLeft: 0,
    height: 0,

  };

  componentWillMount() {
    if (this.props.showModule) {
      this.setState({ height: NORMAL_HEIGHT });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showModule !== nextProps.showModule) {
      this.toggle();
    }
  }

  toggle = () => {
    this.setState({
      height: this.state.height === NORMAL_HEIGHT ? 0 : NORMAL_HEIGHT
    });
  };

  render() {
    const open = this.props.showModule;

    return (
      <div>
        {/* <h3 style={{ cursor: "pointer", height: "27px" }}><span onClick={this.toggle}>Wikidata-Snippets <Icon type={open ? "up" : "down"} style={{}}/></span>  <HelpComponent style = {{transform: "translate(160px,-35px)"}}/> */}
        {/* </h3> */}
        <Motion
          defaultStyle={{ height: NORMAL_HEIGHT }}
          style={{ height: spring(this.state.height) }}
        >
          {interpolatingStyle =>
            <div
              style={{
                border: "none",
                background: "#fff",
                overflowY: "hidden",
                width: "100%",
                ...interpolatingStyle
              }}
            >
              {interpolatingStyle.height >= 340 &&
                <div style={{ background: "#ddd" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "40px",
                      background: "white",
                      borderBottom: "1px solid #ccc"
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1rem",
                        padding: "5px",
                        float: "left"
                      }}
                    >
                      <strong>Erde</strong>{" "}
                      <span style={{ color: "#ccc" }}>(Q2)</span>
                    </div>
                    <div style={{ float: "right" }}>
                      <HelpComponent />
                      <Input.Search
                        className="wd-searchbar"
                        placeholder="Einträge durchsuchen"
                        style={{
                          width: "400px",
                          marginLeft: "10px",
                          borderRadius: "0px",
                          height: "40px"
                        }}
                      />
                    </div>
                  </div>
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
                          key={i}
                        />
                      )}
                    </div>
                  </Scrollbars>
                  <div
                    style={{
                      width: "100%",
                      height: "20px",
                      background: "#eaecf0",
                      border: "1px solid #ccc",
                      cursor: "row-resize",
                      userSelect: "none",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "22px",
                        margin: "0",
                        userSelect: "none"
                      }}
                    >
                      {/* <span
                        style={{
                          display: "block",
                          height: "30px",
                          transform: "rotate(-90deg) translateX(7px)",
                          userSelect: "none"
                        }}
                      >
                        ‖
                      </span> */}
                    </p>
                  </div>
                </div>}
              {interpolatingStyle.height < 340 &&
                <Spin tip="wird geladen...">
                  <div
                    style={{
                      width: "100%",
                      minHeight: "100px",
                      height: "100%",
                      background: "white"
                    }}
                  />
                </Spin>}
            </div>}
        </Motion>
      </div>
    );
  }
}
