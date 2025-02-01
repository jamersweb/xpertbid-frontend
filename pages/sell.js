import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sell = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    user_id: "",
    category_id: "",
    description: "",
    minimum_bid: "",
    reserve_price: "",
    start_date: "",
    end_date: "",
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://violet-meerkat-830212.hostingersite.com/public/api/get-category"
        );
        setCategories(response.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (session && session.user) {
      setFormData((prevData) => ({
        ...prevData,
        user_id: session.user.id,
      }));
    }
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://your-laravel-api.com/api/auctions_store",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("Auction created successfully!");
      setFormData({
        title: "",
        user_id: "",
        category_id: "",
        description: "",
        minimum_bid: "",
        reserve_price: "",
        start_date: "",
        end_date: "",
      });
    } catch (error) {
      console.error("Failed to create auction:", error);
      setMessage("Failed to create auction. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid p-0 p-xl-5">
        {message && <p className="alert alert-info">{message}</p>}
        {error && <p className="alert alert-danger">{error}</p>}

        <form onSubmit={handleSubmit} className="px-4 p-sm-5">
          <label htmlFor="title">Item Name</label>
          <input type="text" name="title" className="form-control" value={formData.title} onChange={handleInputChange} />

          <label htmlFor="category">Select Category</label>
          <select name="category_id" className="form-control" value={formData.category_id} onChange={handleInputChange}>
            <option value="">Select your category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button type="submit" className="btn btn-dark mt-3">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Sell;