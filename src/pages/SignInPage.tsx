import TemplatePage from "./TemplatePage";
import SignInForm from "../components/SignInForm";
import { useNavigate } from "react-router-dom"; 

function SignInPage() {
    const navigate = useNavigate();

    const handleSubmit = () => {
      // Обработка отправки формы входа
      navigate("/success");
    };
    
    return (
      <TemplatePage title="Sign In">
        <SignInForm onSubmit={handleSubmit} />
      </TemplatePage>
    );
  }

export default SignInPage