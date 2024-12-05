import "../styles/EmailConfirmed.scss";
import { useNavigate } from "react-router-dom";

const EmailConfirmed = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="emailConfirmed">
        <p className="emailConfirmed__text">
          Your registration process is completed. You can login now.
        </p>
        <button type="submit" onClick={() => navigate("/sign-in")} className="emailConfirmed__button" >
          Go to 'Sing In' page
        </button>
      </div>
    </div>
  );
};

export default EmailConfirmed;