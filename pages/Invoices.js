import React from "react";
import InvoiceTable from "../components/InvoiceTable";

const MyInvoices = () => {
  return (
    <section className="invoices">
      <div className="container-fluid">
        <div className="invoices-main-heading">
          <h2>My Invoices</h2>
        </div>
        <InvoiceTable />
      </div>
    </section>
  );
};

export default MyInvoices;
