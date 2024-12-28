import React from "react";
import InvoiceTable from "../components/InvoiceTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
const MyInvoices = () => {
  return (
    <>
    <Header />
    
    <section className="invoices">
      <div className="container-fluid">
        <div className="invoices-main-heading">
          <h2>My Invoices</h2>
        </div>
        <InvoiceTable />
      </div>
    </section>
    <Footer />
    </>
  );
};

export default MyInvoices;
