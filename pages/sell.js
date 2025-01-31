import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sell = () => {
  const { data: session } = useSession();
  const fileInputRef = useRef(null);

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
  const [categories, setCategories] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
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
    setFormData({ ...formData, [name]: value });
  };

  const validateFile = (file) => {
    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      return "Only PNG, JPG, and WEBP files are allowed.";
    }
    if (file.size > maxSize) {
      return "File size must be less than 2MB.";
    }
    return null;
  };

  const handleAlbumChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setErrorMessages((prev) => ({ ...prev, featuredImage: error }));
      return;
    }

    setFeaturedImage(file);
    setErrorMessages((prev) => ({ ...prev, featuredImage: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!formData.title.trim()) errors.title = "Title is required.";
    if (!formData.category_id) errors.category_id = "Category is required.";
    if (!formData.description.trim()) errors.description = "Description is required.";
    if (!formData.minimum_bid) errors.minimum_bid = "Minimum bid is required.";
    if (!formData.reserve_price) errors.reserve_price = "Reserve price is required.";
    if (!formData.start_date) errors.start_date = "Start date is required.";
    if (!formData.end_date) errors.end_date = "End date is required.";
    if (!featuredImage) errors.featuredImage = "Featured image is required.";

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => submissionData.append(key, formData[key]));
    submissionData.append("featured_image", featuredImage);

    try {
      await axios.post(
        "https://your-laravel-api.com/api/auctions_store",
        submissionData,
        { headers: { "Content-Type": "multipart/form-data" } }
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
        is_buynow: "0",
        buy_now_price: "",
        description: "",
        international_shipping: "0",
        shipping_conditions: "",
        shipping_terms: "",
      });
      setFeaturedImage(null);
    } catch (error) {
      setMessage("Failed to create auction.");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid  p-0  p-xl-5 color">
       
        <div className=" sell-head  p-4  ">
          <h1 className="up-listing pt-3 mb-3 mb-lg-5 ps-0 ps-md-5 ">Upload your listings</h1>
          <div className="pe-5 pt-3">
          <button type="submit" className="btn btn-green mt-3 mx-2">
          <i class="fa-solid fa-bolt mx-2 fs-6"></i>
          Promoted
                </button>
          <button type="submit" className="btn btn-black mt-3 mx-2 d-none d-lg-inline">
          Publish                </button>
                </div>
                </div>          <div className="row">
            <div className="col-lg-6">
              {message && <p className="alert alert-info">{message}</p>}
              <form onSubmit={handleSubmit} className="px-4 p-sm-5" >
                <div className="form-group">
                  <label htmlFor="title">Item Name</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter your title here"
                    className="form-control"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                

                <div className="form-group">
                  <label htmlFor="category">Select Category</label>
                  <select
                    id="category"
                    name="category_id"
                    className="form-control"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select your category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Item Description</label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Please write something about your item here"
                    className="form-control"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  />
                </div>
                <select 
                 className="form-control"
                >
                  <option>Select your country</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                {/* Pricing and Shipping Options */}
      <div className="row">
      <div className="col-12 col-sm-6">
          <div className="form-group">
            <label htmlFor="minimum_bid">Minimum Price</label>
            <input
              type="number"
              placeholder="00"
              name="minimum_bid"
              id="minimum_bid"
              className="form-control"
              value={formData.minimum_bid}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <label htmlFor="reserve_price">Starting Bid Price</label>
            <input
              type="number"
              placeholder="00 $"
              name="reserve_price"
              id="reserve_price"
              className="form-control"
              value={formData.reserve_price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
       
      </div>
 {/* Date and Time Fields */}
 <div className="row">
        <div className="col-md-6">
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
        <div className="col-md-6">
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
      </div>
                {/* <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button> */}
              </form>
            </div>

            <div className="col-lg-6">
              <div className="album shadow-lg p-3 text-center">
                <input
                  type="file"
                  id="album"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleAlbumChange}
                />
                <img
                  src={featuredImage ? URL.createObjectURL(featuredImage) : "assets/images/upload.png"}
                  alt="Uploaded Image"
                  className="rounded"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                  <p className="px-5 pt-3  pb-1 uppara">
                  You can upload multiple images, and they should be in PNG,
                  GIF, WEBP, MP4, or MP3. Max 1GB.
                </p>
                <button className="btn btn-secondary mt-2" onClick={() => fileInputRef.current.click()}>
                  Upload
                </button>
              </div>
              <button type="submit" className="btn btn-black mb-5 mx-2 ms-auto w-25 d-block d-lg-none">
              Publish                </button>
            </div>

          
          </div>
        </div>
     
      <Footer />
    </>
  );
};

export default Sell;
