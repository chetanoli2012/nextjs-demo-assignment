import axios from "axios";
import { GetServerSideProps } from "next";

import Layout from "../../components/layout";
import styles from "../../styles/postDetails.module.css";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  body: string;
}

interface PostDetailsProps {
  post: Post;
  comments: Comment[];
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, comments }) => {
  return (
    <Layout>
      <section className={styles.postDetailsContainer}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postBody}>{post.body}</p>
        <h2>Comments</h2>
        <ul className={styles.commentsList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.commentItem}>
              {comment.body}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<PostDetailsProps> = async ({
  params,
}) => {
  const postId = params?.id;
  const [postResponse, commentsResponse] = await Promise.all([
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`),
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`),
  ]);

  const post: Post = postResponse.data;
  const comments: Comment[] = commentsResponse.data;

  return {
    props: { post, comments },
  };
};

export default PostDetails;
