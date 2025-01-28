// pages/index.js
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner"; // Import the loader
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrowseCategories from "@/components/BrowseCategories";
import TopBid from "@/components/TopBid";
import MarketplaceSection from "@/components/MarketplaceSection";
import StartSelling from "@/components/StartSelling";
import StepModals from "@/components/StepModals";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://violet-meerkat-830212.hostingersite.com/public/api/get-products"
        );
        const data = await response.json();
        setProducts(data.product || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        // Show loader while loading
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
        <>
          <Header />
          <HeroSection />
          <FeaturedProducts />
          <BrowseCategories />
          <TopBid />
          <StepModals />
          <MarketplaceSection products={products} />
          <StartSelling />
          <Footer />
        </>
      )}

      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </>
  );
}
