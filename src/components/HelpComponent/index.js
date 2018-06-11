import React from "react";
import { Button, Tooltip, Modal } from "antd";
import "./style.css";

export default class HelpComponent extends React.Component {
  showInfo = () => {
    Modal.info({
      title: 'DataSnippet Hilfe',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  }

  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <Tooltip placement="bottomRight" title={"Die Datenschnipsel links von hier enthalten Informationen aus Wikidata. Du kannst sie beispielsweise per Drag'n'Drop in deinem Artikel verwenden."}>
          <Button onClick={this.showInfo} className="HelpButton" shape="circle" size="large" icon="question" >
          </Button>
        </Tooltip>
      </div>
    );
  }
}
