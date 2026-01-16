export const API_URL = "https://jsonplaceholder.typicode.com/users";

import axios from "axios";

type Geo = {
  lat: string
  lng: string
}

type Address = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

type UserResult = {
  id: number
  name: string
  phone: string
  address: Address | null
}

export async function getPostalAddress(): Promise<UserResult[]> {
  try {
    const response = await axios.get(API_URL)
    const users = response.data

    if (!Array.isArray(users) || users.length === 0) {
      return []
    }

    return users.map((user): UserResult => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ?? null
    }))
  } catch (error) {
    return []
  } 
}
