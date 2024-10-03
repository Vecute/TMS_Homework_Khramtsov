import "./styles/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AccountButton from "./components/AccountButton";
import SearchButton, { SearchProvider } from "./components/SearchButton";
import BurgerMenu from "./components/BurgerMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import RegistrationConfirmationPage from "./pages/RegistrationConfirmationPage";
import EmailConfirmedPage from "./pages/EmailConfirmedPage";
import { store } from "./redux/store";
import { Provider } from "react-redux";


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PostsPage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/registration-confirmation" element={<RegistrationConfirmationPage />} />
              <Route path="/success" element={<EmailConfirmedPage />} />
              <Route path="/posts/:postId" element={<PostPage />} />
            </Routes>
            <Header>
              <BurgerMenu />
              <SearchButton />
              <AccountButton />
            </Header>
            <Footer>
              <p>2024</p>
              <p>All rights reserved</p>
            </Footer>
          </BrowserRouter>
        </SearchProvider>
      </div>
    </Provider>
  );
}

export default App;