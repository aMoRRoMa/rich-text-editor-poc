import {useState} from 'react'
import './App.css'

import Editor from './components/Editor/Editor.tsx'
import SmartText from "./components/SmartText/SmartText.tsx";

function App() {
  const [showRichTextEditor, setShowRichTextEditor] = useState(false)
  return (
    <>
      <div>
        <button onClick={() => setShowRichTextEditor(true)}>Show Rich Text Editor</button>
        <button onClick={() => setShowRichTextEditor(false)}>Show Smart Text</button>
      </div>
      {showRichTextEditor && <Editor/>}
      {!showRichTextEditor && <SmartText/>}
    </>
  )
}

export default App
