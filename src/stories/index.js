import React from "react";
import 'antd/dist/antd.css';
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import DataSnippet from "../components/DataSnippet/";
import SnippetList from "../components/SnippetList/";
import DraggableSnippet from "../components/DraggableSnippet/";
import { defaultList } from "../components/SnippetList/example-data";

const editableList = defaultList.map((entry, i) => ({
  label: text(`label ${i}`, entry.label),
  value: text(`value ${i}`, entry.value)
}));

const Center = ({ children }) => (
  <div style={{ margin: "0 auto", marginTop: "20px" }}>
    { children }
  </div>
);

const DataSnippetStories = storiesOf("DataSnippet", module);

DataSnippetStories.addDecorator(withKnobs);

DataSnippetStories
  .add("single", () => (
    <Center>
      <DataSnippet label={text("Label", "label")} value={text("Value", "value")} />
    </Center>
  ))
  .add("list", () => (
    <SnippetList entries={editableList} />
  ))
  .add("draggable", () => (<DraggableSnippet id="1" />))