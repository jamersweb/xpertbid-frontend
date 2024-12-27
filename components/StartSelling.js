// components/StartSelling.js

export default function StartSelling() {
    return (
      <section className="start-selling">
        <div className="container-fluid">
          <div className="start-selling-parent">
            <div className="row start-slelling-child">
              <div className="col-md-8 start-slelling-left">
                <h2>Stat selling today!</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="selling-btns">
                  <a href="/marketplace" className="exp-more">Explore More</a>
                  <a href="#" className="start-sell-now">Sell Now</a>
                </div>
              </div>
              <div className="col-md-4 start-slelling-right">
                <img src="/assets/images/hero-prodcut1.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  