import { useState } from "react";

export default function Filter({ categories, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Handle category filter change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    updateFilters({ category, status: selectedStatus, price: priceRange });
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    const { value, checked } = e.target;
    const updatedStatus = checked
      ? [...selectedStatus, value]
      : selectedStatus.filter((status) => status !== value);

    setSelectedStatus(updatedStatus);
    updateFilters({ category: selectedCategory, status: updatedStatus, price: priceRange });
  };

  // Handle price range filter change
  const handlePriceChange = (e) => {
    const maxPrice = parseInt(e.target.value, 10);
    setPriceRange([0, maxPrice]);
    updateFilters({ category: selectedCategory, status: selectedStatus, price: [0, maxPrice] });
  };

  // Update filters and notify parent
  const updateFilters = (filters) => {
    onFilterChange(filters);
  };

  return (
    <div className="col-lg-12 mkt-left">
      <div className="filter-parent">
        <button className="filter">Filter Bid<i className="fa-solid fa-filter"></i></button>
      </div>
      <div className="mkt-left-parent">
        {/* Category Filter */}
        <div className="category-filter">
          <div className="mkt-cate-heading">
            <h2>Category</h2>
          </div>
          <form>
            <select className=" py-2 px-2 " value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </form>
        </div>

        {/* Status Filter */}
        <div className="status-filter">
          <div className="mkt-cate-heading">
            <h2>Status</h2>
          </div>
          <form>
            <ul className="category-list">
              {["liveAuctions", "endingSoon", "recentListing"].map((status) => (
                <li key={status}>
                  <label>
                    <input
                      type="checkbox"
                      id={status}
                      value={status}
                      checked={selectedStatus.includes(status)}
                      onChange={handleStatusChange}
                    />
                    {status
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                </li>
              ))}
            </ul>
          </form>
        </div>

        {/* Price Filter */}
        <div className="price-filter">
          <form>
            <div className="price-heading">
              <h2>Price</h2>
              <select className="p-2">
                <option value="USD" selected>
                  USD
                </option>
                <option value="EUR">EUR</option>
                <option value="RIYAL">RIYAL</option>
                <option value="BHD">BHD</option>
              </select>
            </div>
            <div className="filter-container">
              <input
                type="range"
                id="priceRange"
                min="0"
                max="300000"
                step="1"
                value={priceRange[1]}
                onChange={handlePriceChange}
              />
              <div className="price-range">
                <span id="minPrice">{priceRange[0]}</span>
                <span id="maxPrice">{priceRange[1]}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
