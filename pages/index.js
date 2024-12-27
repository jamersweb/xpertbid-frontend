// pages/index.js
import { useState, useEffect } from "react";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import BrowseCategories from '@/components/BrowseCategories'
import TopBid from '@/components/TopBid'
import MarketplaceSection from '@/components/MarketplaceSection'
import StartSelling from '@/components/StartSelling'


export default function Home({ countries }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
  
      const fetchProducts = async () => {
        const response = await fetch("https://violet-meerkat-830212.hostingersite.com/public/api/get-products");
        const data = await response.json();
        //console.log(data);
        setProducts(data.product || []);
        
      };
  
      
      fetchProducts();
    }, []);
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <BrowseCategories />
      <TopBid />
      <MarketplaceSection  products={products} />
      <StartSelling />
      <Footer />
    </>
  )
}
