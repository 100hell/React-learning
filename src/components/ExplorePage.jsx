import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Divider, Flex } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { SingleAccountSkelaton } from "./SingleAccountSkelaton";
import { SingleAccountonExplorePage } from "./SingleAccountonExplorePage ";

export const ExplorePage = () => {
  const [exploreUsers, setExploreusers] = useState([]);
  const [loadingExploreUsers, setLoadingExploreusers] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getUser = async () => {
      setLoadingExploreusers(true);
      setExploreusers([]);
      const res = await fetch("http://localhost:3000/api/users/explore");
      const data = await res.json();
      console.log(data);
      setExploreusers(data);
      setLoadingExploreusers(false);
    };
    getUser();
  }, [setExploreusers]);
  return (
    <>
      <Box position={"absolute"} width={"full"}>
        <Container maxW="620px">
          {loadingExploreUsers && (
            <Flex flexDir={"column"} gap={2}>
              <SingleAccountSkelaton />
              <SingleAccountSkelaton />
              <SingleAccountSkelaton />
              <SingleAccountSkelaton />
            </Flex>
          )}
          {!loadingExploreUsers && (
            <>
              <Flex fontSize={"1.2rem"}>Explore People around you</Flex>
              <Divider my={2} />
              {exploreUsers.map((users) => {
                const Follows = users.followers.includes(user._id);

                // console.log(Follows, "fgfsgsg=====", users.name);
                return (
                  <div key={users._id}>
                    {!Follows && user._id !== users._id && (
                      <SingleAccountonExplorePage exploreUser={users} />
                    )}
                  </div>
                );
              })}
            </>
          )}
        </Container>
      </Box>
    </>
  );
};
