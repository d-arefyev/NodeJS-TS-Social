import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:5005";

const token = localStorage?.token;

export const socket = io(URL, {
  auth: { token },
});
