import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductHeader from "../../components/ProductHeader";
import ProductImages from "../../components/ProductImages";
import ProductDetails from "../../components/ProductDetails";
import BidHistory from "../../components/BidHistory";
import OtherItems from "../../components/OtherItems";

const ProductPage = () => {
  const router = useRouter();
  const productId = router.query.id; // Get the productId from the URL

  const [product, setProduct] = useState(null); // Product data state
  const [bids, setBids] = useState([]);         // Bid history state
  const [owner, setOwner] = useState([]);       // Product owner
  const [relatedItems, setRelatedItems] = useState([]); // Related items
  const [loading, setLoading] = useState(true); // Loading state for API

  useEffect(() => {
    if (!productId) return; // Wait until the router query is available

    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        // Fetch product details
        const productResponse = await axios.get(
          `http://127.0.0.1:8000/api/product/${productId}`
        );
        const productData = productResponse.data;
        setProduct(productData.product.product[0]);
        setBids(productData.product.bids);
        setOwner(productData.product.owner[0]);
        setRelatedItems(productData.product.relatedItems);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }
  //console.log('rage',owner);
  return (
    <>
      <Header />
      <ProductHeader views={product.views || 0} link={`http://localhost:3000/product/${product.id}`} productId={product.id}/>
      <section className="product-image-and-brief">
        <div className="container-fluid">
          <div className="products-brief-parent">
            <div className="row">
              <div className="col-md-6">
                <ProductImages mainImage={product.image} albumImages={product.album} />
              </div>
              <div className="col-md-6">
                <ProductDetails product={[product,owner]} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-detailed-info">
        <div className="container-fluid">
            <div className="product-detailed-info-parent">
                <div className="row justify-content-between">
                <div className="col-lg-6 col-md-6">
                  <h2 className="description">Description</h2>
                  <p className="description-paragraph">{product.description}</p>

                  <div className="years-and-location">
                    <h3 className="details">Details</h3>
                    <div className="row detail-1">
                      <div className="col-sm-6">
                        <div className="condition-time">
                          <span className="condition">Condition</span>
                          <span className="time">{product.product_condition}</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="years-no">
                          <span className="year">Year</span>
                          <span className="no">{product.product_year}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="details">Location</h3>
                    <div className="col-12">
                      <div className="location">
                        <i className="fa-solid fa-location-dot"></i>
                        {product.product_location}
                      </div>
                    </div>
                  </div>
                </div>
            
            <div className="col-lg-4 col-md-6">
              <BidHistory bids={bids} />
            </div>
            </div>
          </div>
      </div>
          
      </section>
      <OtherItems items={relatedItems} />
      <Footer />
    </>
  );
};

export default ProductPage;
