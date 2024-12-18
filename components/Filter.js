import { useState } from "react";

export default function Filter({ categories, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterChange(category); // Notify parent of filter change
  };

  return (
    <div className="filter-container">
      <h3>Filter Products</h3>
      <select value={selectedCategory} onChange={handleFilterChange}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
