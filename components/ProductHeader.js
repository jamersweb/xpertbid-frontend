import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
const ProductHeader = ({ views, link, productId }) => {
  // Increment views on component mount
  useEffect(() => {
    const incrementViews = async () => {
      try {
        await axios.get(`https://violet-meerkat-830212.hostingersite.com/public/api/product/${productId}/increment-views`);
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    };
    console.log(productId);
    if (productId) {
      incrementViews();
    }
  }, [productId]);

  // Copy Link Functionality
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy link:", err);
    });
  };

  return (
    <section className="prodcut-detail-links">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="product-back-and-head">
              <Link href="/marketplace">
                <i className="fa-solid fa-chevron-left"></i>
              </Link>
              <h3></h3>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-copy-and-view">
              <span>
                <i className="fa-solid fa-eye"></i>
                {views}
              </span>
              
              <button onClick={handleCopyLink} className="copy-link-button">
                <i className="fa-solid fa-link"></i> Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductHeader;  