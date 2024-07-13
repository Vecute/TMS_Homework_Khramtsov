import "../styles/PostList.scss";
import TemplatePage from "./TemplatePage";
import { PostCard } from "../components/PostCard";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setSelectedImage } from "../redux/imagePopUpReducer";
import { ImageModal } from "../components/ImageModal";
import { RootState, useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import { fetchPostById } from "../thunk/fetchPostById";

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Получаем данные из singlePostReducer
  const { post, loading, error } = useSelector(
    (state: RootState) => state.singlePostReducer
  );

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
    window.scrollTo(0, 0);

    // Загружаем пост по ID
    dispatch(fetchPostById(parseInt(postId!, 10)));
  }, [dispatch, postId]); 

  // Отображение состояния загрузки или ошибки
  if (loading) {
    return (
      <div className="post__loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="post__error">Error loading post: {error}</div>;
  }

  // Отображение поста, если он загружен
  if (post) {
    return (
      <TemplatePage title={post.title}>
        <div className="post-single">
          <PostCard
            description={post.description || (post.text || "")}
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
  }

  // Отображение сообщения, если пост не найден
  return (
    <div className="empty-post">
      <div className="post-empty">No posts found 😭</div>
      <button onClick={() => navigate("/posts")} className="buttonBack">
        Return to posts
      </button>
    </div>
  );
};

export default PostPage;