import axios from "axios";
import { GetServerSideProps } from "next";

import Layout from "../components/layout";
import styles from "../styles/users.module.css";

interface User {
  id: number;
  name: string;
}

interface UsersProps {
  users: User[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <Layout>
      <section className={styles.usersContainer}>
        <h1>List of Users</h1>
        <ul className={styles.usersList}>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<UsersProps> = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  const users: User[] = response.data;

  return {
    props: { users },
  };
};

export default Users;
