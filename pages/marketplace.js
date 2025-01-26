import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      try {
        const response = await fetch(
          "https://violet-meerkat-830212.hostingersite.com/public/api/get-category"
        );
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://violet-meerkat-830212.hostingersite.com/public/api/get-products"
        );
        const data = await response.json();
        setProducts(data.product || []);
        setFilteredProducts(data.product || []); // Default to all products
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Handle filtering
  const handleFilterChange = (filters) => {
    const { category, status, price } = filters;
  
    const filtered = products.filter((product) => {
      const matchesCategory = category === "" || parseInt(product.category_id, 10) === parseInt(category, 10);
      const matchesStatus = status.length === 0 || status.includes(product.status || "");
      const matchesPrice = parseFloat(product.reserve_price) >= price[0] && parseFloat(product.reserve_price) <= price[1];
  
      console.log({
        product,
        matchesCategory,
        matchesStatus,
        matchesPrice,
      });
  
      return matchesCategory && matchesStatus && matchesPrice;
    });
  
    console.log("Filtered products:", filtered);
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
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
      <section className="mkt-hero-section">
            <div className="container-fluid">
                <div className="mkt-hero-parent">
                    <h1 className="mkt-sec">Search Online Businesses for
                        Sale</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.</p>
                </div>
            </div>
        </section>
      <section className="marketplace-product">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 mkt-left">
              <Filter categories={categories} onFilterChange={handleFilterChange} />
            </div>

            <div className="col-lg-9 mkt-right">
              <div className="mkt-page-plc-hdig">
                <h2>All Items</h2>
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
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
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
              ) : filteredProducts.length > 0 ? (
                <DisplayProducts products={currentProducts} />
              ) : (
                <p>No products match your filters. Please adjust the criteria.</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
