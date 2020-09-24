import { createContext, useContext } from 'react';

export type SessionDetails = {
  sessionName: string;
  sessionLanguage: string;
  sessionTime: number;
  sessionQuestion: string;
};

// non-null assertion operator to give an initial type to the context
const SessionDetailsContext = createContext<SessionDetails>(
  undefined!,
);

const useSessionDetails = () => useContext(SessionDetailsContext);

export { SessionDetailsContext, useSessionDetails };
