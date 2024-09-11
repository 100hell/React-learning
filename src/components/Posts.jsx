import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Avatar,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Container,
  VStack,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import { FaComment, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const dummyData = [
  {
    id: "12345",
    likedByMe: true,
    user: {
      username: "john_doe",
      profile_picture:
        "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4382.jpg",
    },
    content: {
      image:
        "https://t3.ftcdn.net/jpg/05/99/73/58/360_F_599735855_ysfvW489jotNT5gvL0UvLyZzRiMgPdpg.jpg",
      text: "Had a great time hiking today! #adventure #nature",
    },
    likes: [
      {
        name: "alice_smith",
        profile_picture:
          "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4380.jpg",
      },
      {
        name: "bob_jones",
        profile_picture:
          "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4393.jpg",
      },
      {
        name: "charlie_brown",
        profile_picture:
          "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4390.jpg",
      },
    ],
    comments: [
      {
        user: {
          username: "david_lee",

          likedByMe: false,
          profile_picture:
            "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4380.jpg",
        },
        comment_text: "Looks like an amazing hike!",
      },
      {
        user: {
          username: "emily_clark",
          profile_picture:
            "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4390.jpg",
        },
        comment_text: "I wish I could have joined you!",
      },
    ],
  },
  {
    id: "67890",
    likedByMe: false,
    user: {
      username: "susan_white",
      profile_picture:
        "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4393.jpg",
    },
    content: {
      image:
        "https://img.freepik.com/premium-vector/funny-summer-beach-background-with-surfboards-eps-10_505557-992.jpg",
      text: "Enjoying a sunny day at the beach! #sunshine #beachlife",
    },
    likes: [
      {
        name: "mike_green",
        profile_picture:
          "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4382.jpg",
      },
      {
        name: "laura_king",
        profile_picture:
          "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4390.jpg",
      },
      {
        name: "nick_black",
        profile_picture:
          "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4390.jpg",
      },
    ],
    comments: [
      {
        user: {
          username: "paul_young",
          profile_picture:
            "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4393.jpg",
        },
        comment_text: "Looks so relaxing!",
      },
      {
        user: {
          username: "anna_taylor",
          profile_picture:
            "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4390.jpg",
        },
        comment_text: "Wish I was there too!",
      },
    ],
  },
  {
    id: "11223",
    likedByMe: false,
    user: {
      username: "james_brown",
      profile_picture:
        "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4393.jpg",
    },
    content: {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/000/208/236/small/APRIL_DIVERSE_DINNER_TABLE_001_GUNAWAN.png",
      text: "Had an amazing dinner at the new restaurant in town. #foodie #delicious",
    },
    likes: [
      {
        name: "karen_white",
        profile_picture:
          "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4386.jpg",
      },
      {
        name: "steve_harris",
        profile_picture:
          "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4382.jpg",
      },
      {
        name: "diana_miller",
        profile_picture:
          "https://cdn2.iconfinder.com/data/icons/business-and-finance-related-hand-gestures/256/face_female_blank_user_avatar_mannequin-512.png",
      },
    ],
    comments: [
      {
        user: {
          username: "nancy_smith",
          profile_picture:
            "https://cdn2.iconfinder.com/data/icons/business-and-finance-related-hand-gestures/256/face_female_blank_user_avatar_mannequin-512.png",
        },
        comment_text: "That looks delicious!",
      },
      {
        user: {
          username: "luke_wilson",
          profile_picture:
            "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4386.jpg",
        },
        comment_text: "I need to try that place!",
      },
    ],
  },
];
const Posts = () => {
  const { user } = useContext(AuthContext);
  const [isOpenCommentDrawer, setIsOpenCommentDrawer] = React.useState(false);
  const [isOpenLikesDrawer, setIsOpenLikesDrawer] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const openCommentDrawer = (post) => {
    setSelectedPost(post);
    setIsOpenCommentDrawer(true);
  };

  const openLikesDrawer = (post) => {
    setSelectedPost(post);
    setIsOpenLikesDrawer(true);
  };

  const closeDrawer = () => {
    setIsOpenCommentDrawer(false);
    setIsOpenLikesDrawer(false);
  };

  useEffect(() => {
    setDataLoading(true);
    setTimeout(() => {
      setDataLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {dataLoading ? (
        <>
          <Flex gap={"10px"} align={"center"}>
            <SkeletonCircle size="10" />
            <Skeleton height="20px" width="150px" />
          </Flex>
          <VStack mt="2">
            <Skeleton height="200px" width="100%" />
          </VStack>
        </>
      ) : (
        <Flex direction="column" align="center">
          {dummyData.map((post) => (
            <Box
              key={post.id}
              maxW="md"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mb={4}
            >
              <Flex p="4" align="center" justify="space-between">
                <Link to={`/user/${post.user.username}`}>
                  <Flex align="center">
                    <Avatar
                      src={post.user.profile_picture}
                      name={post.user.username}
                      mr={3}
                    />

                    <Text fontWeight="bold">{post.user.username}</Text>
                    {/* <Text fontSize="sm" color="gray.500">
              Altadena, California
            </Text> */}
                  </Flex>
                </Link>
                <IconButton icon={<FaComment />} aria-label="More Options" />
              </Flex>
              <Link to={`post/${post.id}`}>
                <Image src={post.content.image} alt="Post" />
              </Link>

              <Box p="4">
                <Flex justify="space-between" align="center">
                  <Flex>
                    <IconButton
                      icon={
                        post.likedByMe ? <FaHeart fill="red" /> : <FaHeart />
                      }
                      aria-label="Like"
                      mr={2}
                    />
                    <IconButton
                      icon={<FaComment />}
                      aria-label="Comment"
                      onClick={() => openCommentDrawer(post)}
                    />
                  </Flex>
                </Flex>

                <Text
                  mt="2"
                  fontWeight="bold"
                  onClick={() => openLikesDrawer(post)}
                >
                  {post.likes.length} Likes
                </Text>

                <Text mt="2">
                  <Text as="span" fontWeight="bold">
                    {post.user.username}{" "}
                  </Text>
                  {post.content.text}
                </Text>
              </Box>
            </Box>
          ))}

          {/* Comment Drawer */}
          <Drawer
            isOpen={isOpenCommentDrawer}
            placement="right"
            onClose={closeDrawer}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Comments</DrawerHeader>
              <DrawerBody>
                <Stack spacing={4}>
                  {selectedPost &&
                    selectedPost.comments.map((comment, index) => (
                      <Box
                        key={index}
                        p={2}
                        borderWidth="1px"
                        borderRadius="lg"
                      >
                        <Flex align="center">
                          <Avatar
                            src={comment.user.profile_picture}
                            name={comment.user.username}
                            mr={2}
                          />
                          <Text fontWeight="bold">{comment.user.username}</Text>
                        </Flex>
                        <Text>{comment.comment_text}</Text>
                      </Box>
                    ))}
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          {/* Likes Drawer */}
          <Drawer
            isOpen={isOpenLikesDrawer}
            placement="bottom"
            onClose={closeDrawer}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Likes</DrawerHeader>
              <DrawerBody>
                <Stack spacing={4}>
                  {selectedPost &&
                    selectedPost.likes.map((like, index) => (
                      <Box
                        key={index}
                        p={2}
                        borderWidth="1px"
                        borderRadius="lg"
                      >
                        <Flex align="center">
                          <Avatar
                            src={like.profile_picture}
                            name={like.name}
                            mr={2}
                          />
                          <Text fontWeight="bold">{like.name}</Text>
                        </Flex>
                      </Box>
                    ))}
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      )}
    </>
  );
};

export default Posts;
