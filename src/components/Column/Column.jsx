import { getPriorityIcon, getStatusIcon } from "../../utils/utils";
import Ticket from "../Ticket/Ticket";
import "./Column.css";

export default function Column({ group, tickets, groupBy, users }) {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-header-left">
          {groupBy === "user" && (
            <div className="user-avatar-container">
              <div className="user-avatar">
                {users.find((u) => u.id === tickets[0].userId)?.name.charAt(0)}
              </div>
              {users.find((u) => u.id === tickets[0].userId)?.available !==
                undefined && (
                <div
                  className={`availability-indicator ${
                    users.find((u) => u.id === tickets[0].userId)?.available
                      ? "available"
                      : "unavailable"
                  }`}
                />
              )}
            </div>
          )}
          {groupBy === "priority" && (
            <img
              src={getPriorityIcon(tickets[0].priority)}
              alt="Priority"
              className="priority-icon"
            />
          )}
          {groupBy === "status" && (
            <img
              src={getStatusIcon(group)}
              alt={group}
              className="status-icon"
            />
          )}
          <h2>{group}</h2>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="column-header-right">
          <button className="icon-button">
            <img src="add.svg" alt="Add" className="icon" />
          </button>
          <button className="icon-button">
            <img src="3 dot menu.svg" alt="Menu" className="icon" />
          </button>
        </div>
      </div>
      <div className="tickets">
        {tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            users={users}
            groupBy={groupBy}
          />
        ))}
      </div>
    </div>
  );
}
