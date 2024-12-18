const ProductImages = ({ mainImage, albumImages }) => (
    <section className="product-image-and-brief">
      <div className="container-fluid">
        <div className="products-brief-parent">
          <div className="row">
            {/* Main Product Image */}
            <div className="col-md-5">
              <div className="product-images-parent">
                <div className="product-main-image">
                  <img src={mainImage} alt="Main Product" />
                </div>
  
                {/* Image Album (Slider) */}
                <div className="product-images-album">
                  <div className="swiper-product-imageAlbum">
                    <div className="swiper-wrapper">
                      {/* {albumImages.map((image, index) => (
                        <div className="swiper-slide" key={index}>
                          <div className="pro-image">
                            <img src={image} alt={`Album Slide ${index}`} />
                          </div>
                        </div>
                      ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
export default ProductImages;