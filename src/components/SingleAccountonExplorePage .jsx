import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const SingleAccountonExplorePage = ({ exploreUser }) => {
  const { user, setUser } = useContext(AuthContext);
  const toast = useToast();
  const Follows = exploreUser.followers.includes(user._id);
  const navigate = useNavigate();
  const [followUserLoading, setFollowUserLoading] = useState(false);
  const [following, setFollowing] = useState(
    exploreUser.followers.includes(user?._id)
  );

  const handlefollowUser = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        showToast("Error", "Please login first", "error");
        return;
      }
      setFollowUserLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/users/follow/${exploreUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.error) {
        console.log(data.error);
        toast({
          title: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (Follows) {
        toast({
          title: `Unfollowed ${exploreUser.name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        exploreUser.followers.pop();
        // setUser((prevUser) => ({
        //   ...prevUser,
        //   following: Array.isArray(prevUser.following)
        //     ? prevUser.following.filter((id) => id !== exploreUser._id)
        //     : [],
        // }));
      } else {
        toast({
          title: `Followed ${exploreUser.name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        exploreUser.followers.push(user._id);
        // setUser((prevUser) => ({
        //   ...prevUser,
        //   following: Array.isArray(prevUser.following)
        //     ? [...prevUser.following, exploreUser._id]
        //     : [exploreUser._id],
        // }));
      }
      setFollowing(!following);
    } catch (error) {
      console.log(error);
      toast({
        title: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setFollowUserLoading(false);
    }
  };

  return (
    <>
      {/* {!Follows && ( */}
      <Flex
        flexDirection={"column"}
        _hover={{ bg: useColorModeValue("#ffffff52", "#383838") }}
        cursor={"pointer"}
        padding={"0 20px"}
      >
        <Flex alignItems={"center"}>
          <Flex
            justifyContent={"space-between"}
            w={"100%"}
            alignItems={"center"}
            gap={3}
          >
            <Flex alignItems={"center"} gap={3} my={2}>
              <Avatar
                size={"md"}
                name={exploreUser?.name}
                src={exploreUser.profilePic}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/user/${exploreUser.username}`);
                }}
              />
              <Flex>{exploreUser.username}</Flex>
            </Flex>
            <Flex>
              <Button
                onClick={(event) => handlefollowUser(event)}
                isLoading={followUserLoading}
              >
                {Follows ? "unfollow " : "follow"}
              </Button>
              {/* {Follows && <p> following</p>} */}
            </Flex>
          </Flex>
        </Flex>
        <Divider />
      </Flex>
      {/* )} */}
    </>
  );
};
