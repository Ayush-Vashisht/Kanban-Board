

import { getPriorityIcon, getStatusIcon } from "../../utils/utils";
import "./Ticket.css";

export default function Ticket({ ticket, users, groupBy }) {
  return (
    <div className="ticket">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {groupBy !== "user" && (
          <div className="user-avatar-container">
            <div className="user-avatar">
              {users.find((u) => u.id === ticket.userId)?.name.charAt(0)}
            </div>
            {users.find((u) => u.id === ticket.userId)?.available !==
              undefined && (
              <div
                className={`availability-indicator ${
                  users.find((u) => u.id === ticket.userId)?.available
                    ? "available"
                    : "unavailable"
                }`}
              />
            )}
          </div>
        )}
      </div>
      <div className="ticket-body">
        {groupBy !== "status" && (
          <img
            src={getStatusIcon(ticket.status)}
            alt={ticket.status}
            className="status-icon"
          />
        )}
        <h3 className="ticket-title">{ticket.title}</h3>
      </div>
      <div className="ticket-footer">
        {groupBy !== "priority" && (
          <img
            src={getPriorityIcon(ticket.priority)}
            alt="Priority"
            className="priority-icon"
          />
        )}
        {ticket.tag.map((tag) => (
          <span key={tag} className="tag">
            <div className="feature-indicator" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
