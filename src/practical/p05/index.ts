// export function safeFetchUser() {}

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
  address?: Address;
}

interface SafeUser {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
}

/* ---------- Function ---------- */

export async function safeFetchUser(
  userId: number
): Promise<SafeUser | null> {
  // invalid userId
  if (userId <= 0) {
    return null;
  }

  try {
    const response = await axios.get<User[]>(USER_API);

    if (!response.data) {
      return null;
    }

    const foundUser = response.data.find(
      (user) => user.id === userId
    );

    if (!foundUser) {
      return null;
    }

    return {
      id: foundUser.id,
      name: foundUser.name,
      phone: foundUser.phone,
      address: foundUser.address ?? null,
    };
  } catch {
    return null;
  }
}
