import React from "react";
import "antd/dist/antd.css";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs/react";
import DataSnippet from "../components/DataSnippet/";
import SnippetTip from "../components/SnippetTip/";
import SnippetList from "../components/SnippetList/";
import DraggableSnippet from "../components/DraggableSnippet/";
import { defaultList } from "../components/SnippetList/example-data";
import HelpComponent from "../components/HelpComponent";
import WikiEditor from "../components/WikiEditor";
import EditorV2 from "../components/EditorV2";
import { color } from "@storybook/addon-knobs/dist/react";

const editableList = defaultList.map((entry, i) => ({
  label: text(`label ${i}`, entry.label),
  value: text(`value ${i}`, entry.value)
}));

const Center = ({ children }) =>
  <div style={{ margin: "0 auto", marginTop: "20px" }}>
    {children}
  </div>;

const DataSnippetStories = storiesOf("DataSnippet", module);
const SnippetTipStories = storiesOf("SnippetTip", module);
const HelpComponentStories = storiesOf("HelpComponent", module);
const WikiEditorStories = storiesOf("WikiEditor", module);
const EditorV2Stories = storiesOf("EditorV2", module);

DataSnippetStories.addDecorator(withKnobs);

DataSnippetStories.add("single", () =>
  <Center>
    <DataSnippet
      label={text("Label", "label")}
      value={text("Value", "value")}
    />
  </Center>
)
  .add("list", () => <SnippetList entries={editableList} />)
  .add("draggable", () => <DraggableSnippet id="1" />);

SnippetTipStories.add("first", () =>
  <SnippetTip label={text("Label", "label")} />
);

HelpComponentStories.add("first", () =>
  <div style={{ position: "fixed", right: "10px", top: "10px" }}>
    <HelpComponent />
  </div>
);

WikiEditorStories.add("editor", () =>
  <div>
    <WikiEditor />
  </div>
);

EditorV2Stories.add("editor", () =>
  <div>
    <EditorV2 />
  </div>
);
