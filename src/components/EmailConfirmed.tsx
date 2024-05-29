import "../styles/EmailConfirmed.scss";

interface EmailConfirmedProps {
  onChangePage: (value: string) => void;
}

const EmailConfirmed = (props: EmailConfirmedProps) => {
  const { onChangePage } = props;
  return (
    <div>
      <div className="emailConfirmed">
        <p className="emailConfirmed__text">
          Your registration process is completed. You can login now.
        </p>
        <button type="submit" className="emailConfirmed__button" onClick={() => onChangePage("Posts")}>
          Go to 'Home' page
        </button>
      </div>
      <button onClick={() => onChangePage("Posts")} className="buttonBack">
        Return to posts
      </button>
    </div>
  );
};

export default EmailConfirmed;
