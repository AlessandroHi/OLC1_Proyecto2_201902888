import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia, okaidiaInit } from '@uiw/codemirror-theme-okaidia';

function Editor(props) {


  return (
    <CodeMirror
    value={props.codigo}
    onChange={props.onChange}
    height="500px"
    placeholder="//Here code"
    theme={okaidia}
    extensions={[javascript({ jsx: true })]}
  />
  );
}
export default Editor;