import { useState, useMemo, useEffect } from "react";

const PAGE_SIZE = 5;

function DataTable({ data, columns }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  // reset ไปหน้า 1 ทุกครั้งที่ data เปลี่ยน (เช่น จากการ search) ป้องกันค้างอยู่หน้าที่ไม่มีข้อมูล
  useEffect(() => {
    setPage(1);
  }, [data]);

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const result = String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, {
        numeric: true,
      });
      return sortDir === "asc" ? result : -result;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / PAGE_SIZE));

  const pagedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [sortedData, page]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  if (data.length === 0) {
    return <p className="empty-state">No results found</p>;
  }

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => handleSort(col.key)}>
                {col.label} {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pagedData.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          {" "}
          Page {page} / {totalPages}{" "}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;