import type { User, UserData } from "./types";

export async function getUsers(page: number): Promise<UserData | null> {
  const response = await fetch(`http://localhost:8000/users?page=${page}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export async function getUser(id: number): Promise<User | null> {
  const response = await fetch(`http://localhost:8000/users/${id}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}
