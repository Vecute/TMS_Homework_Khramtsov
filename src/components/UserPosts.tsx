import { useEffect } from "react";
import "../styles/AddPost.scss";
import { PostModal } from "./PostModal";
import { PostCard, PostProps } from "./PostCard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UserPostsLoader from "./UserPostsLoader";

const UserPosts = () => {
    // Получаем все посты авторизованного пользователя из хранилища Redux с помощью useSelector
    const myPosts = useSelector((state: RootState) => state.myPostsReducer.myPosts);

    useEffect(() => {
      // Обновление компонента после изменения myPosts
    }, [myPosts]);

    useEffect(() => {
      // Прокручиваем страницу в начало (0, 0)
      window.scrollTo(0, 0);
    }, []);
  
    return (
      <div>
        <UserPostsLoader />
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