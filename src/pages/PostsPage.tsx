import TemplatePage from "./TemplatePage";
import PostList from "../components/PostList";

function PostsPage() {
    return (
      <TemplatePage title="Posts">
        <PostList />
      </TemplatePage>
    );
  }

export default PostsPage