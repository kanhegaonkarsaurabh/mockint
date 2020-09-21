import { createContext } from 'react';
import * as mittType from 'mitt'; // hack type import
import mitt from 'mitt';

// create a new context for all of a mock int active session
const mittInstance: mittType.Emitter = mitt();
export default createContext(mittInstance);
