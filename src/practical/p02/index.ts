// type newUser = {
//   name: string;
//   username?: string;
//   email?: string;
//   address?: {
//     street: string;
//     suite: string;
//     city: string;
//     zipcode: string;
//     geo: {
//       lat: string;
//       lng: string;
//     };
//   } | null;
//   phone: string;
//   website?: string;
//   company?: {
//     name: string;
//     // catchPhrase: string;
//     bs: string;
//   };
// };
// export function addUser(newUser: newUser | null) {}

import axios from "axios";

const USER_API = "https://jsonplaceholder.typicode.com/users";

/* ---------- Types ---------- */

interface Geo {
  lat: string | null;
  lng: string | null;
}

interface Address {
  street: string | null;
  suite: string | null;
  city: string | null;
  zipcode: string | null;
  geo: Geo | null;
}

interface User {
  id: number;
  name: string | null;
  phone: string | null;
  address: Address | null;
}

interface NewUserInput {
  name?: string;
  phone?: string;

  username?: string;
  email?: string;
  website?: string;
  company?: unknown;

  address?: Address | null;
}


/* ---------- Function ---------- */

export async function addUser(
  newUserData: NewUserInput | null
): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(USER_API);
    const users = response.data;

    // keep only required fields
    const formattedUsers: User[] = users.map((user) => ({
      id: user.id,
      name: user.name ?? null,
      phone: user.phone ?? null,
      address: user.address ?? null,
    }));

    // edge case: null new user
    if (newUserData === null) {
      return formattedUsers;
    }

    const lastId = formattedUsers[formattedUsers.length - 1].id;

    const newUser: User = {
      id: lastId + 1,
      name: newUserData.name ?? null,
      phone: newUserData.phone ?? null,
      address: newUserData.address
        ? {
            street: newUserData.address.street ?? null,
            suite: newUserData.address.suite ?? null,
            city: newUserData.address.city ?? null,
            zipcode: newUserData.address.zipcode ?? null,
            geo: newUserData.address.geo
              ? {
                  lat: newUserData.address.geo.lat ?? null,
                  lng: newUserData.address.geo.lng ?? null,
                }
              : null,
          }
        : null,
    };

    return [...formattedUsers, newUser];
  } catch (error) {
    throw error;
  }
}
