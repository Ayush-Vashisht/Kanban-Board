export const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return "SVG - Urgent Priority colour.svg";
      case 3:
        return "Img - High Priority.svg";
      case 2:
        return "Img - Medium Priority.svg";
      case 1:
        return "Img - Low Priority.svg";
      default:
        return "No-priority.svg";
    }
  };
  
  export const getStatusIcon = (group) => {
    switch (group) {
      case "In Progress":
        return "in-progress.svg";
      case "Todo":
        return "To-do.svg";
      case "Done":
        return "Done.svg";
      case "Cancelled":
        return "Cancelled.svg";
      default:
        return "Backlog.svg";
    }
  };
  
  export const priorityOrder = ["No Priority", "Urgent", "High", "Medium", "Low"];
  export const statusOrder = ["Backlog", "Todo", "In Progress", "Done", "Cancelled"];

  const priorityLabels = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority",
  };
  
  export const groupTickets = (tickets, users, groupBy, sortBy) => {
    let groups = {};

    switch (groupBy) {
      case "status":
        statusOrder.forEach((status) => {
          groups[status] = tickets.filter(
            (ticket) => ticket.status.toLowerCase() === status.toLowerCase()
          );
        });
        break;
      case "user":
        tickets.forEach((ticket) => {
          const user = users.find((u) => u.id === ticket.userId);
          const userName = user ? user.name : "Unassigned";
          if (!groups[userName]) groups[userName] = [];
          groups[userName].push(ticket);
        });
        break;
      case "priority":
        tickets.forEach((ticket) => {
          const priority = priorityLabels[ticket.priority];
          if (!groups[priority]) groups[priority] = [];
          groups[priority].push(ticket);
        });
        break;
    }

    const orderedGroups = {};
    if (groupBy === "priority") {
      priorityOrder.forEach((priority) => {
        if (groups[priority]) {
          orderedGroups[priority] = groups[priority];
        }
      });
    } else if (groupBy === "status") {
      statusOrder.forEach((status) => {
        if (groups[status]) {
          orderedGroups[status] = groups[status];
        }
      });
    } else {
      Object.keys(groups)
        .sort()
        .forEach((key) => {
          orderedGroups[key] = groups[key];
        });
    }

    Object.keys(orderedGroups).forEach((key) => {
      orderedGroups[key].sort((a, b) => {
        if (sortBy === "priority") return b.priority - a.priority;
        return a.title.localeCompare(b.title);
      });
    });

    return orderedGroups;
  };