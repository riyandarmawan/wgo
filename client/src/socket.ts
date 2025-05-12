import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : SERVER_URL;

export const socket = io(URL, { autoConnect: false });
