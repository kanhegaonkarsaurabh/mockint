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
    localStorage.removeItem('editorValue');
  });

  const [monacoEditor, setMonacoEditor] = useState(null); 
  const editorRef = useRef<any>();
  const [initialEditorValue, setInitialEditorValue] = useState<
    string
  >('// start writing code here');
  const onEditorMounted = (_: any, editor: any): void => {
    editorRef.current = editor;
    setMonacoEditor(editor);
    editorRef.current.onDidChangeModelContent(() => {
      const editorValue = localStorage.getItem('editorValue');
      // do not update the cache if the value is the same
      if (
        editorValue != null &&
        editorValue === editorRef.current.getValue()
      ) {
        return;
      }
      localStorage.setItem(
        'editorValue',
        editorRef.current.getValue(),
      );
    });
  };

  useEffect(() => {
    // initial editor value on load
    const cachedEditorValue = localStorage.getItem('editorValue');
    if (cachedEditorValue != null) {
      setInitialEditorValue(cachedEditorValue);
    }
  }, []);

  useEffect(() => {
    console.log('monaco:', monacoEditor);
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
      /** @type {monaco.editor.ITextModel} */ monacoEditor.getModel(),
      new Set([monacoEditor]),
      provider.awareness,
    );

    provider.connect();
  }, [monacoEditor]);

  return (
    <Editor
      // height="100%"
      value={initialEditorValue}
      language={sessionLanguage}
      editorDidMount={onEditorMounted}
      options={{
        quickSuggestions: false,
      }}
    />
  );
}
