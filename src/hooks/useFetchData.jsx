import { useState, useEffect, useCallback } from "react";

function useFetchData(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    const controller = new AbortController();

    setStatus("loading");
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setStatus("success");
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // ยกเลิกเอง ไม่ใช่ error จริง
        setError(err.message);
        setStatus("error");
      });

    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    const cleanup = fetchData();
    return cleanup;
  }, [fetchData]);

  return { data, status, error, refetch: fetchData };
}

export default useFetchData;