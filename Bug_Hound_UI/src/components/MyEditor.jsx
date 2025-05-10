import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const MyEditor = () => {
  const [content, setContent] = useState("");

  return (
    <>
    <div style={{ width: "80%", margin: "auto", padding: "20px" }}>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onReady={(editor) => {
          console.log(" CKEditor Loaded:", editor);
        }}
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}
      />
    </div>
    </>
  );
};

export default MyEditor;
