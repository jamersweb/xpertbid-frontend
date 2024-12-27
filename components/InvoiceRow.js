import React from "react";

const InvoiceRow = ({ invoice }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "invoice-status-paid";
      case "In Progress":
        return "invoice-status-inprogress";
      case "Rejected":
        return "invoice-status-rejected";
      default:
        return "";
    }
  };

  return (
    <tr>
      <th scope="row">{invoice.id}</th>
      <td>
        <p className="amount">${invoice.amount}</p>
      </td>
      <td>
        <p className="name">{invoice.name}</p>
      </td>
      <td>
        <p className="date-time">{invoice.date}</p>
      </td>
      <td>
        <div className={`invoice-status-container ${getStatusClass(invoice.status)}`}>
          <span>{invoice.status}</span>
        </div>
      </td>
    </tr>
  );
};

export default InvoiceRow;