import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import GITHUB_AUTH from "./Secrets";

const GithubContext = createContext();

const GITHUB_URL = "https://api.github.com/users";
const GITHUB_TOKEN = GITHUB_AUTH;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${GITHUB_URL}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  // set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
