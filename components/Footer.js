import Link from "next/link";
//import { encodeURIComponent } from 'next/dist/shared/lib/router/utils/encode-uri';

// components/Footer.js
export default function Footer() {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-lg-5 col-md-4 col-sm-6 footer-child1">
              <div className="logo">
                <Link href="/">
                  <img src="/assets/images/footer-logo.png" alt="" />
                </Link>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="social-icons">
                <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
                <Link href="#"><i className="fa-brands fa-linkedin"></i></Link>
                <Link href="#"><i className="fa-brands fa-facebook"></i></Link>
                <Link href="#"><i className="fa-brands fa-x-twitter"></i></Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 footer-child2">
              <div className="footer-menu">
                <p className="foot-menu-heading">Categories</p>
                <ul>
                  <li><Link href={`/category/${encodeURIComponent("Art & Digital Paintings")}`}>Art & Digital Paintings</Link></li>
                  <li><Link href={`/category/${encodeURIComponent("Electronics")}`}>Electronics</Link></li>
                  <li><Link href={`/category/${encodeURIComponent("Automobiles")}`}>Automobiles</Link></li>
                  <li><Link href={`/category/${encodeURIComponent("Jewelry & Watches")}`}>Jewelry & Watches</Link></li>
                  <li><Link href={`/category/${encodeURIComponent("Gadgets")}`}>Gadgets</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 footer-child3">
              <div className="footer-menu">
                <p className="foot-menu-heading">Categories</p>
                <ul>
                  <li><Link href={`/category/${encodeURIComponent("Furniture & Home Decor")}`}>Furniture & Home Decor</Link></li>
                  <li><Link href={`/category/${encodeURIComponent("Sports")}`}>Sports</Link></li>
                  <li><Link href={`/category/${encodeURIComponent("Fashion & Accessories")}`}>Fashion & Accessories</Link></li>
                  <li><Link href={`/category/${encodeURIComponent("Industrial Equipment")}`}>Industrial Equipment</Link></li>
                  <li><Link href={`/category/${encodeURIComponent("Collectibles & Hobbies")}`}>Collectibles & Hobbies</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
    );
    
  }
  