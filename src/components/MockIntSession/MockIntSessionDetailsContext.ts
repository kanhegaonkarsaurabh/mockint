import { createContext, useContext } from 'react';
import { SessionDetails } from './MockIntSessionTypes';
// non-null assertion operator to give an initial type to the context
const SessionDetailsContext = createContext<SessionDetails>(
  undefined!,
);

const useSessionDetails = () => useContext(SessionDetailsContext);

export { SessionDetailsContext, useSessionDetails };
