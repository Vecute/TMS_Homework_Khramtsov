import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSelectedPost } from "../redux/postPopUpReducer";
import { likePost, dislikePost, resetLikesDislikes } from "../redux/likesDislikesReducer";
import { setLikeState } from "../redux/likeStatesReducer";
import { toggleFavorite } from "../redux/favoritesReducer";

// Определение типа для поста
export type PostType = {
  id: number;
  image?: string;
  content: string;
  publishedAt: string;
  title: string;
};

// Определение пропсов для компонента PostCard, расширяет PostType
export interface PostProps extends PostType {
  size?: "small" | "medium" | "large";
  className?: string;
  onImageClick?: () => void;
  onFavoriteClick?: (id: number) => void;
};

export const PostCard = ({ id, image, content, publishedAt, title, size, onImageClick, onFavoriteClick }: PostProps) => {
  const navigate = useNavigate(); // Инициализация хука useNavigate
  const dispatch = useDispatch(); // Инициализация хука useDispatch

  // Получение данных из Redux
  const likesDislikes = useSelector((state: RootState) => state.likesDislikesReducer[id]) || { likes: 0, dislikes: 0 }; // Получение количества лайков/дизлайков или дефолтное значение
  const likeState = useSelector((state: RootState) => state.likeStatesReducer[id]); // Получение состояния лайка (лайкнут, дизлайкнут или null)
  const isFavorite = useSelector((state: RootState) => state.favoritesReducer[id]); // Получение флага "в избранном"

  // Обработчик клика по кнопке лайка
  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Остановка всплытия события
    if (likeState === undefined || likeState === "dislike") { // Если не лайкали или дизлайкнули
      dispatch(likePost(id)); // Диспатчим экшен добавления лайка
      dispatch(setLikeState({ postId: id, likeState: "like" })); // Устанавливаем состояние лайка
    } else { // Если уже лайкнули
      dispatch(resetLikesDislikes(id)); // Диспатчим экшен сброса лайков/дизлайков
      dispatch(setLikeState({ postId: id, likeState: undefined })); // Сбрасываем состояние лайка
    }
  };

  // Обработчик клика по кнопке дизлайка
  const handleDislikeClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Остановка всплытия события
    if (likeState === undefined || likeState === "like") { // Если не дизлайкали или лайкнули
      dispatch(dislikePost(id)); // Диспатчим экшен добавления дизлайка
      dispatch(setLikeState({ postId: id, likeState: "dislike" })); // Устанавливаем состояние дизлайка
    } else { // Если уже дизлайкнули
      dispatch(resetLikesDislikes(id)); // Диспатчим экшен сброса лайков/дизлайков
      dispatch(setLikeState({ postId: id, likeState: undefined })); // Сбрасываем состояние дизлайка
    }
  };

  // Обработчик клика по карточке поста
  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement; // Приводим event.target к типу HTMLElement
    const isButtonClick = target.classList.contains("post-card__button") || target.closest(".post-card__button"); // Проверяем, кликнули ли по кнопке внутри карточки
    const isModalClick = target.closest(".modal"); // Проверяем, кликнули ли по модальному окну

    if (!isButtonClick && !isModalClick) { // Если не клик по кнопке и не по модальному окну
      navigate(`/posts/${id}`); // Переходим на страницу поста
    }
  };

  // Обработчик клика по кнопке "Открыть попап"
  const handleOpenPopUp = (event: React.MouseEvent) => {
    event.stopPropagation(); // Остановка всплытия события
    dispatch(setSelectedPost({ id, image, content, publishedAt, title })); // Диспатчим экшен открытия попапа с данными поста
  };

  // Обработчик клика по кнопке "В избранное"
  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Остановка всплытия события
    dispatch(toggleFavorite(id)); // Диспатчим экшен добавления/удаления из избранного
    onFavoriteClick && onFavoriteClick(id); // Вызываем колбэк, если он передан
  };

  return (
    <div className={`post-card ${size}`} id={id.toString()} onClick={handleClick}>
      {image && (
        <img src={image} alt={title} onClick={onImageClick} className="post__image" />
      )}
      <h2>{title}</h2>
      <p className="post-card__description">{content}</p>
      <p className="post-card__date">{publishedAt}</p>
      <div className="post-card__bottom-menu">
        <div className="post-card__likes-menu">
          <div
            className={`post-card__like post-card__button post__icons-container ${likeState === "like" ? "liked" : ""}`}
            onClick={handleLikeClick}
          >
            <svg
              viewBox="0 0 24 24"
              className={`post__icons ${likeState === "like" ? "liked" : ""}`}
            >
              <path d="M8.39062 18.4907V8.33071C8.39062 7.93071 8.51062 7.54071 8.73062 7.21071L11.4606 3.15071C11.8906 2.50071 12.9606 2.04071 13.8706 2.38071C14.8506 2.71071 15.5006 3.81071 15.2906 4.79071L14.7706 8.06071C14.7306 8.36071 14.8106 8.63071 14.9806 8.84071C15.1506 9.03071 15.4006 9.15071 15.6706 9.15071H19.7806C20.5706 9.15071 21.2506 9.47071 21.6506 10.0307C22.0306 10.5707 22.1006 11.2707 21.8506 11.9807L19.3906 19.4707C19.0806 20.7107 17.7306 21.7207 16.3906 21.7207H12.4906C11.8206 21.7207 10.8806 21.4907 10.4506 21.0607L9.17062 20.0707C8.68062 19.7007 8.39062 19.1107 8.39062 18.4907Z" />
              <path d="M5.21 6.37891H4.18C2.63 6.37891 2 6.97891 2 8.45891V18.5189C2 19.9989 2.63 20.5989 4.18 20.5989H5.21C6.76 20.5989 7.39 19.9989 7.39 18.5189V8.45891C7.39 6.97891 6.76 6.37891 5.21 6.37891Z" />
            </svg>
          </div>
          <span className="post-card__like-counter">{likesDislikes.likes - likesDislikes.dislikes}</span>
          <div
            className={`post-card__dislike post-card__button post__icons-container ${likeState === "dislike" ? "disliked" : ""}`}
            onClick={handleDislikeClick}
          >
            <svg
              viewBox="0 0 24 24"
              className={`post__icons ${likeState === "dislike" ? "disliked" : ""
                }`}
            >
              <path d="M15.609 5.49953V15.6595C15.609 16.0595 15.489 16.4495 15.269 16.7795L12.539 20.8395C12.109 21.4895 11.039 21.9495 10.129 21.6095C9.14904 21.2795 8.49904 20.1795 8.70904 19.1995L9.22904 15.9295C9.26904 15.6295 9.18904 15.3595 9.01904 15.1495C8.84904 14.9595 8.59904 14.8395 8.32904 14.8395H4.21904C3.42904 14.8395 2.74904 14.5195 2.34904 13.9595C1.96904 13.4195 1.89904 12.7195 2.14904 12.0095L4.60904 4.51953C4.91904 3.27953 6.26904 2.26953 7.60904 2.26953H11.509C12.179 2.26953 13.119 2.49953 13.549 2.92953L14.829 3.91953C15.319 4.29953 15.609 4.87953 15.609 5.49953Z" />
              <path d="M18.7894 17.6084H19.8194C21.3694 17.6084 21.9994 17.0084 21.9994 15.5284V5.47844C21.9994 3.99844 21.3694 3.39844 19.8194 3.39844H18.7894C17.2394 3.39844 16.6094 3.99844 16.6094 5.47844V15.5384C16.6094 17.0084 17.2394 17.6084 18.7894 17.6084Z" />
            </svg>
          </div>
        </div>
        <div className="post-card__extra-menu">
        <div
          className={`post-card__favorite post-card__button post__icons-container ${isFavorite ? "favorited" : ""}`}
          onClick={handleFavoriteClick}
        >
            <svg viewBox="0 0 24 24" className="post__icons">
              <path d="M16.8203 2H7.18031C5.05031 2 3.32031 3.74 3.32031 5.86V19.95C3.32031 21.75 4.61031 22.51 6.19031 21.64L11.0703 18.93C11.5903 18.64 12.4303 18.64 12.9403 18.93L17.8203 21.64C19.4003 22.52 20.6903 21.76 20.6903 19.95V5.86C20.6803 3.74 18.9503 2 16.8203 2ZM15.0103 9.75C14.0403 10.1 13.0203 10.28 12.0003 10.28C10.9803 10.28 9.96031 10.1 8.99031 9.75C8.60031 9.61 8.40031 9.18 8.54031 8.79C8.69031 8.4 9.12031 8.2 9.51031 8.34C11.1203 8.92 12.8903 8.92 14.5003 8.34C14.8903 8.2 15.3203 8.4 15.4603 8.79C15.6003 9.18 15.4003 9.61 15.0103 9.75Z" />
            </svg>
          </div>
          <div
            className="post-card__options post-card__button post__icons-container"
            onClick={handleOpenPopUp}
          >
            <svg viewBox="0 0 24 24" className="post__icons">
              <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM7 13.31C6.28 13.31 5.69 12.72 5.69 12C5.69 11.28 6.28 10.69 7 10.69C7.72 10.69 8.31 11.28 8.31 12C8.31 12.72 7.72 13.31 7 13.31ZM12 13.31C11.28 13.31 10.69 12.72 10.69 12C10.69 11.28 11.28 10.69 12 10.69C12.72 10.69 13.31 11.28 13.31 12C13.31 12.72 12.72 13.31 12 13.31ZM17 13.31C16.28 13.31 15.69 12.72 15.69 12C15.69 11.28 16.28 10.69 17 10.69C17.72 10.69 18.31 11.28 18.31 12C18.31 12.72 17.72 13.31 17 13.31Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};