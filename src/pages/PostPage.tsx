import "../styles/PostList.scss";
import TemplatePage from "./TemplatePage";
import { PostProps, PostCard } from "../components/PostCard";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedImage } from "../redux/imagePopUpReducer";
import { ImageModal } from "../components/ImageModal";

const PostPage = () => {
  // Получение ID поста из параметров URL
  const { postId } = useParams();

  // Инициализация состояния для хранения информации о посте, состояния загрузки и ошибки
  const [post, setPost] = useState<PostProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Инициализация хуков для работы с навигацией и Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Хук useEffect для загрузки информации о посте при монтировании компонента
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Выполнение запроса к API
        const response = await fetch(
          `https://jsonplaceholder.org/posts/${postId}`
        );

        // Если запрос не успешен, генерируется ошибка
        if (!response.ok) {
          throw new Error("Error loading the post");
        }

        // Преобразование ответа в JSON
        const data = await response.json();
        // Обновление состояния поста
        setPost(data);
      } catch (error) {
        // Обработка ошибок и обновление состояния ошибки
        setError("Error loading the post");
        console.error("Error loading the post:", error);
      } finally {
        // Обновление состояния загрузки
        setIsLoading(false);
      }
    };

    // Вызов функции fetchPost
    fetchPost();
  }, [postId]);

  // Обработчик клика по изображению в посте, который открывает модальное окно с изображением
  const handleOpenImagePopUp = () => {
    if (post?.image) {
      dispatch(setSelectedImage(post.image));
    }
  };

  // Отображение состояния загрузки, ошибки или сообщения о том, что пост не найден
  if (isLoading) {
    return <div>Post is loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
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