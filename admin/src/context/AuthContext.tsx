import { createContext, useEffect, useReducer } from "react";

interface User {
  // Define the properties of your user object
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | Error | null; // Обновленный тип для ошибки
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string | Error | null; // Обновленный тип для ошибки
  dispatch: (action: AuthAction) => void;
}

interface AuthAction {
  type: string;
  payload?: User | string | Error; // Обновленный тип для payload
}
const INITIAL_STATE: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

export const AuthContext = createContext<AuthContextProps>({
  user: INITIAL_STATE.user,
  loading: INITIAL_STATE.loading,
  error: INITIAL_STATE.error,
  dispatch: () => {},
});

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload as User,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload as string,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
