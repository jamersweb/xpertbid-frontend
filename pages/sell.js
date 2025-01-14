import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    <>
    <Header />
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
      <template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
    <input type="hidden" :value="csrfToken" name="_token" autocomplete="off" />

    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" v-model="formData.title" id="title" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="user_id">User</label>
      <select v-model="formData.user_id" id="user_id" class="form-control" required>
        <option value="">Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="category_id">Category</label>
      <select v-model="formData.category_id" id="category_id" class="form-control" required>
        <option value="">Select Category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="sub_category_id">Sub Category</label>
      <select v-model="formData.sub_category_id" id="sub_category_id" class="form-control">
        <option value="">Select Sub Category</option>
        <option v-for="subCategory in subCategories" :key="subCategory.id" :value="subCategory.id">
          {{ subCategory.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="image">Feature Image</label>
      <input type="file" @change="handleFileChange('image', $event)" id="image" class="form-control" />
    </div>

    <div class="form-group">
      <label for="album">Album</label>
      <input type="file" @change="handleFileChange('album', $event)" id="album" class="form-control" multiple />
    </div>

    <div class="form-group">
      <label for="start_date">Start Date</label>
      <input type="date" v-model="formData.start_date" id="start_date" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="product_year">Product Year</label>
      <input type="text" v-model="formData.product_year" id="product_year" class="form-control" />
    </div>

    <div class="form-group">
      <label for="product_location">Product Location</label>
      <input type="text" v-model="formData.product_location" id="product_location" class="form-control" />
    </div>

    <div class="form-group">
      <label for="product_condition">Conditions</label>
      <select v-model="formData.product_condition" id="product_condition" class="form-control">
        <option value="New">New</option>
        <option value="Used">Used</option>
      </select>
    </div>

    <div class="form-group">
      <label for="end_date">End Date</label>
      <input type="date" v-model="formData.end_date" id="end_date" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="live_auction_date">Live Auction Date</label>
      <input type="date" v-model="formData.live_auction_date" id="live_auction_date" class="form-control" />
    </div>

    <div class="form-group">
      <label for="live_auction_start_time">Live Auction Start Time</label>
      <input type="time" v-model="formData.live_auction_start_time" id="live_auction_start_time" class="form-control" />
    </div>

    <div class="form-group">
      <label for="live_auction_end_time">Live Auction End Time</label>
      <input type="time" v-model="formData.live_auction_end_time" id="live_auction_end_time" class="form-control" />
    </div>

    <div class="form-group">
      <label for="reserve_price">Reserve Price</label>
      <input type="number" v-model="formData.reserve_price" id="reserve_price" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="minimum_bid">Minimum Bid</label>
      <input type="number" v-model="formData.minimum_bid" id="minimum_bid" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="is_bid_increment">Bid Increment?</label>
      <select v-model="formData.is_bid_increment" id="is_bid_increment" class="form-control">
        <option value="0">No</option>
        <option value="1">Yes</option>
      </select>
    </div>

    <div class="form-group">
      <label for="bid_increment">Bid Increment Value</label>
      <input type="number" v-model="formData.bid_increment" id="bid_increment" class="form-control" />
    </div>

    <div class="form-group">
      <label for="is_buynow">Buy Now Option?</label>
      <select v-model="formData.is_buynow" id="is_buynow" class="form-control">
        <option value="0">No</option>
        <option value="1">Yes</option>
      </select>
    </div>

    <div class="form-group">
      <label for="buy_now_price">Buy Now Price</label>
      <input type="number" v-model="formData.buy_now_price" id="buy_now_price" class="form-control" />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea v-model="formData.description" id="description" class="form-control" rows="4" required></textarea>
    </div>

    <div class="form-group">
      <label for="international_shipping">International Shipping Available?</label>
      <select v-model="formData.international_shipping" id="international_shipping" class="form-control">
        <option value="0">No</option>
        <option value="1">Yes</option>
      </select>
    </div>

    <div class="form-group">
      <label for="shipping_conditions">Shipping Conditions</label>
      <textarea v-model="formData.shipping_conditions" id="shipping_conditions" class="form-control" rows="3"></textarea>
    </div>

    <div class="form-group">
      <label for="shipping_terms">Shipping Terms</label>
      <textarea v-model="formData.shipping_terms" id="shipping_terms" class="form-control" rows="3"></textarea>
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary">Create</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    csrfToken: String,
    users: Array,
    categories: Array,
    subCategories: Array,
  },
  data() {
    return {
      formData: {
        title: '',
        user_id: '',
        category_id: '',
        sub_category_id: '',
        image: null,
        album: null,
        start_date: '',
        product_year: '',
        product_location: '',
        product_condition: 'New',
        end_date: '',
        live_auction_date: '',
        live_auction_start_time: '',
        live_auction_end_time: '',
        reserve_price: '',
        minimum_bid: '',
        is_bid_increment: 0,
        bid_increment: '',
        is_buynow: 0,
        buy_now_price: '',
        description: '',
        international_shipping: 0,
        shipping_conditions: '',
        shipping_terms: '',
      },
    };
  },
  methods: {
    handleFileChange(field, event) {
      this.formData[field] = event.target.files;
    },
    handleSubmit() {
      const formData = new FormData();
      for (const key in this.formData) {
        if (key === 'album') {
          Array.from(this.formData.album || []).forEach(file => {
            formData.append('album[]', file);
          });
        } else {
          formData.append(key, this.formData[key]);
        }
      }

      this.$emit('submit', formData);
    },
  },
};
</script>

    </div>


    
    <Footer />
    </>
  );
};

export default Sell;