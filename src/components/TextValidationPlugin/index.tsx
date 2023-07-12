import {useEffect, useLayoutEffect, useState} from 'react'

import {$isTextNode, LexicalCommand, createCommand, COMMAND_PRIORITY_EDITOR, $getNodeByKey} from 'lexical'
// import {$generateHtmlFromNodes} from '@lexical/html'
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$createTextWithErrorsNode} from "../SmartText/TextWithErrorsNode.tsx";


const MOCK_TEXT_WITH_GRAMMAR_ERRORS = 'I has, he have, we has.';
const validate = (key: string, text: string) => {
  let response: unknown = {"exception_logs":[],"is_valid":true,"validation_outputs":[]}
  if (text === MOCK_TEXT_WITH_GRAMMAR_ERRORS) {
    response = {
      "exception_logs": [],
      "is_valid": false,
      "validation_outputs": [
        {
          "description": "Possible agreement error — use the base form here.",
          "fix_suggestions": [
            "have"
          ],
          "identified_token": "has",
          "name": "annotation",
          "token_end_index": 5,
          "token_start_index": 2,
          "type": "GRAMMAR_CHECK"
        },
        {
          "description": "The pronoun ‘he’ is usually used with a third-person or a past tense verb.",
          "fix_suggestions": [
            "has",
            "had"
          ],
          "identified_token": "have",
          "name": "annotation",
          "token_end_index": 14,
          "token_start_index": 10,
          "type": "GRAMMAR_CHECK"
        },
        {
          "description": "The pronoun ‘we’ must be used with a non-third-person form of a verb.",
          "fix_suggestions": [
            "have"
          ],
          "identified_token": "has",
          "name": "annotation",
          "token_end_index": 22,
          "token_start_index": 19,
          "type": "GRAMMAR_CHECK"
        }
      ]
    }
  }
  return [key, response]
}

const HIGHLIGHT_ERRORS_COMMAND: LexicalCommand<Record<string, unknown>> = createCommand()

function TextValidationPlugin() {
  const [editor] = useLexicalComposerContext();
  const [errors, setErrors] = useState<Record<string, unknown>>({})
  useLayoutEffect(() => {
    return editor.registerTextContentListener((_) => {
      // editor.update(() => {
      //   const htmlString = $generateHtmlFromNodes(editor,null);
      //   console.log('htmlString', htmlString);
      // })
      const editorState = editor.getEditorState()
      const texts: Record<string, string> = {};
      editorState.read(async () => {
        editor.getEditorState()._nodeMap.forEach((value, key) => {
          if ($isTextNode(value)) {
            Object.assign(texts, {[key]: value.getTextContent()})
          }
        });
        console.log(texts)
        setErrors(Object.entries(texts).reduce((acc, item) => {
          const [textKey, text] = item
          const [resultKey, result] = validate(textKey, text)
          return Object.assign(acc, {[resultKey as string]: result})
        }, {}))
      })
    })
  })

  useEffect(() => {
    editor.dispatchCommand(HIGHLIGHT_ERRORS_COMMAND, errors)
  }, [editor, errors])
  
  useEffect(() => {
    return editor.registerCommand(
      HIGHLIGHT_ERRORS_COMMAND,
      (payload) => {
        console.log('payload', payload)
        editor.update(() => {
          const keys = Object.keys(payload)
          keys.forEach((key) => {
            const originalNode = $getNodeByKey(key)
            if (originalNode) {
              const newNode = $createTextWithErrorsNode(originalNode.__text, payload[key])
              originalNode.replace(newNode)
            }
            console.log('originalNode', originalNode)
          })
        })
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}

export default TextValidationPlugin
