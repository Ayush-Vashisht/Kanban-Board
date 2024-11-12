import { useEffect, useState } from "react";
import axios from "axios";
import "./KanbanBoard.css";
import Dropdown from "../Dropdown/Dropdown";
import Column from "../Column/Column";
import { groupTickets } from "../../utils/utils";

export default function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem("groupBy") || "status"
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "priority"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      setTickets(data.tickets);
      setUsers(data.users);
    };
    fetchData();
  }, []);

  // Save view state
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  const groupedTickets = groupTickets(tickets, users, groupBy, sortBy);

  return (
    <div className="kanban-board">
      <div className="header">
        <Dropdown
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      </div>
      <div className="board">
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <Column
            key={group}
            group={group}
            tickets={tickets}
            groupBy={groupBy}
            users={users}
          />
        ))}
      </div>
    </div>
  );
}
