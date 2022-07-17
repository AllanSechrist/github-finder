import GITHUB_AUTH from "./Secrets";
import axios from "axios";

const GITHUB_URL = "https://api.github.com";
const GITHUB_TOKEN = GITHUB_AUTH;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

// search users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

// get user and their repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);
  return { user: user.data, repos: repos.data };
};
