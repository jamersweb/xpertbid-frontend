import React, { useState, useEffect } from "react";
import axios from "axios";

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    user_id: "",
    category_id: "",
    sub_category_id: "",
    start_date: "",
    end_date: "",
    product_year: "",
    product_location: "",
    live_auction_date: "",
    live_auction_start_time: "",
    live_auction_end_time: "",
    reserve_price: "",
    minimum_bid: "",
    bid_increment: "",
    is_buynow: "",
    buy_now_price: "",
    description: "",
    international_shipping: "",
    shipping_conditions: "",
    shipping_terms: "",
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [album, setAlbum] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch categories, subcategories, and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, subCategoryRes, userRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/categories"),
          axios.get("http://127.0.0.1:8000/api/subcategories"),
          axios.get("http://127.0.0.1:8000/api/users"),
        ]);

        setCategories(categoryRes.data);
        setSubCategories(subCategoryRes.data);
        setUsers(userRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleAlbumChange = (e) => {
    setAlbum(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submissionData = new FormData();
      Object.keys(formData).forEach((key) => {
        submissionData.append(key, formData[key]);
      });

      if (featuredImage) {
        submissionData.append("image", featuredImage);
      }

      album.forEach((file) => {
        submissionData.append("album[]", file);
      });

      const response = await axios.post(
        "http://127.0.0.1:8000/api/auctions",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Auction created successfully!");
      setFormData({
        title: "",
        user_id: "",
        category_id: "",
        sub_category_id: "",
        start_date: "",
        end_date: "",
        product_year: "",
        product_location: "",
        live_auction_date: "",
        live_auction_start_time: "",
        live_auction_end_time: "",
        reserve_price: "",
        minimum_bid: "",
        bid_increment: "",
        is_buynow: "",
        buy_now_price: "",
        description: "",
        international_shipping: "",
        shipping_conditions: "",
        shipping_terms: "",
      });
      setFeaturedImage(null);
      setAlbum([]);
    } catch (error) {
      console.error("Error creating auction:", error);
      setMessage("Failed to create auction.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Auction</h2>
      {message && <p className="alert alert-info">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* User, Category, Subcategory */}
        <div className="form-row">
          <div className="col">
            <label htmlFor="user_id">User</label>
            <select
              className="form-control"
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="category_id">Category</label>
            <select
              className="form-control"
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="sub_category_id">Subcategory</label>
            <select
              className="form-control"
              id="sub_category_id"
              name="sub_category_id"
              value={formData.sub_category_id}
              onChange={handleInputChange}
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Image and Album */}
        <div className="form-row">
          <div className="col">
            <label htmlFor="featuredImage">Featured Image</label>
            <input
              type="file"
              className="form-control"
              id="featuredImage"
              onChange={handleImageChange}
            />
          </div>
          <div className="col">
            <label htmlFor="album">Album</label>
            <input
              type="file"
              className="form-control"
              id="album"
              multiple
              onChange={handleAlbumChange}
            />
          </div>
        </div>

        {/* Other Fields */}
        {/* Repeat similar patterns for other fields as required */}

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sell;