import { authResponse, loginPayload, registerPayload } from "@/types/auth";
import { postJSON } from "../http/post-json";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function registerUser(
  payload: registerPayload
): Promise<authResponse> {
  return postJSON<authResponse>(`${BACKEND_URL}/auth/register`, payload);
}

export async function loginUser(payload: loginPayload): Promise<authResponse> {
  return postJSON<authResponse>(`${BACKEND_URL}/auth/login`, payload);
}
