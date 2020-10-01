import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

export default class MockIntYj {
  private yDoc: Y.Doc;

  private yjsProvider: WebrtcProvider;

  constructor(sessionName: string) {
    console.log('here');
    // initialize yjs and shared data bindings
    this.yDoc = new Y.Doc();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.yjsProvider = new WebrtcProvider(sessionName, this.yDoc, {
      signaling: ['ws://localhost:4444'],
    });
  }

  get ydoc(): Y.Doc {
    return this.yDoc;
  }

  get provider(): WebrtcProvider {
    return this.yjsProvider;
  }
}
