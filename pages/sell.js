import React, { useState, useEffect,useRef  } from "react";
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
    description: "",
    minimum_bid: "",
    reserve_price: "",
    start_date: "",
    end_date: "",
  });
  const [featuredImage, setFeaturedImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  // const [message, setMessage] = useState("");

 useEffect(() => {
   const fetchData = async () => {
     try {
       
       const countriesRes = await axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/get-countries");
         
       
       setCountries(countriesRes.data.country);

     } catch (error) {
       console.error("Error fetching identity data:", error);
     }
   };

   fetchData();
 }, []);
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
      setError(error);
      return;
    }
  
    setFeaturedImage(file);
    setError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submissionData = new FormData();
      Object.keys(formData).forEach((key) => submissionData.append(key, formData[key]));
      
      // Append image if selected
      if (featuredImage) {
        submissionData.append("image", featuredImage);
      }
  
      await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/auctions_store",
        submissionData,
        { headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.user.token}` 
        }}
      );
  
      setMessage("Auction created successfully!");
      setFormData({
        title: "",
        user_id: session.user.id, 
        category_id: "",
        description: "",
        minimum_bid: "",
        reserve_price: "",
        start_date: "",
        end_date: "",
      });
      setFeaturedImage(null); // Reset image state
    } catch (error) {
      console.log("Failed to create auction:", error.response?.data?.message);
      setMessage(error.response?.data?.message || "Failed to create auction.");
    }
  };
  

  return (
    <>
      <Header />
      <div className="container-fluid p-0 p-xl-5">
      <form onSubmit={handleSubmit} className="px-4 p-sm-5" >

      <div className="sell-head  p-4  ">
          <h1 className="up-listing pt-3 mb-3 mb-lg-5 ps-0 ps-md-5 ">Upload your listings</h1>
          <div className="pe-5 pt-3">
            <button type="submit" className="btn btn-green mt-3 mx-2">
            <i class="fa-solid fa-bolt mx-2 fs-6"></i> Promoted  </button>
            <button type="submit" className="btn btn-black mt-3 mx-2 d-none d-lg-inline">Publish                </button>
          </div>
      </div>
              {message && <p className="alert alert-info">{message}</p>}
              {error && <p className="alert alert-danger">{error}</p>}

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
                  <select id="category" name="category_id" className="form-control" value={formData.category_id} onChange={handleInputChange} required>
                    <option value="">Select your category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
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
                <select name="country_id" className="form-control" value={formData.country_id} onChange={handleInputChange}>
                  <option value="">Select Country</option>
                  {countries?.map((country) => (
                    <option key={country.id} value={country.id}>{country.name}</option>
                  ))}
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
                <div className="col-lg-6">
                            <div className="album shadow-lg p-3 text-center">
                              <input
                                type="file"
                                id="image"
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
                              <button type="button" className="btn btn-secondary mt-2" onClick={() => fileInputRef.current.click()}>
                                Upload
                              </button>
                            </div>
                </div>
                   </form>         
      </div>
      <Footer />
    </>
  );
};

export default Sell;