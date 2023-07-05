import {FC, useState} from 'react'

import ReactJson from 'react-json-view'

import {EditorState, LexicalEditor} from 'lexical'
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {$generateHtmlFromNodes} from '@lexical/html';

const Output: FC = () => {
  const [outputJSON, setOutputJSON] = useState({});
  const [outputHTML, setOutputHTML] = useState('');
  const onChangeHandler = (editorState: EditorState, editor: LexicalEditor) => {
    setOutputJSON(editorState.toJSON())
    editor.update(() => {
      setOutputHTML($generateHtmlFromNodes(editor, null))
    })
  };
  return (
    <>
      <OnChangePlugin onChange={onChangeHandler}/>
      <div className="outputJSON"><ReactJson src={outputJSON} /></div>
      <div className="outputHTML"><pre>{outputHTML}</pre></div>
    </>
  )
}

export default Output
