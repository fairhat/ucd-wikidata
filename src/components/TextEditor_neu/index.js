import React from "react";
import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  ConnectDropTarget,
} from 'react-dnd';
import { Row, Col } from "antd";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, Modifier } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css';


const Types = {
  ITEM: "snippet"
};

const boxTarget = {
  drop(props, monitor, comp, ...args) {
    const item = monitor.getItem();
    const val = item ? item.values[0].value : "";
    console.log(props, monitor, comp, ...args);
    comp.addValue(val);
    return { name: "TextEditor" };
  }
}

const init_text = `
  <h1>Erde</h1>
  <p>Die <b>Erde</b> ist der <a href="/wiki/Dichte" title="Dichte">dichteste</a>,
  fünftgrößte und der <a href="/wiki/Sonne" title="Sonne">Sonne</a> drittnächste
  <a href="/wiki/Planet" title="Planet">Planet</a> des <a href="/wiki/Sonnensystem" title="Sonnensystem">Sonnensystems</a>.
  Sie ist Ursprungsort und Heimat aller bekannten <a href="/wiki/Lebewesen" title="Lebewesen">Lebewesen</a>. 
  Ihr Durchmesser beträgt mehr als        <a href="/wiki/Kilometer" class="mw-redirect" title="Kilometer">Kilometer</a> 
  und ihr Alter etwa 4,6 Milliarden <a href="/wiki/Jahr" title="Jahr">Jahre</a>. Nach ihrer 
  vorherrschenden <a href="/wiki/Geochemie" title="Geochemie">geochemischen</a> 
  Beschaffenheit wurde der Begriff der „<a href="/wiki/Erd%C3%A4hnlicher_Planet" class="mw-redirect" title="Erdähnlicher Planet">erdähnlichen Planeten</a>“ 
  geprägt. Das <a href="/wiki/Astronomisches_Symbol" title="Astronomisches Symbol">astronomische Symbol</a> 
  der Erde ist <a href="/wiki/%E2%99%81" title="♁">♁</a> oder <a href="/wiki/Radkreuz" title="Radkreuz">⊕</a>.
  <sup id="cite_ref-4" class="reference"><a href="#cite_note-4">[4]</a></sup></p>
  <p>Da die Erdoberfläche zu etwa zwei Dritteln aus <a href="/wiki/Wasser" title="Wasser">Wasser</a> 
  besteht und daher die Erde vom <a href="/wiki/Weltraum" title="Weltraum">All</a> betrachtet vorwiegend blau erscheint, 
  wird sie auch <b>Blauer Planet</b> genannt. Sie wird <a href="/wiki/Metapher" title="Metapher">metaphorisch</a> 
  auch als „<a href="/wiki/Raumschiff_Erde" title="Raumschiff Erde">Raumschiff Erde</a>“ bezeichnet.</p>
  <p>Das Wort für Erde ist in fast allen Sprachen <a href="/wiki/Femininum" class="mw-redirect" title="Femininum">femininum</a>.
  <sup id="cite_ref-5" class="reference"><a href="#cite_note-5">[5]</a></sup> 
  Die Erde spielt als Lebensgrundlage des Menschen in allen <a href="/wiki/Religion" title="Religion">Religionen</a> 
  eine herausragende Rolle als <a href="/wiki/Heilig" title="Heilig">heilige</a> <a href="/wiki/Ganzheit" title="Ganzheit">Ganzheit</a>; 
  in etlichen <a href="/wiki/Ethnische_Religionen" title="Ethnische Religionen">ethnischen-</a>, <a href="/wiki/Volksfr%C3%B6mmigkeit" title="Volksfrömmigkeit">Volks-</a> 
  und <a href="/wiki/Historische_Religion" class="mw-redirect" title="Historische Religion">historischen Religionen</a> 
  entweder als diffuse <a href="/wiki/Gott" title="Gott">Vergöttlichung</a> einer „<a href="/wiki/Mutter_Erde" title="Mutter Erde">Mutter Erde</a>“ 
  oder als personifizierte <a href="/wiki/Erdg%C3%B6ttin" title="Erdgöttin">Erdgöttin</a>.<sup id="cite_ref-6" class="reference"><a href="#cite_note-6">[6]</a></sup></p>`

class TextEditor_neu extends React.Component {
  state = {
    //text: "Die Erde hat einen Radius von m",
    editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(init_text)))
  };

  addValue = value => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const ncs = Modifier.insertText(contentState, selection, value);
    const es = EditorState.push(editorState, ncs, 'insert-fragment');
    this.setState({ editorState: es });
  }

  onEditorStateChange = editorState => {
    console.log("EditorChange", editorState.getCurrentContent())
    this.setState({ editorState })
  }


  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver

    return (
      connectDropTarget &&
      connectDropTarget(
        <div>
          <Row>
            <Col span={17}>
              <Editor
                style={{ width: "100%", marginTop: "10px" }}
                rows="15"
                toolbarHidden="true"
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
              />
            </Col>
            <Col span={7}>
              <div style={{background:"white"}}>
                <div style={{paddingTop:"100px"}}>
                  <div style={{ background: "rgb(176, 196, 222)", width: "100%", height: "38px", textAlign: 'center' }}>
                    <infT><b> Erde </b></infT>
                  </div>
                  <div style={{ background: "black", width: "100%", height: "350px", textAlign: 'center' }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg" width="70%" />
                  </div>
                  <div style={{ background: "rgb(220, 220, 220)", width: "100%", height: "550px" }}>
                    <infP>Die Erde, aufgenommen von Apollo 17 am 7. Dezember 1972  </infP>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )
    );
  }
}

export default DropTarget(Types.ITEM, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(TextEditor_neu);
