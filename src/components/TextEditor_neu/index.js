import React from "react";
import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  ConnectDropTarget,
} from 'react-dnd';

import { Editor, stateToHTML } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, convertToRaw, Entity, Modifier } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'


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

const init_text = '<h1>Erde</h1><p>Die <b>Erde</b> ist der <a href="/wiki/Dichte" title="Dichte">dichteste</a>, fünftgrößte und der <a href="/wiki/Sonne" title="Sonne">Sonne</a> drittnächste <a href="/wiki/Planet" title="Planet">Planet</a> des <a href="/wiki/Sonnensystem" title="Sonnensystem">Sonnensystems</a>. Sie ist Ursprungsort und Heimat aller bekannten <a href="/wiki/Lebewesen" title="Lebewesen">Lebewesen</a>. Ihr Durchmesser beträgt mehr als 12.700 <a href="/wiki/Kilometer" class="mw-redirect" title="Kilometer">Kilometer</a> und ihr Alter etwa 4,6 Milliarden <a href="/wiki/Jahr" title="Jahr">Jahre</a>. Nach ihrer vorherrschenden <a href="/wiki/Geochemie" title="Geochemie">geochemischen</a> Beschaffenheit wurde der Begriff der „<a href="/wiki/Erd%C3%A4hnlicher_Planet" class="mw-redirect" title="Erdähnlicher Planet">erdähnlichen Planeten</a>“ geprägt. Das <a href="/wiki/Astronomisches_Symbol" title="Astronomisches Symbol">astronomische Symbol</a> der Erde ist <a href="/wiki/%E2%99%81" title="♁">♁</a> oder <a href="/wiki/Radkreuz" title="Radkreuz">⊕</a>.<sup id="cite_ref-4" class="reference"><a href="#cite_note-4">[4]</a></sup></p><p>Da die Erdoberfläche zu etwa zwei Dritteln aus <a href="/wiki/Wasser" title="Wasser">Wasser</a> besteht und daher die Erde vom <a href="/wiki/Weltraum" title="Weltraum">All</a> betrachtet vorwiegend blau erscheint, wird sie auch <b>Blauer Planet</b> genannt. Sie wird <a href="/wiki/Metapher" title="Metapher">metaphorisch</a> auch als „<a href="/wiki/Raumschiff_Erde" title="Raumschiff Erde">Raumschiff Erde</a>“ bezeichnet.</p>'

class TextEditor_neu extends React.Component {
  state = {
    //text: "Die Erde hat einen Radius von m",
    editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(init_text)))
  };

  addValue = value => {
    const currentContent = stateToHTML(this.state.editorState)
    //const currentContent_ = JSON.stringify(convertToRaw(currentContent))
    //const content = ContentState.createFromText(value) //convertToRaw(this.state.editorState.getCurrentContent());
    console.log("CONTENT",currentContent)

    this.setState({editorState: EditorState.push(this.state.editorState, currentContent+content)});
  }

  onEditorStateChange = editorState => {
    this.setState({editorState})
  }


  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver

    return (
      connectDropTarget &&
      connectDropTarget(
        <div>
          <Editor
            style={{ width: "100%", marginTop: "10px" }}
            rows="15" 
            toolbarHidden="true" 
            background = "white"
            //toolbarClassName="toolbarClassName"
            //wrapperClassName="wrapperClassName"
            //editorClassName="editorClassName"
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
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
