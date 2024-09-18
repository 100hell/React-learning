import { HStack, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

export const SingleAccountSkelaton = () => {
  return (
    <HStack>
      <SkeletonCircle />
      <Skeleton height="20px" maxWidth={"350px"} w={"100%"} />
    </HStack>
  );
};
