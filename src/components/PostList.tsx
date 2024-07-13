import "../styles/PostList.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostCard, PostProps } from "./PostCard";
import { PostModal } from "./PostModal";
import { RootState, useAppDispatch } from "../redux/store";
import PostsLoader from "./PostsLoader";
import { fetchAllPosts } from "../thunk/fetchAllPosts";
import { setPostsPerPage, updateCurrentPagePosts } from "../redux/postsReducer";
import Pagination from "../services/pagination";

const PostList = () => {
  // Определяем состояние activeTab для хранения активной вкладки ("all" или "favorites")
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  // Получаем dispatch-функцию для отправки действий в хранилище Redux
  const dispatch = useAppDispatch();

  // Получаем данные из хранилища Redux с помощью useSelector
  const { posts, loading, error, postsPerPage } = useSelector(
    (state: RootState) => state.postsReducer
  );
  // Получаем список постов, добавленных в избранное
  const favoritePosts = useSelector((state: RootState) => {
    const favorites = state.favoritesReducer;
    return state.postsReducer.allPosts.filter((post) => favorites[post.id]);
  });

  // Флаг для отображения пагинации и селектора количества постов на странице
  const showPaginationAndSelector = activeTab === "all";

  // Эффект для загрузки всех постов при монтировании компонента
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  // Эффект для обновления списка постов на текущей странице при изменении активной вкладки или количества постов на странице
  useEffect(() => {
    if (activeTab === "all") {
      dispatch(updateCurrentPagePosts());
    }
  }, [dispatch, activeTab, postsPerPage]);

  // Обработчик изменения количества постов на странице
  const handlePostsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setPostsPerPage(Number(e.target.value)));
  };

  return (
    <div>
      <PostsLoader loading={loading} error={error} />{" "}
      {/* Отображаем лоадер или сообщение об ошибке */}
      {/* Отображаем кнопки переключения вкладок */}
      <div className="post__tab-line">
        <button
          onClick={() => setActiveTab("all")}
          className={`post__tab ${activeTab === "all" ? "selected" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={`post__tab ${activeTab === "favorites" ? "selected" : ""}`}
        >
          Favorites
        </button>
      </div>
      {/* Отображаем список постов */}
      <div className="post-list">
        {/* Если активна вкладка "All", то отображаем все посты */}
        {activeTab === "all" ? (
          <>
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} {...post} />)
            ) : (
              <div className="post__empty">There are no posts 😭</div>
            )}
          </>
        ) : (
          // Иначе отображаем посты, добавленные в избранное
          <>
            {favoritePosts.length > 0 ? (
              favoritePosts.map((post: PostProps) => (
                <PostCard key={post.id} {...post} />
              ))
            ) : (
              <div className="post__empty">There are no favorite posts 😭</div>
            )}
          </>
        )}
        <PostModal /> {/* Отображаем модальное окно для просмотра поста */}
      </div>
      {/* Отображаем пагинацию и селектор количества постов на странице только на вкладке "All" */}
      {showPaginationAndSelector && (
        <div className="pagination__container">
          <Pagination />
          <div>
          <span className="pagination__label">Posts per page: </span>
            <select
              onChange={handlePostsPerPageChange}
              className="posts-per-page"
              value={postsPerPage}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
