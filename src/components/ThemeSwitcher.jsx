import themes from "../themes.json";

function ThemeSwitcher({ value, onChange }) {
  return (
    <select
      className="theme-switcher"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Switch client theme"
    >
      {Object.entries(themes).map(([key, theme]) => (
        <option key={key} value={key}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}

export default ThemeSwitcher;