import { useState, useMemo, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import useDebounce from "./hooks/useDebounce";
import useFetchData from "./hooks/useFetchData";
import themes from "./themes.json";
import "./index.css";

const COLUMNS = [
  { key: "title", label: "Product" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price ($)" },
];

function applyTheme(themeKey) {
  const theme = themes[themeKey];
  if (!theme) return;
  const root = document.documentElement;
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-bg", theme.bg);
  root.style.setProperty("--color-text", theme.text);
}

function App() {
  const [themeKey, setThemeKey] = useState("clientA");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data, status, error, refetch } = useFetchData(
    "https://dummyjson.com/products?limit=30"
  );

  useEffect(() => {
    applyTheme(themeKey);
  }, [themeKey]);

  const products = data?.products ?? [];

  const filteredProducts = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, debouncedQuery]);

  return (
    <div className="app">
      <Navbar clientName={themes[themeKey].name} themeKey={themeKey} onThemeChange={setThemeKey} />

      <main className="main-content">
        <SearchBar value={query} onChange={setQuery} />

        {status === "loading" && <p>Loading...</p>}

        {status === "error" && (
          <div>
            <p>Something went wrong: {error}</p>
            <button onClick={refetch}>Retry</button>
          </div>
        )}

        {status === "success" && <DataTable data={filteredProducts} columns={COLUMNS} />}
      </main>
    </div>
  );
}

export default App;