import React, {useState} from "react";
import "./styles/App.scss";
import DarkModeToggle from "./components/DarkModeToggle";
import PostList from "./components/PostList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TemplatePage from "./components/TemplatePage";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import RegistrationConfirmation from "./components/RegistrationConfirmation";
import EmailConfirmed from "./components/EmailConfirmed";
import RenderButton from "./components/RenderButton";

function App() {
  const [activeComponent, setActiveComponent] = useState<string | null>('Posts');
  return (
    <div className="App">
      <Header>
        <DarkModeToggle />
        <RenderButton title="Sign Up" onButtonClick={setActiveComponent} buttonType="account-button"/>
      </Header>
      {activeComponent && (
        <TemplatePage title={activeComponent}>
          {activeComponent === 'Posts' && <PostList />}
          {activeComponent === 'Sign Up' && <SignUpForm onChangePage={setActiveComponent}/>}
          {activeComponent === 'Sign In' && <SignInForm onChangePage={setActiveComponent}/>}
          {activeComponent === 'Registration Confirmation' && <RegistrationConfirmation onChangePage={setActiveComponent}/>}
          {activeComponent === 'Success' && <EmailConfirmed onChangePage={setActiveComponent}/>}
        </TemplatePage>
      )}
      <Footer>
        <p>2024</p>
        <p>All rights reserved</p>
      </Footer>
    </div>
  );
}

export default App;