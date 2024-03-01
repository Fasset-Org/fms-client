import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useFormikContext } from "formik";
import htmlToDraft from "html-to-draftjs";

const RichTextEditor = () => {
  let content = "";
  const { setFieldValue, values } = useFormikContext();
  content = values?.content;

  const [editorState, setEditorState] = React.useState(() => {
    if (content.length > 0) {
      const contentBlocks = htmlToDraft(content);
      const contentState = ContentState.createFromBlockArray(
        contentBlocks.contentBlocks,
        contentBlocks.entityMap
      );
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setFieldValue("content", html);
  };

  return (
    <div>
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        editorState={editorState}
        editorStyle={{ height: 200 }}
      />
    </div>
  );
};

export default RichTextEditor;
