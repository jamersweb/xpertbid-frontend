import { useState } from "react";

export default function Filter({ categories, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300000]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    updateFilters({ category, status: selectedStatus, price: priceRange });
  };

  const handleStatusChange = (e) => {
    const { value, checked } = e.target;
    const updatedStatus = checked
      ? [...selectedStatus, value]
      : selectedStatus.filter((status) => status !== value);

    setSelectedStatus(updatedStatus);
    updateFilters({ category: selectedCategory, status: updatedStatus, price: priceRange });
  };

  const handlePriceChange = (e) => {
    const maxPrice = parseInt(e.target.value, 10);
    setPriceRange([0, maxPrice]);
    updateFilters({ category: selectedCategory, status: selectedStatus, price: [0, maxPrice] });
  };

  const updateFilters = (filters) => {
    onFilterChange(filters);
  };

  return (
    <>
    <div class="mkt-left-parent">
      <div className="filter-parent">
        <button className="filter">Filter Bid<i className="fa-solid fa-filter"></i></button>
      </div>
      <div className="category-filter">
        <div class="mkt-cate-heading">
                                    <h2>Category</h2>
                                </div>
        <select value={selectedCategory} onChange={handleCategoryChange} className="form-select">
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        </div>
        <div className="status-filter">
          <div class="mkt-cate-heading">
                                      <h2>Status</h2>
                                  </div>
          <ul class="category-list">
            {["liveAuctions", "endingSoon", "recentListing"].map((status) => (
              <li key={status}>
                <label>
                  <input
                    type="checkbox"
                    value={status}
                    id="liveAuctions"
                    checked={selectedStatus.includes(status)}
                    onChange={handleStatusChange}
                  />
                  {status.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div class="price-filter">
          <div class="price-heading">
            <h2>Price</h2>
          </div>
          
        
          <input
            type="range"
            min="0"
            max="300000"
            step="100"
            value={priceRange[1]}
            onChange={handlePriceChange}
          />
          <div>
            <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
          </div>
          </div>
      </div>
    
    </>
  );
}
