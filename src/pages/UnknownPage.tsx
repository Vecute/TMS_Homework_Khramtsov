import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TemplatePage from "./TemplatePage";

function PostsPage() {
  const navigate = useNavigate()
    return (
      <TemplatePage title="Page not found 😭">
        <Header/>
        <button onClick={() => navigate("/posts")} className="buttonBack">
          Go to the main page
        </button>
      </TemplatePage>
    );
  }

export default PostsPage