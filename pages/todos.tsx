import axios from "axios";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import styles from "../styles/todos.module.css";

interface Todo {
  id: number;
  title: string;
}

interface TodosProps {
  todos: Todo[];
}

const Todos: React.FC<TodosProps> = ({ todos }) => {
  return (
    <Layout>
      <section className={styles.todosContainer}>
        <h1>Todos</h1>
        <ul className={styles.todosList}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              {todo.title}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<TodosProps> = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const todos: Todo[] = response.data;

  return {
    props: { todos },
  };
};

export default Todos;
