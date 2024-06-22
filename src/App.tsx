import { useSelector } from "react-redux";
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import UserList from "./components/UserList";
import PostList from "./components/PostList";
import "./styles/App.scss";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ToggleTheme from "./components/ToggleTheme";
import { RootState } from './store/';

function App() {
  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode); // Используем useSelector для получения значения isDarkTheme из состояния Redux
  const theme = createTheme({ // Создаем тему Material-UI
    palette: {
      mode: isDarkTheme ? "dark" : "light", // Устанавливаем режим палитры (светлый или темный)
    },
  });

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="App">
          <Search />
          <ToggleTheme />
          <Box className="content">
            <TodoList />
            <UserList />
            <PostList />
          </Box>
        </Box>
      </ThemeProvider>
  );
}

export default App;