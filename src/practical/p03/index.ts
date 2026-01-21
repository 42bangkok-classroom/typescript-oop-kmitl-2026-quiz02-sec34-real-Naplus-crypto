// export function filterUserById(id) {}

import axios from "axios";

const USER_API = "https://jsonplaceholder.typicode.com/users";

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

interface FilteredUser {
  id: number;
  name: string;
  phone: string;
  address: Address;
}

/* ---------- Function ---------- */

export async function filterUserById(
  id: number
): Promise<FilteredUser | "Invalid id"> {
  try {
    const response = await axios.get<User[]>(USER_API);
    const users = response.data;

    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      return "Invalid id";
    }

    return {
      id: foundUser.id,
      name: foundUser.name,
      phone: foundUser.phone,
      address: foundUser.address,
    };
  } catch (error) {
    throw error;
  }
}
