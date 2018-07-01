import React from "react";
import { Row, Input, Icon } from "antd";
import WikiButton from "../WikiButton/";
const Search = Input.Search;

const WikiTopBar = () =>
  <Row className="wikibar">
    <Row align="top">
      <div style={{ float: "right", fontSize: "0.75rem", marginBottom: "10px" }}>
        <span style={{ paddingLeft: "4px", paddingRight: "4px", color: "darkred" }}>
          <Icon type="user" /> Nicht angemeldet
        </span>
        <span style={{ paddingLeft: "4px", paddingRight: "4px" }}>Diskussionsseite</span>
        <span style={{ paddingLeft: "4px", paddingRight: "4px" }}>Beiträge</span>
        <span style={{ paddingLeft: "4px", paddingRight: "4px", color: "darkred" }}>Anmelden</span>
      </div>
    </Row>
    <Row>
      <div style={{ float: "left", fontSize: "0.75rem" }}>
        <WikiButton htmlType="button" isWhite>
          Artikel
        </WikiButton>
        <WikiButton htmlType="button">Diskussion</WikiButton>
      </div>
      <div style={{ float: "right" }}>
        <WikiButton htmlType="button">Lesen</WikiButton>
        <WikiButton htmlType="button" isWhite>
          Bearbeiten
        </WikiButton>
        <WikiButton htmlType="button">Quelltext bearbeiten</WikiButton>
        <WikiButton htmlType="button">Versionsgeschichte</WikiButton>
        <WikiButton htmlType="button" icon="star-o" />
        <WikiButton htmlType="button">
          Mehr <Icon type="down" />
        </WikiButton>
        <Search
          placeholder="Wikipedia durchsuchen"
          style={{ width: "250px", marginLeft: "10px" }}
        />
      </div>
      <div style={{ clear: "both" }} />
    </Row>
  </Row>;

export default WikiTopBar;
