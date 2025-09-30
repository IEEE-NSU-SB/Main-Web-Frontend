import { useEffect, useState } from "react";

export function useFetchDataAPI({apiUrl}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Fetch from API in production
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);

      } catch (err) {
        console.error("Error fetching data:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { loading, data };
}


export function useFetchDataJSON({ path }: { path: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Dynamically import JSON file
        const module = await import(`../${path}`);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setData(module.default);
      } catch (err) {
        console.error(`Error loading local JSON file: ${path}`, err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [path]);

  return { loading, data };
}

