import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";

export default function BrowseCategories() {
  const [products, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  //console.log(id);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Make API request to fetch categories
        const response = await axios.get(`https://violet-meerkat-830212.hostingersite.com/public/api/get-category-product/${id}`);
        //console.log(response.data.categories);
        setCategories(response.data.product || []); // Update categories state
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategories(id);
  }, [id]);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <section className="browsecategories">
      <div className="container-fluid">
        <div className="row cate-heading-parent">
          <div className="col-md-6 cate-heading">
            <h2 className="browse-heading">{id}</h2>
          </div>
          
        </div>

        {/* Display categories */}
        <div className="row makt-parent">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-sm-3 mkt-child" key={product.id}>
              <div className="market-card">
                <div className="mkt-img">
                  <img
                    src={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                  />
                  {/* <div className="counter">
                    <span className="hour">{product.timeRemaining.hours}h</span>
                    <span className="minutes">{product.timeRemaining.minutes}m</span>
                    <span className="seconds">{product.timeRemaining.seconds}s</span>
                  </div> */}
                </div>
                <div className="mkt-body">
                  <div className="mkt-pro-head">
                    <h3>{product.title}</h3>
                  </div>
                  <div className="mkt-detail">
                    <div className="mkt-crt-bid">
                      <span className="crnt-bid">Current Bid</span>
                      <div className="mkt-bid-price">
                        <i className="fa-solid fa-dollar-sign"></i>
                        <span className="price">{product.currentBid}</span> USD
                      </div>
                    </div>
                    <div className="mkt-bid-btn">
                      <Link href={`/product/${product.id}`}>Place Bid</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      </div>
    </section>
  );
}