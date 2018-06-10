import React from "react";
import { Button } from "antd";
import { Tooltip } from "antd"
import "./style.css";

export default class HelpComponent extends React.Component {
  render() {
    return (
      <div>
        <Tooltip placement="bottomRight" title={"Die Datenschnipsel links von hier enthalten Informationen aus Wikidata. Du kannst sie beispielsweise per Drag'n'Drop in deinem Artikel verwenden."}>
          <Button disabled className="HelpButton" shape="circle" size="large" icon="question" >
          </Button>
        </Tooltip>
      </div>
    );
  }
}
