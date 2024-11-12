

import "./Dropdown.css";

export default function Dropdown({
  groupBy,
  setGroupBy,
  sortBy,
  setSortBy,
  isDropdownOpen,
  setIsDropdownOpen,
}) {
  const groupingOptions = [
    { value: "status", label: "Status" },
    { value: "user", label: "User" },
    { value: "priority", label: "Priority" },
  ];

  const sortOptions = [
    { value: "priority", label: "Priority" },
    { value: "title", label: "Title" },
  ];

  return (
    <div className="display-dropdown">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="display-button"
      >
        <img src="Display.svg" alt="Display" className="icon" />
        Display
        <img src="down.svg" alt="Toggle" className="" />
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-group">
            <label>Grouping</label>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              {groupingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-group">
            <label>Ordering</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
