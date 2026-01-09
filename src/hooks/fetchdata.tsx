import { useEffect, useState, useCallback } from "react";

const api_domain = import.meta.env.VITE_API_URL;

// export function useFetchDataAPI<T = any>({ apiUrl }: { apiUrl: string }) {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<T | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await fetch(`${api_domain}/${apiUrl}`);
//       await new Promise((resolve) => setTimeout(resolve, 300));
//       if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);

//       const json = await res.json();
//       setData(json);
//     } catch (err: any) {
//       console.error("Error fetching data:", err);
//       setError(err.message || "Something went wrong");
//       setData(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [apiUrl]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { loading, data, error, refetch: fetchData };
// }

// Helper to get cookie by name
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

// Optionally call this once to make sure Django sets csrftoken
async function ensureCsrfCookie(): Promise<void> {
  await fetch(`${api_domain}/csrf/`, {
    credentials: "include",
  });
}

export function useFetchDataAPI<T = any>({ apiUrl, method = "GET", body = null, autoFetch = true, }: 
  { apiUrl:string; method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; body?: any; autoFetch?: boolean; }) {

  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const isWriteMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase());
      if (isWriteMethod) await ensureCsrfCookie();

      const headers: Record<string, string> = {};
      let requestBody: BodyInit | null = null;

      if (isWriteMethod && body) {
        if (body instanceof FormData) {
          requestBody = body; // browser sets Content-Type automatically
        } else {
          requestBody = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const csrfToken = getCookie("csrftoken");
        if (csrfToken) headers["X-CSRFToken"] = csrfToken;
      }

      const res = await fetch(`${api_domain}/${apiUrl}`, {
        method,
        body: requestBody,
        headers,
        credentials: "include",
      });


      if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);

      // Optional delay for loading UI
      await new Promise((resolve) => setTimeout(resolve, 300));

      const json: T = await res.json();
      setData(json);
    } catch (err: unknown) {
      console.error("Error fetching data:", err);
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, method, body]);

  useEffect(() => {
    if (autoFetch) fetchData();
  }, [fetchData, autoFetch]);

  return { loading, data, error, refetch: fetchData };
}

const jsonModules = import.meta.glob("../pages/**/*.json", {
  eager: false,      // important: we want lazy import
  query: "?url",      // emit as URL
}) as Record<string, () => Promise<{ default: string }>>;

export function useFetchDataJSON<T = any>({ path }: { path: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const fullPath = `../${path}`;
      const importFn = jsonModules[fullPath];

      if (!importFn) {
        throw new Error(`No JSON file found at: ${fullPath}`);
      }

      const module = await importFn(); // TS now knows module.default is string
      const moduleUrl = module.default;

      const res = await fetch(moduleUrl);
      if (!res.ok) throw new Error(`Failed to fetch ${moduleUrl}`);

      const json = await res.json();
      await new Promise((resolve) => setTimeout(resolve, 300));
      setData(json);
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