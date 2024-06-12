import TemplatePage from "./TemplatePage";
import SignUpForm from "../components/SignUpForm";
import { useNavigate } from "react-router-dom"; 

function SignUpPage() {
    const navigate = useNavigate();

    const handleSubmit = () => {
      // Обработка отправки формы регистрации
      navigate("/registration-confirmation");
    };
    
    return (
      <TemplatePage title="Sign Up">
        <SignUpForm onSubmit={handleSubmit} />
      </TemplatePage>
    );
  }

export default SignUpPage