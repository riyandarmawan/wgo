import { authResponse, loginPayload, registerPayload } from "@/types/auth";
import { postJSON } from "../http/post-json";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function registerUser(
  payload: registerPayload
): Promise<authResponse> {
  return postJSON<authResponse>(`${SERVER_URL}/auth/register`, payload);
}

export async function loginUser(payload: loginPayload): Promise<authResponse> {
  return postJSON<authResponse>(`${SERVER_URL}/auth/login`, payload);
}
