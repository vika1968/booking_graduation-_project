import { createContext, useReducer, ReactNode, Dispatch } from "react";
import DarkModeReducer from "./darkModeReducer";

interface DarkModeState {
  darkMode: boolean;
}

interface DarkModeContextProps {
  darkMode: boolean;
  dispatch: Dispatch<DarkModeAction>;
}

type DarkModeAction =
  | { type: "LIGHT" }
  | { type: "DARK" }
  | { type: "TOGGLE" };

const INITIAL_STATE: DarkModeState = {
  darkMode: false,
};

export const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: INITIAL_STATE.darkMode,
  dispatch: () => {},
});

export const DarkModeContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
