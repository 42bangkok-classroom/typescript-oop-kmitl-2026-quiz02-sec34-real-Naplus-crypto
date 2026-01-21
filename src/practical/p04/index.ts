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
  if (id <= 0) {
    return "Invalid id";
  }

  try {
    // ✅ เรียก axios ตามลำดับ (ห้าม Promise.all)
    const userResponse = await axios.get<User | User[]>(
      `${USER_API}/${id}`
    );
    const todoResponse = await axios.get<Todo[]>(TODO_API);

    const userData = userResponse.data;

    // ✅ รองรับทั้ง array และ object
    const foundUser: User | undefined = Array.isArray(userData)
      ? userData.find((u) => u.id === id)
      : userData;

    if (!foundUser || foundUser.id !== id) {
      return "Invalid id";
    }

    const todos = todoResponse.data.filter(
      (todo) => todo.userId === id
    );

    return {
      id: foundUser.id,
      name: foundUser.name,
      address: foundUser.address,
      phone: foundUser.phone,
      todos,
    };
  } catch {
    return "Invalid id";
  }
}
