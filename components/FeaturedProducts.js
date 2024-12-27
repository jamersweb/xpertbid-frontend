// components/FeaturedProducts.js
import { useState, useEffect } from "react";
import Link from "next/link";
import CountdownTimer from "./countdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Use this for Swiper >= 9.x

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
      
  
      const fetchProducts = async () => {
        const response = await fetch("https://violet-meerkat-830212.hostingersite.com/public/api/get-featured");
        const data = await response.json();
        //console.log(product);
        setProducts(data.product || []);
       // setFilteredProducts(data.product || []); // Default to all products
      };
  
    
      fetchProducts();
    }, []);
    //console.log(products);
    return (
      <section className="featured-product">
        <div className="container-fluid">
          <div className="featured-heading"><h2>Featured Listing</h2></div>
          <div className="swiper-featured-product">
              
            
              {/* Repeat slides as needed */}
                {products.length > 0 ? (
                  <Swiper
                    modules={[Navigation]} // Ensure proper module usage
                    navigation
                    slidesPerView={3}
                    spaceBetween={30}
                    loop
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                      1367: { slidesPerView: 3 },
                    }}
                  >
                  {products.map((product, index) => (
                    <SwiperSlide key={index}>
                      <div className="pro-image">
                  <img
                    src={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                  />
                    <CountdownTimer startDate={product.start_date} endDate={product.end_date} />
                  </div>
                  <div className="pro-title">
                    <h2>{product.title}</h2>
                  </div>
                  <div className="pro-meta">
                    <div className="pro-price">
                      <span>Current Bid</span>
                      <p className="price"><i className="fa-solid fa-dollar-sign"></i>{product.bids_max_bid_amount} USD</p>
                    </div>
                    <div className="pro-buy-btn">
                      <div className="pro-bid-btn">
                      <Link href={`/product/${product.id}`}>Place Bid</Link>
                      </div>
                    </div>
                  </div>
                    </SwiperSlide>
                
                  
                
                  ))}
                </Swiper>
            ) : (
              <p>No products found.</p>
            )}
          </div>
            <div className="swiper-arrows">
              <div className="swiper-button-prev"><i className="fa-solid fa-arrow-left"></i></div>
              <div className="swiper-button-next"><i className="fa-solid fa-arrow-right"></i></div>
            </div>
          </div>
      </section>
    );
  }
  