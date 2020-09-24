import { createContext, useContext } from 'react';

type CurrentMode = {
  mode: string;
  toggleMode: (newMode: string) => void;
};

const currentModeContext = createContext<CurrentMode | undefined>(
  undefined,
);

const useCurrentMode = () => useContext(currentModeContext);

export { currentModeContext, useCurrentMode };
