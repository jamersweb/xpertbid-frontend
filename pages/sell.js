import React, { useState, useEffect } from "react";
//import axios from "axios";
//import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
//import React from "react";

const Sell = () => {
 //   const { data: session } = useSession();
  
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
  //const [subCategories, setSubCategories] = useState([]);
  //const [users, setUsers] = useState([]);
 // const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories, subcategories, and users
  useEffect(() => {

    
    const fetchCategories = async () => {
      try {
        // New API request to fetch categories
        const response = await axios.get(
          "https://violet-meerkat-830212.hostingersite.com/public/api/get-category"
        );
        setCategories(response.data.categories || []); // Update categories state
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later."); // Set error state
      } finally {
        setLoading(false); // Stop loading
      }
    };
    console.log(fetchCategories);
    const fetchData = async () => {
      try {
        // const [subCategoryRes, userRes] = await Promise.all([
        // //  axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/subcategories"),
        // //  axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/users"),
        // ]);

        //setSubCategories(subCategoryRes.data);
        //setUsers(userRes.data);

       // await fetchCategories();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategories();
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
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
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

      await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/auctions",
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
  // const InternationalShipping = ({ initialValue }) => {
  //   const [internationalShipping, setInternationalShipping] = useState(
  //     initialValue || "0" // Default value is "0" (No)
  //   );
  // }
    const handleChange = (e) => {
      setInternationalShipping(e.target.value);
    };
    // Validation module for the Sell component
// const validateForm = (formData, featuredImage, album) => {
//   const errors = {};

//   // Title validation
//   if (!formData.title.trim()) {
//     errors.title = "Title is required.";
//   }

//   // User ID validation
//   if (!formData.user_id) {
//     errors.user_id = "User is required.";
//   }

//   // Category validation
//   if (!formData.category_id) {
//     errors.category_id = "Category is required.";
//   }

//   // Start Date validation
//   if (!formData.start_date) {
//     errors.start_date = "Start date is required.";
//   }

//   // End Date validation
//   if (!formData.end_date) {
//     errors.end_date = "End date is required.";
//   } else if (new Date(formData.end_date) < new Date(formData.start_date)) {
//     errors.end_date = "End date cannot be earlier than start date.";
//   }

//   // Reserve Price validation
//   if (!formData.reserve_price) {
//     errors.reserve_price = "Reserve price is required.";
//   } else if (formData.reserve_price <= 0) {
//     errors.reserve_price = "Reserve price must be greater than zero.";
//   }

//   // Minimum Bid validation
//   if (!formData.minimum_bid) {
//     errors.minimum_bid = "Minimum bid is required.";
//   } else if (formData.minimum_bid <= 0) {
//     errors.minimum_bid = "Minimum bid must be greater than zero.";
//   }

//   // Featured Image validation
//   if (!featuredImage) {
//     errors.featuredImage = "Featured image is required.";
//   }

//   // Album validation
//   if (album.length === 0) {
//     errors.album = "At least one album image is required.";
//   }

//   // Description validation
//   if (!formData.description.trim()) {
//     errors.description = "Description is required.";
//   }

//   return errors;
// };


  return (
    <>
    <Header />
    <div className="container-fluid py-5 color">
    <div className="container  p-5 rounded color-white">
      <h2>Create Auction</h2>
      {/* {message && <p className="alert alert-info">{message}</p>} */}
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" 
            name="title"
             id="title" 
            className={`form-control ${error ? "is-invalid" : ""}`}
             value={formData.title}
             onChange={handleInputChange}
             required
             />
             {error && <div className="invalid-feedback">{error}</div>}
        </div>
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
          name="category"
          className={`form-control   ${error ? "is-invalid" : ""}`}
          value={selectedCategory} // Use the defined state
          onChange={handleCategoryChange}
          required
        >
          {error && <div className="invalid-feedback">{error}</div>}
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
    </div>
    <div className="col-6">
         <div className="form-group">
            <label htmlFor="start_date">Conditions</label>
            <select name="product_condition " className="form-control">
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
          <div className="row">
          <div className="col-6">
        <div className="form-group">
            <label htmlFor="product_year">Product Year</label>
            <input
             type="text"
             name="product_year"
             id="product_year"
             className="form-control"
             onChange={handleInputChange}
             value={formData.product_year}
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
            onChange={handleInputChange}
            className="form-control" 
            value={formData.product_location}
            />
        </div>
        </div>
        </div>
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
             required/>
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
            onChange={handleInputChange}
            value={formData.end_date} 
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
            onChange={handleInputChange}
            value={formData.live_auction_date} 
            />
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-6">
        
        <div className="form-group">
            <label htmlFor="live_auction_start_time">Live Auction Start Time</label>
            <input 
            type="time" 
            name="live_auction_start_time" 
            id="live_auction_start_time" 
            className="form-control" 
            onChange={handleInputChange}
            value={formData.live_auction_start_time} 
            />
        </div>
        </div>
        <div className="col-6">
        <div className="form-group">
            <label htmlFor="live_auction_end_time">Live Auction End Time</label>
            <input 
            type="time" 
            name="live_auction_end_time" 
            id="live_auction_end_time" 
            className="form-control" 
            onChange={handleInputChange}
            value={formData.live_auction_end_time} 
            />
        </div>
        </div>
        </div>

        <div className="row">
        <div className="col-6">
        <div className="form-group">
            <label htmlFor="reserve_price">Reserve Price</label>
            <input 
            type="number" 
            name="reserve_price" 
            id="reserve_price" 
            className="form-control" 
            onChange={handleInputChange}
            value={formData.reserve_price} 
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
            onChange={handleInputChange}
            value={formData.minimum_bid}  
            required
            />
        </div>
        </div>
        </div>
       
       
        <div className="row">
        <div className="col-4">
        <div className="form-group">
      <label htmlFor="is_buynow">
      Buy Now Option?
      </label>
      <select
        name="is_buynow"
        id="is_buynow"
        className="form-control"
        value={formData.is_buynow}
        onChange={handleChange}
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
            onChange={handleInputChange}
            value={formData.bid_increment}
            />
        </div>
        </div>
        <div className="col-4">
        <div className="form-group">
      <label htmlFor="international_shipping">
      International Shipping Available?
      </label>
      <select
        name="international_shipping"
        id="international_shipping"
        className="form-control"
        value={formData.international_shipping}
        onChange={handleChange}
      >
        <option value="0">No</option>
        <option value="1">Yes</option>
      </select>
    </div>
        </div>
        </div>
        <div className="row">
          <div className="col-6">
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" 
            id="description" 
            className="form-control" 
            onChange={handleInputChange}
            value={formData.description}
            rows="4" 
            required
            >
            </textarea>
        </div>
        </div>
        <div className="col-6" >
        <div classname="form-group">
            <label htmlFor="shipping_conditions">Shipping Conditions</label>
            <textarea 
            name="shipping_conditions" 
            id="shipping_conditions" 
             className="form-control"
            onChange={handleInputChange}
            value={formData.shipping_conditions}
            rows="4">
            </textarea>
        </div>
    </div>
    </div>
        
      
        <div classname="form-group">
            <label htmlFor="shipping_terms">Shipping Terms</label>
            <textarea 
            name="shipping_terms" 
            id="shipping_terms" 
            className="form-control"
            onChange={handleInputChange}
            value={formData.shipping_terms}
            rows="4">
            </textarea>
        </div>
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