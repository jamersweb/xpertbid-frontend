const ProductHeader = ({ views, link }) => (
    <section className="prodcut-detail-links">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="product-back-and-head">
              <a href="./marketplace.html">
                <i className="fa-solid fa-chevron-left"></i>
              </a>
              <h3>Product Detail</h3>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-copy-and-view">
              <span>
                <i className="fa-solid fa-eye"></i>
                {views}
              </span>
              <a href={link}>
                <i className="fa-solid fa-link"></i>Copy Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  export default ProductHeader;  