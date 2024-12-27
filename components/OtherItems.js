import CountdownTimer from "./countdown";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Use this for Swiper >= 9.x
const OtherItems = ({ items }) => (
    <section className="featured-product">
      <div className="container-fluid">
        <div className="product-detail">
          <h2>Other items of interest</h2>
        </div>
        <div className="swiper-featured-product">
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
                    {items[0].map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="pro-image">
                          <img src={`https://violet-meerkat-830212.hostingersite.com/public/${item.image}`} alt={item.title} />
                          <CountdownTimer startDate={item.start_date} endDate={item.end_date} />
                        </div>
                        <div className="pro-title">
                          <h2>{item.title}</h2>
                        </div>
                        <div className="pro-meta">
                          <div className="pro-price">
                            <span>Current Bid</span>
                            <p className="price">
                              <i className="fa-solid fa-dollar-sign"></i>
                              {item.currentBid} USD
                            </p>
                          </div>
                          <div className="pro-buy-btn">
                            <div className="pro-bid-btn">
                            <Link href={`/product/${item.id}`}>Place Bid</Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
          </div>
        </div>
      
    </section>
  );
  export default OtherItems;