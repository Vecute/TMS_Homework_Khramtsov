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
    if (post?.image) {
      // Проверка на загрузку изображения
      const img = new Image();
      img.onload = () => {
        // Если изображение загрузилось успешно, диспатчим экшен
        dispatch(setSelectedImage(post.image));
      };
      img.onerror = () => {
        // Если изображение не загрузилось, используем заглушку
        dispatch(setSelectedImage("/fallback.png"));
      };
      img.src = post.image;
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
        <div className="spinner"></div>
      </div>
    );
  }

  // Если пост не найден (post === undefined)...
  if (!post) {
    // ...то отображаем сообщение об ошибке
    return (
      <div className="empty-post">
        <div className="post-empty">No posts found 😭</div>
        <button onClick={() => navigate("/posts")} className="buttonBack">
          Return to posts
        </button>
      </div>
    );
  }

  return (
    <TemplatePage title={post.title}>
      <div className="post-single">
        <PostCard
          description={post.description || (post.text || '')}
          id={post.id}
          date={post.date}
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
