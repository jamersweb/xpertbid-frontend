import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductHeader from "../../components/ProductHeader";
import ProductImages from "../../components/ProductImages";
import ProductDetails from "../../components/ProductDetails";
import BidHistory from "../../components/BidHistory";
import OtherItems from "../../components/OtherItems";
import { useState, useEffect } from "react";

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null); // Product data state
  const [bids, setBids] = useState([]);         // Bid history state
  const [relatedItems, setRelatedItems] = useState([]); // Related items state
  const [loading, setLoading] = useState(true); // Loading state for API

  // Fetch product details dynamically using the productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        // Fetch product details ${productId}
        const productResponse = await fetch(
          `http://127.0.0.1:8000/api/product/1`
        );
        
        const productData = await productResponse.json();
        console.log(productData.product.bids);
        setProduct(productData.product);
        setBids(productData.product.bids);
        setRelatedItems(productData.product.relatedItems);

      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Show a loader while data is being fetched
  if (loading) {
    return <p>Loading product details...</p>;
  }

  // Handle the case where the product data is not found
  if (!product) {
    return <p>Product not found.</p>;
  }

  // Render the Product Page
  return (
    <>
      <Header />
      <ProductHeader views={product.views || 0} link={`http://localhost:3000/product/1`} />
      <ProductImages mainImage={product.mainImage} albumImages={product.albumImages} />

      <section className="container-fluid">
        <div className="row">
          <ProductDetails product={product} />
          <div className="col-lg-4 col-md-6">
            <BidHistory bids={bids} />
          </div>
        </div>
      </section>

      <OtherItems items={relatedItems} />
      <Footer />
    </>
  );
};

export default ProductPage;
