import '../styles/PostSearch.scss';
import useSearch from "../customHooks/useSearch";
import { useSelector } from 'react-redux';
import { PostCard } from './PostCard';
import { RootState } from '../redux/store';

const PostSearch = () => {
  // Получаем посты из Redux
  const posts = useSelector((state: RootState) => state.postsReducer.posts);
  
  const { searchQuery } = useSearch();

  // Фильтрация постов по searchQuery
  const filteredPosts = posts.filter((post) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return post.title.toLowerCase().includes(lowerCaseQuery);
  });

  return (
    <div className="search-list">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))
      ) : (
        <div className='search-empty'>No posts found 😭</div>
      )}
    </div>
  );
};

export default PostSearch;