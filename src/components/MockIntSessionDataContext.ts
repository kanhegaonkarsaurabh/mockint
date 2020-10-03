import { createContext, useContext } from 'react';
import { FirebaseStoredSession } from '../data/firebase';
// non-null assertion operator to give an initial type to the context
const SessionDataContext = createContext<FirebaseStoredSession>(
  undefined!,
);

const useSessionData = () => useContext(SessionDataContext);

export { SessionDataContext, useSessionData };
