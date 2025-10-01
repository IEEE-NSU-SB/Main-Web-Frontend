import { useEffect, useState, useCallback } from "react";

const api_domain = import.meta.env.VITE_API_URL;

export function useFetchDataAPI<T = any>({ apiUrl }: { apiUrl: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${api_domain}/${apiUrl}`);
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, data, error, refetch: fetchData };
}


export function useFetchDataJSON<T = any>({ path }: { path: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Dynamically import JSON file
      /* @vite-ignore */
      const module = await import(/* @vite-ignore */ `../${path}`);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setData(module.default);
    } catch (err: any) {
      console.error(`Error loading local JSON file: ${path}`, err);
      setError(err.message || "Something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, data, error, refetch: fetchData };
}