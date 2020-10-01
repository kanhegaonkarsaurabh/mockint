import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import { MonacoBinding } from 'y-monaco';
import { WebrtcProvider } from 'y-webrtc';
import { useSessionDetails } from './MockIntSessionDetailsContext';
import MockIntYj from './MockIntYjs';

type EditorProps = {
  yjsInstance: MockIntYj | null;
};

const MockIntSessionEditor: React.FC<EditorProps> = ({
  yjsInstance,
}: EditorProps) => {
  const { sessionLanguage } = useSessionDetails();

  const [monacoEditor, setMonacoEditor] = useState(null);
  const onEditorMounted = (_: any, editor: any): void => {
    setMonacoEditor(editor);
  };

  // when the editor is mounted, connect yjs to webrtc room
  useEffect(() => {
    if (monacoEditor == null || yjsInstance == null) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    const type = yjsInstance.ydoc.getText('monaco');
    const yjsProvider = yjsInstance.provider;

    const monacoBinding = new MonacoBinding(
      type,
      // @ts-ignore: Object is possibly 'null'.
      monacoEditor.getModel(),
      new Set([monacoEditor]),
      yjsProvider.awareness,
    );

    yjsProvider.connect();

    return () => {
    };
  }, [yjsInstance, monacoEditor]);

  return (
    <Editor
      // height="100%"
      language={sessionLanguage}
      editorDidMount={onEditorMounted}
      options={{
        quickSuggestions: false,
      }}
    />
  );
};

export default MockIntSessionEditor;
