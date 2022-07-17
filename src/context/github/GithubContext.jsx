import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import GITHUB_AUTH from "./Secrets";

const GithubContext = createContext();

const GITHUB_URL = "https://api.github.com";
const GITHUB_TOKEN = GITHUB_AUTH;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // search users
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();
    console.log(items);
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
