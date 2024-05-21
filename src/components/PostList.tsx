import React, { useState, useEffect } from 'react';
import { PostCard, PostProps } from './PostCard';

const PostList = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.org/posts');
        const data: PostProps[] = await response.json();
        setPosts(data);
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