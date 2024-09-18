import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Container, Heading } from "@chakra-ui/react";
import { Circles } from "react-loader-spinner";
import Posts from "./Posts";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const res = await fetch("http://localhost:3000/getData");
  //       const resjson = await res.json();
  //       console.log(resjson, "got data from server");
  //     } catch (error) {}
  //   }

  //   getData();
  // }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  return (
    <>
      <Box position={"absolute"} width={"full"}>
        <Container maxW="620px">
          <Heading mb={4}>Welcome, {user.username}</Heading>
          <Link to={"/explore"}>Explore Page</Link>
          <Posts />
          <button onClick={handleLogout}>Logout</button>
        </Container>
      </Box>
    </>
  );
};

export default Home;
