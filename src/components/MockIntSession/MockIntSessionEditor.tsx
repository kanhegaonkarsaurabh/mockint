import React, {
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import { MonacoBinding } from 'y-monaco';
import { WebrtcProvider } from 'y-webrtc';
import EventEmitterContext from './EventEmitterContext';
import { useSessionDetails } from './MockIntSessionDetailsContext';


export default function MockIntSessionEditor() {
  const { sessionLanguage } = useSessionDetails();
  const eventEmitter = useContext(EventEmitterContext);
  // when a mock int session ends, clear the cached editorvalues
  eventEmitter.on('mockIntSessionEnd', (): void => {
  });

  const [monacoEditor, setMonacoEditor] = useState(null);
  const onEditorMounted = (_: any, editor: any): void => {
    setMonacoEditor(editor);
  };

  // when the editor is mounted, connect yjs to webrtc room
  useEffect(() => {
    if (monacoEditor == null) {
      return;
    }

    // initialize yjs and shared data bindings
    const ydoc = new Y.Doc();
    //@ts-ignore
    const provider = new WebrtcProvider('your-room-name', ydoc, {
      signaling: ['ws://localhost:4444'],
    });
    const type = ydoc.getText('monaco');

    const monacoBinding = new MonacoBinding(
      type,
      // @ts-ignore: Object is possibly 'null'.
      monacoEditor.getModel(),
      new Set([monacoEditor]),
      provider.awareness,
    );

    provider.connect();
  }, [monacoEditor]);

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
}
