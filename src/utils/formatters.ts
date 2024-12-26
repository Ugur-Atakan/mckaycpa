export const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "awaiting_client":
      return "Awaiting Client Approval";
    case "client_reviewed":
      return "Client Approved";
    case "completed":
      return "Completed";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export const getStatusStyles = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "awaiting_client":
      return "bg-purple-200 text-purple-900";
    case "client_reviewed":
      return "bg-emerald-200 text-emerald-900";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
