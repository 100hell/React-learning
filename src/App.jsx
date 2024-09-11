import React, { useContext } from "react";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthPage from "./components/AuthPage";
import PostPage from "./components/PostPage";
import UserPage from "./components/UserPage";

const App = () => {
  // const { user } = useContext(AuthContext);

  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<AuthPage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/user/:username" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
