import { useState } from "react";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

interface usePostOptions {
  method: HttpMethod;
  endpoint: string;
  headers?: Record<string, string>;
}

interface usePostResult<TRequest, TResponse> {
  data: TResponse | null;
  error: string;
  loading: boolean;
  execute: (body?: TRequest) => Promise<TResponse | null>;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function usePost<TRequest = unknown, TResponse = unknown>({
  method,
  endpoint,
  headers,
}: usePostOptions): usePostResult<TRequest, TResponse> {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const execute = async (body?: TRequest): Promise<TResponse | null> => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`${SERVER_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body:
          method === "GET" || method === "DELETE" ? null : JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "API request failed");

      const { data: result } = json;
      setData(result);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, execute };
}
