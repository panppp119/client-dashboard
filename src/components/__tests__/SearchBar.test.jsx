import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import SearchBar from "../SearchBar";

function Wrapper() {
  const [value, setValue] = useState("");
  return <SearchBar value={value} onChange={setValue} />;
}

test("updates input value when user types", async () => {
  render(<Wrapper />);
  const input = screen.getByPlaceholderText("ค้นหาสินค้า...");
  await userEvent.type(input, "shirt");
  expect(input).toHaveValue("shirt");
});