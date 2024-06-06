import "../styles/RegistrationConfirmation.scss";
import { useNavigate } from "react-router-dom";

const RegistrationConfirmation = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="registration">
        <p className="registration__text">
        We have sent an email to your email address to confirm registration. Check your incoming messages.
        </p>
        <button onClick={() => navigate("/success")} type="submit" className="registration__button" >
          I confirmed my email
        </button>
      </div>
      <button onClick={() => navigate("/posts")} className="buttonBack">
        Return to posts
      </button>
    </div>
  );
};

export default RegistrationConfirmation;