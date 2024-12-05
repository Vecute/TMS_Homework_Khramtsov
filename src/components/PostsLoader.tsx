import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setPostsLoading, setPostsSuccess, setPostsError } from "../redux/postsReducer";
import { PostProps } from './PostCard';

const PostsLoader: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.postsReducer);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setPostsLoading());
      try {
        const response = await fetch("https://jsonplaceholder.org/posts");
        const data: PostProps[] = await response.json();
        const postsWithSize = data.map((post) => {
          let size: "small" | "medium" | "large";
          if (post.id % 5 === 0) {
            size = "large";
          } else if (post.id % 2 === 0) {
            size = "medium";
          } else {
            size = "small";
          }
          return {
            ...post,
            size: size,
          };
        });
        dispatch(setPostsSuccess(postsWithSize));
      } catch (error) {
        dispatch(setPostsError("Error loading posts"));
        console.error("Error:", error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="post__loading">
        <div className="spinner">
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="post__error">Error: {error}</div>;
  }

  return null;
};

export default PostsLoader;