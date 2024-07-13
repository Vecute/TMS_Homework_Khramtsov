import React from "react";

interface PostsLoaderProps {
  loading: boolean;
  error: string | null;
}

const PostsLoader: React.FC<PostsLoaderProps> = ({ loading, error }) => {
  if (loading) {
    // Если идет загрузка
    return (
      <div className="post__loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    // Если произошла ошибка
    return <div className="post__error">Error loading posts: {error}</div>;
  }

  // Если загрузка завершена и ошибок нет
  return null;
};

export default PostsLoader;