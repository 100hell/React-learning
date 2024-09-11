import { Box, Container, Grid, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import Signup from "./Signup";
import Home from "./Home";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";

const MotionBox = motion(Box);

const AuthPage = () => {
  const { user, authType } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          width="100%"
          maxW="sm"
          p={8}
        >
          <Home />
        </MotionBox>
      ) : (
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          minH="100vh"
          minW="100vw"
        >
          <Box
            display={{ base: "none", md: "block" }}
            bgImage="url('https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg')"
            bgSize="cover"
            bgPosition="center"
          />
          <Container
            maxW="container.md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <MotionBox
              initial={{ x: authType === "login" ? "100vw" : "-100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 50 }}
              width="100%"
              maxW="sm"
              p={8}
              bg="white"
              boxShadow="lg"
              borderRadius="md"
            >
              {authType === "login" ? (
                <>
                  <Heading mt={8} mb={4} textAlign="center">
                    Login
                  </Heading>
                  <Login />
                </>
              ) : (
                <>
                  <Heading mt={8} mb={4} textAlign="center">
                    Signup
                  </Heading>
                  <Signup />
                </>
              )}
            </MotionBox>
          </Container>
        </Grid>
      )}
    </>
  );
};

export default AuthPage;
