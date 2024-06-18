import "../styles/PostList.scss"; 
import TemplatePage from "./TemplatePage";
import { PostCard } from "../components/PostCard";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedImage } from "../redux/imagePopUpReducer";
import { ImageModal } from "../components/ImageModal";
import { RootState } from "../redux/store";
import { useEffect } from "react";

const PostPage = () => {
  // Получение параметра postId из URL с помощью useParams
  const { postId } = useParams();

  // Инициализация хука useNavigate для получения функции navigate
  const navigate = useNavigate();
  // Инициализация хука useDispatch для получения функции dispatch
  const dispatch = useDispatch();
  // Получение всех постов из хранилища Redux с помощью useSelector
  const posts = useSelector((state: RootState) => state.postsReducer.posts);

  // Поиск поста с ID, равным postId, в массиве posts
  const post = posts.find((p) => p.id === parseInt(postId!, 10));

  // Обработчик события клика по изображению
  const handleOpenImagePopUp = () => {
    // Если у поста есть свойство image...
    if (post?.image) {
      // ...то диспатчим экшен setSelectedImage с URL изображения
      dispatch(setSelectedImage(post.image));
    }
  };

  useEffect(() => {
    // Прокручиваем страницу в начало (0, 0)
    window.scrollTo(0, 0);
  }, []);

  // Условная отрисовка в зависимости от состояния загрузки и найденного поста
  if (!posts.length) {
    // Отображаем сообщение о загрузке
    return (
      <div className="post__loading">
        <div className="spinner">
        </div>
      </div>
    );
  }

  // Если пост не найден (post === undefined)...
  if (!post) {
    // ...то отображаем сообщение об ошибке
    return <div className="post-empty">No posts found 😭</div>;
  }

  return (
    <TemplatePage title={post.title}>
      <div className="post-single">
        <PostCard
          content={post.content}
          id={post.id}
          publishedAt={post.publishedAt}
          title={post.title}
          image={post.image}
          key={post.id}
          onImageClick={handleOpenImagePopUp}
        />
        <button onClick={() => navigate("/posts")} className="buttonBack">
          Return to posts
        </button>
      </div>
      <ImageModal /> 
    </TemplatePage>
  );
};

export default PostPage;