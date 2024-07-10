import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchMyPosts } from "../thunk/fetchMyPosts";

const UserPostsLoader: React.FC = () => {
  // Получаем функцию dispatch из useAppDispatch
  const dispatch = useAppDispatch();
  // Получаем значение loading из состояния редюсера myPostsReducer
  const { loading } = useSelector((state: RootState) => state.myPostsReducer);

  useEffect(() => {
    // Диспатчим thunk-функцию fetchMyPosts для загрузки постов
    dispatch(fetchMyPosts());
  }, [dispatch]);
  

  // Если идет загрузка (loading === true), отображаем спиннер
  if (loading) {
    return (
      <div className="post__loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // В остальных случаях возвращаем null, чтобы не отображать ничего
  return null;
};

export default UserPostsLoader;