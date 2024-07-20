import { useEffect } from "react";
import "../styles/AddPost.scss";
import { PostModal } from "./PostModal";
import { PostCard, PostProps } from "./PostCard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchMyPosts } from "../thunk/fetchMyPosts";
import { myPostsSlice } from "../redux/myPostsReducer";

const UserPosts = () => {
  // Получаем все посты авторизованного пользователя из хранилища Redux с помощью useSelector
  const myPosts = useSelector(
    (state: RootState) => state.myPostsReducer.myPosts
  );
  // Получаем функцию dispatch из useAppDispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Прокручиваем страницу в начало (0, 0)
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Диспатчим thunk-функцию fetchMyPosts для загрузки постов
    dispatch(fetchMyPosts());
    // Проверяем, есть ли в localStorage посты пользователя
    if (localStorage.myPosts === undefined) {
      // Если нет, то устанавливаем в хранилище пустой массив постов
      dispatch(myPostsSlice.actions.setMyPosts([]));
    }
  }, [dispatch]);

  return (
    <div>
      <div className="post-list my-posts">
        {myPosts.length > 0 ? (
          // Если есть, то для каждого поста рендерим компонент PostCard
          myPosts.map((post: PostProps) => (
            <PostCard
              key={post.id} // Устанавливаем ключ для каждого элемента списка
              {...post} // Передаем все свойства поста в компонент PostCard как пропсы
            />
          ))
        ) : (
          <div className="post__empty">There are no posts 😭</div>
        )}
        <PostModal />
      </div>
    </div>
  );
};

export default UserPosts;
