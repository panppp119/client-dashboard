import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTable from "../DataTable";

const columns = [
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
];

const data = [
  { id: 1, name: "Banana", price: 10 },
  { id: 2, name: "Apple", price: 20 },
  { id: 3, name: "Cherry", price: 5 },
];

test("sorts rows ascending when header is clicked", async () => {
  render(<DataTable data={data} columns={columns} />);

  const rowsBefore = screen.getAllByRole("row").slice(1);
  expect(rowsBefore[0]).toHaveTextContent("Banana");

  await userEvent.click(screen.getByText(/Name/));

  const rowsAfter = screen.getAllByRole("row").slice(1);
  expect(rowsAfter[0]).toHaveTextContent("Apple");
});

test("shows empty state when no data", () => {
  render(<DataTable data={[]} columns={columns} />);
  expect(screen.getByText("No results found")).toBeInTheDocument();
});