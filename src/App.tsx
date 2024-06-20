import React from 'react';
import { Provider } from 'react-redux';
import Search from './components/Search';
import TodoList from './components/TodoList';
import UserList from './components/UserList';
import PostList from './components/PostList.tsx';
import store from './store';
import "./styles/App.scss";

const App: React.FC = () => (
  <Provider store={store}>
    <div className="App">
      <Search />
      <div className="content">
        <TodoList />
        <UserList />
        <PostList />
      </div>
    </div>
  </Provider>
);

export default App;