import React, {
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import Editor from '@monaco-editor/react';
import EventEmitterContext from './EventEmitterContext';

export interface EditorProps {
  language: string;
}

export default function MockIntSessionEditor({
  language,
}: EditorProps) {
  const eventEmitter = useContext(EventEmitterContext);
  // when a mock int session ends, clear the cached editorvalues
  eventEmitter.on('mockIntSessionEnd', (): void => {
    localStorage.removeItem('editorValue');
  });

  const editorRef = useRef<any>();
  const [initialEditorValue, setInitialEditorValue] = useState<
    string
  >('// start writing code here');
  const onEditorMounted = (_: any, editor: any): void => {
    editorRef.current = editor;
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

  return (
    <Editor
      height="100%"
      value={initialEditorValue}
      language={language}
      editorDidMount={onEditorMounted}
      options={{
        quickSuggestions: false,
      }}
    />
  );
}
