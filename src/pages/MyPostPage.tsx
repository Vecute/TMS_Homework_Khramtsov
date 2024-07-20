import "../styles/PostList.scss";
import TemplatePage from "./TemplatePage";
import { PostCard } from "../components/PostCard";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedImage } from "../redux/imagePopUpReducer";
import { ImageModal } from "../components/ImageModal";
import { RootState, useAppDispatch } from "../redux/store";
import { useEffect, useState } from "react";
import useTokenChecker from "../customHooks/useTokenChecker";
import { useHttp } from "../services/authToken";
import Alert from "../components/Alert";
import { saveMyPostsToLocalStorage } from "../redux/myPostsReducer";
import { myPostsSlice } from "../redux/myPostsReducer";

const MyPostPage = () => {
  // Получение параметра postId из URL с помощью useParams
  const { postId } = useParams();

  // Инициализация хука useNavigate для получения функции navigate
  const navigate = useNavigate();
  // Инициализация хука useDispatch для получения функции dispatch
  const dispatch = useDispatch();
  // Получаем функцию appDispatch из useAppDispatch
  const appDispatch = useAppDispatch();

  // Получение всех постов из хранилища Redux с помощью useSelector
  const posts = useSelector((state: RootState) => state.myPostsReducer.myPosts);
  // Проверяем валидность токенов
  const isValid = useTokenChecker();

  // Получаем функцию http для отправки HTTP-запросов
  const http = useHttp();

  // Состояние для отображения уведомления
  const [showAlert, setShowAlert] = useState(false);
  // Состояние для текста и цвета уведомления
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState(
    "var(--alert-background-error-color)"
  );

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

  // Обработчик события клика по кнопке удаления поста
  const handleDeleteClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!isValid) navigate("/");
    try {
      await http(
        `https://studapi.teachmeskills.by/blog/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      // Обновляем состояние posts, удаляя нужный пост
      const updatedPosts = posts.filter((p) => p.id !== parseInt(postId!, 10));
      // Обновляем состояние Redux
      appDispatch(myPostsSlice.actions.setMyPosts(updatedPosts));
      // Сохраняем обновлённые посты в localStorage
      saveMyPostsToLocalStorage(updatedPosts);
      navigate("/my-posts"); // Возвращаемся ко всем пользовательским постам
    } catch (error) {
      console.error("Error fetching user data:", error); // Логируем ошибку
      setAlertMessage("Error when deleting a post"); // Устанавливаем текст уведомления
      setAlertColor("var(--alert-background-error-color)"); // Устанавливаем цвет уведомления
      setShowAlert(true); // Отображаем уведомление
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
        <button onClick={() => navigate("/my-posts")} className="buttonBack">
          Return to my posts
        </button>
      </div>
    );
  }

  // Если токен не валидный
  if (!isValid) {
    return (
      <div className="empty-post">
        <div className="post-empty">No posts found 😭</div>
        <button onClick={() => navigate("/my-posts")} className="buttonBack">
          Return to my posts
        </button>
      </div>
    );
  }

  // Обработчик закрытия уведомления
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <TemplatePage title={post.title}>
      {showAlert && (
        <Alert
          text={alertMessage}
          onClose={handleCloseAlert}
          color={alertColor}
        />
      )}
      <div className="post-single my-posts__single">
        <PostCard
          description={post.description || post.text || ""}
          id={post.id}
          date={post.date}
          title={post.title}
          image={post.image}
          key={post.id}
          onImageClick={handleOpenImagePopUp}
        />
        <div className="my-posts__buttons">
          <button onClick={() => navigate("/my-posts")} className="buttonBack">
            Return to my posts
          </button>
          <button
            onClick={handleDeleteClick}
            className="buttonBack my-posts__buttonDelete"
          >
            Remove post
          </button>
        </div>
      </div>
      <ImageModal />
    </TemplatePage>
  );
};

export default MyPostPage;