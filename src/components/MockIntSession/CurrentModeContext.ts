import { createContext, useContext } from 'react';

type CurrentMode = {
  mode: string;
  toggleMode: (newMode: string) => void;
};

const CurrentModeContext = createContext<CurrentMode>(undefined!);

const useCurrentMode = () => useContext(CurrentModeContext);

export { CurrentModeContext, useCurrentMode };
