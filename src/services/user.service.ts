import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

const userService = {
  getSession: async () => {
    const cookieStore = await cookies();

    try {
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();
      if (session === null) {
        return { session: null, message: "session not found" };
      }
      return session;
    } catch (error: any) {
      return { seesion: null, message: error.message };
    }
  },
  // getCurrentUser: async () => {
  //   const cookieStore = await cookies();

  //   try {
  //     const res = await fetch(`${env.API_URL}/auth/me`, {
  //       headers: {
  //         cookie: cookieStore.toString(),
  //       },
  //       cache: "no-store",
  //     });

  //     const user = await res.json();
  //     return user;
  //   } catch (error: any) {
  //     return { seesion: null, message: error.message };
  //   }
  // },
getCurrentUser: async () => {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${API_URL}/api/auth/get-session`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const session = await res.json();

    return session?.user ?? null;
  } catch (error: any) {
    return null;
  }
},

  getAllUsers: async () => {
    const cookieStore = await cookies();

    try {
      const res = await fetch(`${env.API_URL}/api/admin/users`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const users = await res.json();

      return users;
    } catch (error: any) {
      return { users: null, message: error.message };
    }
  },
};

export default userService;