import React, { useEffect, useState, ReactElement } from 'react';
// @ts-ignore
import Excalidraw from 'excalidraw';
import 'excalidraw/dist/excalidraw.min.css';
interface WhiteboardProps {}

export default function MockIntSessionWhiteboard({}: WhiteboardProps): ReactElement {
  return (
    <div>
      <Excalidraw options={{ zenModeEnabled: true }} />
    </div>
  );
}
