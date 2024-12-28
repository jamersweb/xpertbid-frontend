import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from '@/components/Footer';
import { Oval } from "react-loader-spinner"; // Import the loader
import Filter from "../components/Filter";
import DisplayProducts from "../components/DisplayProducts";

export default function Marketplace() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6; // Number of products per page

  // Fetch categories and products on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://violet-meerkat-830212.hostingersite.com/public/api/get-category");
      const data = await response.json();
      setCategories(data.categories || []);
    };

    const fetchProducts = async () => {
      const response = await fetch("https://violet-meerkat-830212.hostingersite.com/public/api/get-products");
      const data = await response.json();
      //console.log(data);
      setProducts(data.product || []);
      setLoading(false); // Set loading to false after fetching
      setFilteredProducts(data.product || []); // Default to all products
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Handle filtering
  const handleFilterChange = (categoryId) => {
    if (categoryId === "") {
      setFilteredProducts(products); // Show all products
    } else {
      setFilteredProducts(
        products.filter((product) => product.category_id === parseInt(categoryId))
      );
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current page's products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
      <Header />
      <section className="marketplace-product">
        <div className="container-fluid">
          <div className="row">
            {/* Left Column: Filter */}
            <div className="col-lg-3 mkt-left">
              <div className="filter-parent">
                <button className="filter">
                  Filter Bid <i className="fa-solid fa-filter"></i>
                </button>
              </div>
              <Filter categories={categories} onFilterChange={handleFilterChange} />
            </div>

            {/* Right Column: Products and Pagination */}
            <div className="col-lg-9 mkt-right">
              <div className="mkt-page-plc-hdig">
                <h2>All Items</h2>

                {/* Pagination */}
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                        key={i + 1}
                      >
                        <button className="page-link" onClick={() => paginate(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        aria-label="Next"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </nav>
                </div>
                {/* Display Products */}
                {loading ? (
                  <div className="loader-container">
                  <Oval 
                    height={80}
                    width={80}
                    color="#3498db"
                    secondaryColor="#f3f3f3"
                    ariaLabel="loading-indicator"
                  />
                </div>
              ) : (
                <DisplayProducts products={currentProducts} />

              )}

              <style jsx>{`
                .loader-container {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}