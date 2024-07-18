import { ChangeEvent, useState } from "react";
import "../styles/AddPost.scss";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../services/authToken";
import Alert from "./Alert";

// Интерфейс Post определяет структуру данных для поста
interface Post {
  title: string;
  lessonNumber: number;
  description: string;
  text: string;
  image: File | null;
}

const AddPost: React.FC = () => {
  // Используем useState для управления состоянием поста
  const [post, setPost] = useState<Post>({
    title: "",
    lessonNumber: 0,
    description: "",
    text: "",
    image: null,
  });
  // Получаем функцию navigate для перенаправления
  const navigate = useNavigate();
  // Получаем функцию http для отправки HTTP-запросов
  const http = useHttp();
  // Состояние для выбранного файла
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Состояние для превью картинки
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Состояние для отображения уведомления
  const [showAlert, setShowAlert] = useState(false);
  // Состояние для текста и цвета уведомления
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState(
    "var(--alert-background-error-color)"
  );

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // Ограничение размера файла 1 МБ

  // Обработчик изменения полей формы
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target; // Получаем имя и значение измененного поля
    setPost((prevPost) => ({ ...prevPost, [name]: value })); // Обновляем состояние поста
  };

  // Обработчик изменения файла
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null; // Получаем выбранный файл
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        // Файл слишком большой
        setAlertMessage("File size too large. Maximum size is 1MB"); // Устанавливаем текст уведомления
        setAlertColor("var(--alert-background-error-color)"); // Устанавливаем цвет уведомления
        setShowAlert(true); // Отображаем уведомление, если файл большего размера
        handleReset(); // Сбрасываем состояние файла
        return;
      } else {
        setSelectedFile(file); // Обновляем состояние выбранного файла
        setPost((prevPost) => ({
          ...prevPost,
          image: file,
        })); // Обновляем состояние поста с новым файлом
        // Создаем URL предпросмотра
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setPost((prevPost) => ({ ...prevPost, image: null })); // Обновляем состояние поста, если файл не выбран
      setPreviewUrl(null); // Сбрасываем предпросмотр, если файл не выбран
    }
  };

  // Сброс состояния файла
  const handleReset = () => {
    setSelectedFile(null); // Сбрасываем состояние выбранного файла
    setPost((prevPost) => ({ ...prevPost, image: null })); // Сбрасываем состояние поста
    setPreviewUrl(null); // Сбрасываем предпросмотр
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput.value = ""; // Очищаем поле ввода файла
  };

  // Обработчик нажатия кнопки "Delete post"
  const handleDeleteClick = () => {
    setPost({
      title: "",
      lessonNumber: 0,
      description: "",
      text: "",
      image: null,
    }); // Сбрасываем состояние поста
    handleReset(); // Сбрасываем состояние файла
  };

  // Обработчик нажатия кнопки "Cancel"
  const handleCancelClick = () => {
    setPost({
      title: "",
      lessonNumber: 0,
      description: "",
      text: "",
      image: null,
    }); // Сбрасываем состояние поста
    handleReset(); // Сбрасываем состояние файла
    navigate("/posts"); // Перенаправляем пользователя на страницу со списком постов
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    if (!post.image) {
      setAlertMessage("Please insert a picture"); // Устанавливаем текст уведомления
      setAlertColor("var(--alert-background-error-color)"); // Устанавливаем цвет уведомления
      setShowAlert(true); // Отображаем уведомление, если файл не выбран
      return;
    }
    console.log(post); // Выводим состояние поста в консоль
    try {
      const formData = new FormData(); // Создаем FormData для отправки файла
      formData.append("title", post.title);
      formData.append("lesson_num", post.lessonNumber.toString());
      formData.append("description", post.description);
      formData.append("text", post.text);
      formData.append("image", post.image);

      const response = await http(
        "https://studapi.teachmeskills.by/blog/posts/",
        {
          method: "POST",
          body: formData,
        }
      ); // Отправляем HTTP-запрос на сервер

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Получаем ответ от сервера
      console.log("Post submitted successfully:", data); // Выводим сообщение об успешной отправке поста
      setAlertMessage("Post sent successfully"); // Устанавливаем текст уведомления
      setAlertColor("var(--alert-background-success-color)"); // Устанавливаем цвет уведомления
      setShowAlert(true); // Отображаем уведомление
      handleDeleteClick(); // Очищаем все поля
    } catch (error) {
      console.error("Error submitting post:", error); // Выводим сообщение об ошибке в консоль
      setAlertMessage("Error loading the post"); // Устанавливаем текст уведомления
      setAlertColor("var(--alert-background-error-color)"); // Устанавливаем цвет уведомления
      setShowAlert(true); // Отображаем уведомление об ошибке
    }
  };

  // Обработчик закрытия уведомления
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="addPost">
        <div className="addPost__element">
          <label htmlFor="title" className="addPost__label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="addPost__input"
            placeholder="Add a title"
          />
        </div>
        <div className="addPost__element">
          <label htmlFor="lessonNumber" className="addPost__label">
            Lesson number
          </label>
          <input
            type="number"
            id="lessonNumber"
            name="lessonNumber"
            value={post.lessonNumber}
            onChange={handleChange}
            className="addPost__input"
          />
        </div>
        <div className="addPost__element">
          <label htmlFor="image" className="addPost__label">
            Image
          </label>
          <div className="addPost__image-wrapper">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              className="addPost__input-image"
            />
            {previewUrl && (
              <div className="addPost__image-preview-wrapper">
                <img
                  className="addPost__image-preview"
                  src={previewUrl}
                  alt="Preview"
                />
              </div>
            )}
            {selectedFile && (
              <input
                type="reset"
                value="x"
                className="addPost__image-reset"
                onClick={handleReset}
              />
            )}
          </div>
        </div>

        <div className="addPost__element">
          <label htmlFor="description" className="addPost__label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={post.description}
            onChange={handleChange}
            className="addPost__input"
            placeholder="Add a description"
          />
        </div>
        <div className="addPost__element">
          <label htmlFor="text" className="addPost__label">
            Text
          </label>
          <textarea
            id="text"
            name="text"
            value={post.text}
            onChange={handleChange}
            className="addPost__input"
            placeholder="Add a text"
          />
        </div>
        <div className="addPost__buttons-block">
          {post.title ||
          post.lessonNumber ||
          post.description ||
          post.text ||
          selectedFile ? (
            <button
              type="button"
              onClick={handleDeleteClick}
              className="addPost__button addPost__delete"
            >
              Delete post
            </button>
          ) : null}
          <div className="addPost__main-buttons">
            <button
              type="button"
              className="addPost__button addPost__cancel"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button type="submit" className="addPost__button">
              Add post
            </button>
          </div>
        </div>
      </form>
      <button onClick={() => navigate("/posts")} className="buttonBack">
        Return to posts
      </button>
      {showAlert && (
        <Alert
          text={alertMessage}
          onClose={handleCloseAlert}
          color={alertColor}
        />
      )}
    </div>
  );
};

export default AddPost;
