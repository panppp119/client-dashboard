import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeSwitcher from "../ThemeSwitcher";

test("calls onChange with the selected theme key", async () => {
  const handleChange = vi.fn();
  render(<ThemeSwitcher value="themeA" onChange={handleChange} />);

  await userEvent.selectOptions(screen.getByLabelText("Switch client theme"), "themeB");

  expect(handleChange).toHaveBeenCalledWith("themeB");
});