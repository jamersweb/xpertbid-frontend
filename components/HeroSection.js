// components/HeroSection.js
import Link from "next/link";
export default function HeroSection() {
    return (
      <section className="hero-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 left-section">
              <h2 className="hero-sec">#1 Platform to Buy & Sell</h2>
              <h1 className="hero-sec">Electronics & Gadgets</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="hero-sec-btn">
                <Link className="explore-more" href={"/marketplace"}>
                  Explore More
                </Link>
                
                <a href="#" className="sellnow">Sell Now</a>
              </div>
              <div className="happy-clients">
                <div className="client-ratings">
                  <h3>430K+</h3><span>Listings</span>
                </div>
                <div className="client-ratings">
                  <h3>159K+</h3><span>Creators</span>
                </div>
                <div className="client-ratings">
                  <h3>87K+</h3><span>Collections</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 right-section">
              {/* Swiper for product images */}
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide"><img src="/assets/images/hero-prodcut1.jpg" alt="" /></div>
                  <div className="swiper-slide"><img src="/assets/images/hero-prodcut1.jpg" alt="" /></div>
                  <div className="swiper-slide"><img src="/assets/images/hero-prodcut1.jpg" alt="" /></div>
                </div>
                <div className="swiper-arrows">
                <div className="swiper-button-prev swi-left"><i className="fa-solid fa-arrow-left"></i></div>
                <div className="swiper-button-next swi-right"><i className="fa-solid fa-arrow-right"></i></div>
                </div>
              </div>
              <div className="hero-img-1">
                <img src="/assets/images/hero-sec.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  