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

const Signup = () => {
  const toast = useToast();
  const { setUser, setAuthType } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const handleSignup = () => {
  //   const userData = { username, password };

  //   let users = JSON.parse(localStorage.getItem("users"));
  //   if (users) {
  //     let found = false;

  //     for (const user of users) {
  //       if (user.username === username) {
  //         found = true;
  //         break;
  //       }
  //     }
  //     if (found) {
  //       console.log("The username exists in the array.");
  //       toast({
  //         title: "user already exists",
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     } else {
  //       let newarr = users;
  //       newarr.push(userData);
  //       localStorage.setItem("users", JSON.stringify(newarr));
  //       toast({
  //         title: "Signup successful",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //       setUser(userData);
  //       localStorage.setItem("user", JSON.stringify(userData));
  //     }
  //   } else {
  //     let arr = [];
  //     arr.push(userData);
  //     localStorage.setItem("users", JSON.stringify(arr));
  //     toast({
  //       title: "Signup successful",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     setUser(userData);
  //     localStorage.setItem("user", JSON.stringify(userData));
  //   }

  //   setUsername("");
  //   setPassword("");
  // };

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          username: username,
          password: password,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        toast({
          title: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log("error: ", error);
        return;
      }
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {}
  };

  return (
    <VStack spacing={4} width="300px" m="auto">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
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
      <Button colorScheme="blue" onClick={handleSignup}>
        Signup
      </Button>

      <p>
        Already have account{" "}
        <button
          onClick={() => {
            setAuthType("login");
          }}
        >
          login here
        </button>
      </p>
    </VStack>
  );
};

export default Signup;
