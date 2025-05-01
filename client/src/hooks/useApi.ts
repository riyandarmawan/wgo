import { useState } from "react";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

interface UseApiOptions<TPayload> {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  payload?: TPayload;
}

interface UseApiResult<TResponse> {
  data: TResponse | null;
  error: string;
  loading: boolean;
  execute: () => Promise<void>;
}

export default function useApi<TResponse = unknown, TPayload = unknown>({
  method,
  url,
  headers,
  payload,
}: UseApiOptions<TPayload>): UseApiResult<TResponse> {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const execute = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body:
          method === "GET" || method === "DELETE"
            ? null
            : JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API request failed");

      const result = await res.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, execute };
}
