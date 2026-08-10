import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});
// import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   /** The base URL of the server (optional if you're using the same domain) */
//   // http://localhost:5000
//   // baseURL: "https://food-hub-assignment.vercel.app",
//   baseURL: "http://localhost:5000",
//   fetchOptions: {
//     credentials: "include",
//   },
// });
