import { createContext, useReducer } from "react";

interface SearchState {
  city: string | undefined;
  dates: { startDate: Date; endDate: Date }[];
  options: {
    adult: number | undefined;
    children: number | undefined;
    room: number | undefined;
  };
}

interface SearchContextProps extends SearchState {
  dispatch: (action: SearchAction) => void;
}

interface SearchAction {
  type: string;
  payload?: any; // Modify the payload type as per your needs
}

const INITIAL_STATE: SearchState = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext<SearchContextProps>({
  ...INITIAL_STATE,
  dispatch: () => {},
});

const SearchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};







