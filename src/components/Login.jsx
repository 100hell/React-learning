import React, { useState, useContext } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const toast = useToast();
  const { setUser, setAuthType } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   const userData = { username, password };

  //   let users = JSON.parse(localStorage.getItem("users"));
  //   let found = false;

  //   for (const user of users) {
  //     if (user.username === username && user.password === password) {
  //       found = true;
  //       break;
  //     }
  //   }
  //   console.log(found);
  //   if (found) {
  //     setUser(userData);
  //     localStorage.setItem("user", JSON.stringify(userData));
  //     toast({
  //       title: "Login successful",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } else {
  //     toast({
  //       title: "Wrong username or password",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }

  //   setUsername("");
  //   setPassword("");
  // };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      toast({
        title: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <VStack spacing={4} width="300px" m="auto">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleLogin}>
        Login
      </Button>
      <p>
        Don't have account{" "}
        <button
          onClick={() => {
            setAuthType("signup");
          }}
        >
          Signup here
        </button>
      </p>
    </VStack>
  );
};

export default Login;
