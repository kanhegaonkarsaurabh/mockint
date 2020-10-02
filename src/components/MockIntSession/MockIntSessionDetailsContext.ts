import { createContext, useContext } from 'react';
import { SessionData } from './MockIntSessionTypes';
// non-null assertion operator to give an initial type to the context
const SessionDetailsContext = createContext<SessionData>(undefined!);

const useSessionDetails = () => useContext(SessionDetailsContext);

export { SessionDetailsContext, useSessionDetails };
