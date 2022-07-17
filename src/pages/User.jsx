import React, { useContext, useEffect } from "react";
import GithubContext from "../context/github/GithubContext";
import { useParams } from "react-router-dom";

function User() {
  const { getUser, user } = useContext(GithubContext);

	const {login} = useParams()

  useEffect(() => {
    getUser(login);
  }, []);

  return <div>USER</div>;
}

export default User;
