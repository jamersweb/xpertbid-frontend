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
    is_buynow: "0",
    buy_now_price: "",
    description: "",
    international_shipping: "0",
    shipping_conditions: "",
    shipping_terms: "",
  });

  const [featuredImage, setFeaturedImage] = useState(null);
  const [album, setAlbum] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories and set user_id when session is available
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
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    if (session?.user) {
      setFormData((prevData) => ({
        ...prevData,
        user_id: session.user.id,
      }));
    }
  }, [session]);

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

  const validateForm = (formData, featuredImage, album) => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    }
    if (!formData.user_id) {
      errors.user_id = "User is required.";
    }
    if (!formData.category_id) {
      errors.category_id = "Category is required.";
    }
    if (!formData.start_date) {
      errors.start_date = "Start date is required.";
    }
    if (!formData.end_date) {
      errors.end_date = "End date is required.";
    } else if (new Date(formData.end_date) < new Date(formData.start_date)) {
      errors.end_date = "End date cannot be earlier than start date.";
    }
    if (!formData.reserve_price || formData.reserve_price <= 0) {
      errors.reserve_price = "Reserve price must be greater than zero.";
    }
    if (!formData.minimum_bid || formData.minimum_bid <= 0) {
      errors.minimum_bid = "Minimum bid must be greater than zero.";
    }
    if (!featuredImage) {
      errors.featuredImage = "Featured image is required.";
    }
    if (album.length === 0) {
      errors.album = "At least one album image is required.";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData, featuredImage, album);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setError(null);

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

      await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/auctions_store",
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Auction created successfully!");
      setFormData({
        title: "",
        user_id: session?.user.id || "",
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
        is_buynow: "0",
        buy_now_price: "",
        description: "",
        international_shipping: "0",
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
    <>
      <Header />
      <div className="container-fluid py-5 color">
  <div className="container p-5 rounded color-white">
    <h2>Create Auction</h2>
    {message && <p className="alert alert-info">{message}</p>}
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className={`form-control ${error?.title ? "is-invalid" : ""}`}
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        {error?.title && <div className="invalid-feedback">{error.title}</div>}
      </div>

      {/* Category and Condition */}
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <select
                id="category"
                name="category_id"
                className={`form-control ${error?.category_id ? "is-invalid" : ""}`}
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
            )}
            {error?.category_id && <div className="invalid-feedback">{error.category_id}</div>}
          </div>
        </div>

        <div className="col-6">
          <div className="form-group">
            <label htmlFor="product_condition">Condition</label>
            <select
              name="product_condition"
              id="product_condition"
              className="form-control"
              value={formData.product_condition || "New"} // Default value
              onChange={handleInputChange}
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Image and Album */}
      <div className="form-row">
        <div className="row">
          <div className="col-6">
            <label htmlFor="featuredImage">Featured Image</label>
            <input
              type="file"
              className="form-control"
              id="featuredImage"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-6">
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
      </div>

      {/* Additional Fields */}
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="product_year">Product Year</label>
            <input
              type="text"
              name="product_year"
              id="product_year"
              className="form-control"
              value={formData.product_year}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="product_location">Product Location</label>
            <input
              type="text"
              name="product_location"
              id="product_location"
              className="form-control"
              value={formData.product_location}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Date and Time Fields */}
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              name="start_date"
              id="start_date"
              className="form-control"
              value={formData.start_date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="end_date">End Date</label>
            <input
              type="date"
              name="end_date"
              id="end_date"
              className="form-control"
              value={formData.end_date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="live_auction_date">Live Auction Date</label>
            <input
              type="date"
              name="live_auction_date"
              id="live_auction_date"
              className="form-control"
              value={formData.live_auction_date}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Pricing and Shipping Options */}
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="reserve_price">Reserve Price</label>
            <input
              type="number"
              name="reserve_price"
              id="reserve_price"
              className="form-control"
              value={formData.reserve_price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="minimum_bid">Minimum Bid</label>
            <input
              type="number"
              name="minimum_bid"
              id="minimum_bid"
              className="form-control"
              value={formData.minimum_bid}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="is_buynow">Buy Now Option?</label>
            <select
              name="is_buynow"
              id="is_buynow"
              className="form-control"
              value={formData.is_buynow}
              onChange={handleInputChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="buy_now_price">Buy Now Price</label>
            <input
              type="number"
              name="buy_now_price"
              id="buy_now_price"
              className="form-control"
              value={formData.buy_now_price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="international_shipping">International Shipping Available?</label>
            <select
              name="international_shipping"
              id="international_shipping"
              className="form-control"
              value={formData.international_shipping}
              onChange={handleInputChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description and Shipping Terms */}
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="shipping_conditions">Shipping Conditions</label>
        <textarea
          name="shipping_conditions"
          id="shipping_conditions"
          className="form-control"
          value={formData.shipping_conditions}
          onChange={handleInputChange}
          rows="4"
        />
      </div>
      <div className="form-group">
        <label htmlFor="shipping_terms">Shipping Terms</label>
        <textarea
          name="shipping_terms"
          id="shipping_terms"
          className="form-control"
          value={formData.shipping_terms}
          onChange={handleInputChange}
          rows="4"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  </div>
</div>

      <Footer />
    </>
  );
};

export default Sell;
