import React, { useState, useEffect } from 'react';
import { PostCard, PostProps } from './PostCard';
import '../styles/PostList.scss';

const sizes = ["small", "medium", "large"] as const;
export type Size = (typeof sizes)[number];

const PostList = () => {
  const [posts, setPosts] = useState<Array<PostProps & { size: Size }>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.org/posts');
        const data: PostProps[] = await response.json();

        const postsWithSize = data.map((post) => ({
          ...post,
          size: sizes[Math.floor(Math.random() * sizes.length)],
        }));

        setPosts(postsWithSize);
      } catch (error) {
        console.error('Ошибка при получении постов:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;