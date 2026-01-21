// export function getTodosByUserId(id) {}

import axios from "axios";

const USER_API = "https://jsonplaceholder.typicode.com/users";
const TODO_API = "https://jsonplaceholder.typicode.com/todos";

/* ---------- Types ---------- */

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface User {
  id: number;
  name: string;
  phone: string;
  address: Address;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface UserWithTodos {
  id: number;
  name: string;
  address: Address;
  phone: string;
  todos: Todo[];
}

/* ---------- Function ---------- */

export async function getTodosByUserId(
  id: number
): Promise<UserWithTodos | "Invalid id"> {
  try {
    const [userRes, todoRes] = await Promise.all([
      axios.get<User[]>(USER_API),
      axios.get<Todo[]>(TODO_API),
    ]);

    const users = userRes.data;
    const todos = todoRes.data;

    const foundUser = users.find((user) => user.id === id);

    // ❗ สำคัญที่สุด
    if (!foundUser) {
      return "Invalid id";
    }

    const userTodos = todos.filter((todo) => todo.userId === id);

    return {
      id: foundUser.id,
      name: foundUser.name,
      address: foundUser.address,
      phone: foundUser.phone,
      todos: userTodos, // ว่างได้
    };
  } catch {
    return "Invalid id";
  }
}
