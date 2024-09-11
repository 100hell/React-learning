import React from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  //   const params = useParams();
  //   console.log(params.postId);
  return <div>{postId} post</div>;
};

export default PostPage;
