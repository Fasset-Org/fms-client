import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useFormikContext } from "formik";
// import draftToHtml from "draftjs-to-html";
import { Stack } from "@mui/material";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const { setFieldValue } = useFormikContext();

  // const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const handleChange = (editorState) => {
    setEditorState(editorState);
    // setFieldValue("data", html);
  };

  return (
    <Stack direction="row">
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorState={editorState}
        onEditorStateChange={handleChange}
      />
    </Stack>
  );
};

export default RichTextEditor;