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
    height: 300,
    open: true,
  };

  toggle = () => {
    this.setState({
      height: this.state.height === 300 ? 0 : 300,
      open: !this.state.open,
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
     <h3 onClick={this.toggle} style={{ cursor: "pointer", height: "27px" }}>Wikidata-Snippets <Icon type={open ? "up" : "down"} style={{}}/>  <HelpComponent style = {{transform: "translate(160px,-35px)"}}/>
              </h3>
      <Motion defaultStyle={{ height: 300 }} style={{ height: spring(this.state.height) }}>
        {interpolatingStyle =>
          <div
            style={{
              border: "1px solid #777",
              background: "#ddd",
              overflowY: "hidden",
              width: "100%",
              ...interpolatingStyle
            }}
          >
            {
              interpolatingStyle.height >= 290 && (
                <Scrollbars
              style={{ width: `100%`, height: "300px" }}
              hideTracksWhenNotNeeded
              onScrollFrame={({ scrollLeft, clientWidth }) =>
                this.setState({ offsetLeft: scrollLeft })}
            >
              <div
                style={{
                  height: "300px",
                  width: "1500px",
                  paddingBottom: "20px",
                  overflowY: "hidden"
                }}
              >
              {
                this.props.data.map((d, i) => (
                  <DataList
                    title={d.label}
                    data={d.data}
                    first={i === 0}
                    />
                ))
              }
              </div>
        
              
            </Scrollbars>
              )
            }
            { interpolatingStyle.height < 290 && <Spin style={{ transform: "translate(50%, 50%)"}} />}
          </div>}
      </Motion>
      </div>
    );
  }
}
