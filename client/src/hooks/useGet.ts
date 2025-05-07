import { useEffect, useState } from "react";

interface useGetOptions {
  endpoint: string;
}

interface useGetResult<TResponse> {
  data: TResponse | null;
  error: string;
  loading: boolean;
}

export default function useGet<TResponse = unknown>({
  endpoint,
}: useGetOptions): useGetResult<TResponse> {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setData(null);
    setError("");
    setLoading(true);

    const fetchData = async () => {
      try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;

        const token = localStorage.getItem("token");

        const res = await fetch(`${SERVER_URL}${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch data!");
        const result = await res.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, error, loading };
}
