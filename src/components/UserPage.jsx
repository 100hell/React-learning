import React from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { username } = useParams();
  return <div>UserPage for {username}</div>;
};

export default UserPage;
