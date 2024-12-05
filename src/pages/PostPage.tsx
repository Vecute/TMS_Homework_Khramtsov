import "../styles/PostList.scss";
import TemplatePage from "./TemplatePage";
import { PostProps, PostCard } from "../components/PostCard";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostPage = () => {
  // Использование хука useParams для получения параметра postId из URL
  const { postId } = useParams();
  // Использование хука useState для управления состоянием поста, загрузки и ошибок
  const [post, setPost] = useState<PostProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Использование хука useNavigate для перехода на другие страницы
  const navigate = useNavigate();

  // Использование хука useEffect для выполнения запроса к API при загрузке компонента
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
  }, [postId]); // Зависимость от postId

  // Рендеринг различных состояний компонента
  if (isLoading) {
    return <div>Post is loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div className="post-empty">No posts found 😭</div>;
  }

  // Рендеринг поста, если он загружен
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
        />
        <button onClick={() => navigate("/posts")} className="buttonBack">
          Return to posts
        </button>
      </div>
    </TemplatePage>
  );
};

export default PostPage;