import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddPaymentMethod = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    paymentMethod: "Bank Account",
    bankName: "",
    ibanNumber: "",
    swiftCode: "",
    accountTitle: "",
    country: "",
    branchAddress: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Method Data:", formData);
    alert("Payment method saved successfully!");
    onClose(); // Close modal after submission
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Select Payment Method */}
          <Form.Group className="mb-3">
            <Form.Label>Select Payment Method</Form.Label>
            <Form.Select id="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
              <option>Bank Account</option>
              <option>PayPal</option>
              <option>Credit Card</option>
            </Form.Select>
          </Form.Group>

          {/* Bank Name */}
          <Form.Group className="mb-3">
            <Form.Label>Bank Name*</Form.Label>
            <Form.Control
              type="text"
              id="bankName"
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* IBAN Number */}
          <Form.Group className="mb-3">
            <Form.Label>IBAN Number*</Form.Label>
            <Form.Control
              type="text"
              id="ibanNumber"
              placeholder="Enter IBAN number"
              value={formData.ibanNumber}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Swift Code */}
          <Form.Group className="mb-3">
            <Form.Label>Swift Code*</Form.Label>
            <Form.Control
              type="text"
              id="swiftCode"
              placeholder="Enter Swift code"
              value={formData.swiftCode}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Account Title */}
          <Form.Group className="mb-3">
            <Form.Label>Account Title*</Form.Label>
            <Form.Control
              type="text"
              id="accountTitle"
              placeholder="Enter account title"
              value={formData.accountTitle}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Country */}
          <Form.Group className="mb-3">
            <Form.Label>Country*</Form.Label>
            <Form.Select id="country" value={formData.country} onChange={handleInputChange}>
              <option>Select Country</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </Form.Select>
          </Form.Group>

          {/* Branch Address */}
          <Form.Group className="mb-3">
            <Form.Label>Branch Address*</Form.Label>
            <Form.Control
              type="text"
              id="branchAddress"
              placeholder="Enter branch address"
              value={formData.branchAddress}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Save Changes Button */}
          <Button variant="dark" type="submit" className="w-100 mt-4">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPaymentMethod;
