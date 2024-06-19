import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchPosts } from "../thunk/fetchPosts";

const PostsLoader: React.FC = () => {
  // Получаем функцию dispatch из useAppDispatch
  const dispatch = useAppDispatch();
  // Получаем значения loading и error из состояния редюсера postsReducer
  const { loading, error } = useSelector((state: RootState) => state.postsReducer);

  useEffect(() => {
    // Диспатчим thunk-функцию fetchPosts для загрузки постов
    dispatch(fetchPosts());
  }, [dispatch]);

  // Если идет загрузка (loading === true), отображаем спиннер
  if (loading) {
    return (
      <div className="post__loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // Если произошла ошибка (error !== null), отображаем сообщение об ошибке
  if (error) {
    return <div className="post__error">Error loading posts: {error}</div>;
  }

  // В остальных случаях возвращаем null, чтобы не отображать ничего
  return null;
};

export default PostsLoader;