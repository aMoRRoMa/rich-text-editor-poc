import { FC } from 'react';

import {
  EditorComposer,
  Editor as EditorComponent,
  ToolbarPlugin,
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  Divider,
} from 'verbum';

import './Editor.css';

import Output from "../Output/Output.tsx";

const Editor: FC = () => {
  return (
    <EditorComposer>
      <>
        <div className="editor">
          <EditorComponent hashtagsEnabled={true}>
            <ToolbarPlugin defaultFontSize="20px">
              <FontFamilyDropdown />
              <FontSizeDropdown />
              <Divider />
              <BoldButton />
              <ItalicButton />
              <UnderlineButton />
              <CodeFormatButton />
              <InsertLinkButton />
              <TextColorPicker />
              <BackgroundColorPicker />
              <TextFormatDropdown />
              <Divider />
              <InsertDropdown enablePoll={true} />
              <Divider />
              <AlignDropdown />
            </ToolbarPlugin>
          </EditorComponent>
        </div>
        <Output/>
      </>
    </EditorComposer>
  );
};

export default Editor;
