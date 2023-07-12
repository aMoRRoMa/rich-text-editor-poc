import {EditorState} from 'lexical';

import {LexicalComposer, InitialConfigType} from '@lexical/react/LexicalComposer'
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin'
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'

import './SmartText.css'
import {TextWithErrorsNode} from './TextWithErrorsNode.tsx'
import TextValidationPlugin from "../TextValidationPlugin";

const SmartText = () => {
  const initialEditorState = JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"I has, he have, we has","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})

  const initialConfig: InitialConfigType = {
    namespace: 'SmartText',
    onError: (error: Error) => { console.log('error:', error) },
    theme: {
      paragraph: 'paragraph'
    },
    nodes: [
      TextWithErrorsNode
    ],
    editorState: initialEditorState
  };
  
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const json = editorState.toJSON();
      console.log('editor state change: ', json);
      console.log('_____________________');
    })
  }
  
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
      <TextValidationPlugin />
    </LexicalComposer>
  )
}

export default SmartText
