import axios from "axios";
import Link from "next/link";
import { GetServerSideProps } from "next";

import Layout from "../components/layout";
import styles from "../styles/posts.module.css";

interface Post {
  id: number;
  title: string;
}

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <Layout>
      <section className={styles.postsContainer}>
        <h1>Posts</h1>
        <ul className={styles.postsList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<PostsProps> = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts: Post[] = response.data;

  return {
    props: { posts },
  };
};

export default Posts;
