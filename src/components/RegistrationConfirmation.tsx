import "../styles/RegistrationConfirmation.scss";

interface RegistrationConfirmationProps {
  onChangePage: (value: string) => void;
}

const RegistrationConfirmation = (props: RegistrationConfirmationProps) => {
  const { onChangePage } = props;
  return (
    <div>
      <div className="registration">
        <p className="registration__text">
          Your registration process is completed.
        </p>
        <button type="submit" className="registration__button" onClick={() => onChangePage("Success")}>
          I confirmed email
        </button>
      </div>
      <button onClick={() => onChangePage("Posts")} className="buttonBack">
        Return to posts
      </button>
    </div>
  );
};

export default RegistrationConfirmation;