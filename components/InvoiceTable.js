import React, { useEffect, useState } from "react";
import InvoiceRow from "./InvoiceRow";

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Fetch invoices from API
    const fetchInvoices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/invoices");
        const data = await response.json();
        setInvoices(data.invoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="invoices-table">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Invoice</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Date Created</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => <InvoiceRow key={invoice.id} invoice={invoice} />)
          ) : (
            <tr>
              <td colSpan="5">No invoices found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;