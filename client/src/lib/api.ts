type registerPayload = {
  name: string;
  username: string;
  password: string;
};

type authResponse = {
  data: { access_token: string };
  message: string;
};

export async function registerUser(payload: registerPayload): Promise<authResponse> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to register");
  }

  return await res.json();
}
