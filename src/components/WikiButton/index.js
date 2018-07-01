import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

const WikiButton = ({ style, isWhite = false, children, ...restProps }) => (
  <Button {...restProps} style={{
    background: !isWhite ? "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABkCAIAAADITs03AAAAO0lEQVR4AeSKhREAMQzDdN5/5uixuEKDpqgBjl2f78wd2DVj1+26/h///PfteVMN7zoGebcg1/Y/ZQQAlAUtQCujIJMAAAAASUVORK5CYII=)" : "white",
    backgroundPosition: "bottom left",
    backgroundRepeat: "repeat-x",
    color: "#0645ad",
    borderRadius: "0",
    border: "none",
    borderLeft: "1px solid transparent",
    borderRight: "1px solid transparent",
    borderImage: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, #a7d7f9 100%)",
    borderImageSlice: "1",
    padding: "6px",
    paddingTop: "17px",
    bottom: -1,
    height: "47px",
    ...style
  }}><span style={{ fontSize: "0.75rem" }}>{children}</span></Button>
);

export default WikiButton;