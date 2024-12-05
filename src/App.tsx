import { useState } from "react";
import "./styles/App.scss";
import DarkModeToggle from "./components/darkTheme/DarkModeToggle";
import ThemeProvider from "./components/darkTheme/ThemeProvider";
import PostList from "./components/PostList";
import PostSearch from "./components/PostSearch";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TemplatePage from "./components/TemplatePage";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import RegistrationConfirmation from "./components/RegistrationConfirmation";
import EmailConfirmed from "./components/EmailConfirmed";
import RenderButton from "./components/RenderButton";
import SearchButton, { SearchProvider } from "./components/SearchButton";

function App() {
  const [activeComponent, setActiveComponent] = useState<string | null>(
    "Posts"
  );
  return (
    <div className="App">
      <ThemeProvider>
      <SearchProvider>
        <Header>
          <DarkModeToggle />
          <div className="buttons">
              <SearchButton onChangePage={setActiveComponent} />
            <RenderButton
              title="Sign Up"
              onButtonClick={setActiveComponent}
              buttonType="account-button"
            />
          </div>
        </Header>
          {activeComponent && (
            <TemplatePage title={activeComponent}>
              {activeComponent === "Posts" && <PostList />}
              {activeComponent === "Search" && <PostSearch />}
              {activeComponent === "Sign Up" && (
                <SignUpForm onChangePage={setActiveComponent} />
              )}
              {activeComponent === "Sign In" && (
                <SignInForm onChangePage={setActiveComponent} />
              )}
              {activeComponent === "Registration Confirmation" && (
                <RegistrationConfirmation onChangePage={setActiveComponent} />
              )}
              {activeComponent === "Success" && (
                <EmailConfirmed onChangePage={setActiveComponent} />
              )}
            </TemplatePage>
          )}

        <Footer>
          <p>2024</p>
          <p>All rights reserved</p>
        </Footer>
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
