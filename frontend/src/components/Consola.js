import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia, okaidiaInit } from '@uiw/codemirror-theme-okaidia';

function Consola(props) {
 
  return (
    <CodeMirror
    value={props.consola}
    height="500px"
    theme={okaidia}
  />
  );
}
export default Consola;