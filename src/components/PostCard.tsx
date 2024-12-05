export interface PostProps {
  id: number;
  image?: string;
  content: string;
  publishedAt: string;
  category: string;
  title: string;
  userId: number;
}

export const PostCard = (props: PostProps) => {
 const { id, image, content, publishedAt, category, title, userId } = props;
  return (
    <div className="post-card" id={id.toString()}>
      <h2>{title}</h2>
      {image && <img src={image} alt={title} />}
      <p>{content}</p>
      <p>Опубликовано: {publishedAt}</p>
      <p>Категория: {category}</p>
      <p>ID пользователя: {userId}</p>
    </div>
  );
};