// components/Footer.js
export default function Footer() {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-lg-5 col-md-4 col-sm-6 footer-child1">
              <div className="logo">
                <a href="/expertbid.html">
                  <img src="/assets/images/footer-logo.png" alt="" />
                </a>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="social-icons">
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                <a href="#"><i className="fa-brands fa-facebook"></i></a>
                <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 footer-child2">
              <div className="footer-menu">
                <p className="foot-menu-heading">Categories</p>
                <ul>
                  <li><a href="#">Consumer Goods</a></li>
                  <li><a href="#">Electronics & Gadget</a></li>
                  <li><a href="#">Fashion & Apparel</a></li>
                  <li><a href="#">Home & Kitchen Appliances</a></li>
                  <li><a href="#">Industrial & Manufacturing</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 footer-child3">
              <div className="footer-menu">
                <p className="foot-menu-heading">Categories</p>
                <ul>
                  <li><a href="#">Consumer Goods</a></li>
                  <li><a href="#">Electronics & Gadget</a></li>
                  <li><a href="#">Fashion & Apparel</a></li>
                  <li><a href="#">Home & Kitchen Appliances</a></li>
                  <li><a href="#">Industrial & Manufacturing</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  