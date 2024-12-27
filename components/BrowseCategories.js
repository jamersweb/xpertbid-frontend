import { useState, useEffect} from "react";
import axios from "axios";
import Link from "next/link";
export default function BrowseCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Make API request to fetch categories
        const response = await axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/get-category");
       // console.log(response.data.categories);
        setCategories(response.data.categories || []); // Update categories state
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <section className="browsecategories">
      <div className="container-fluid">
        <div className="row cate-heading-parent">
          <div className="col-md-6 cate-heading">
            <h2 className="browse-heading">All Categories</h2>
          </div>
          
        </div>

        {/* Display categories */}
        <div className="row cate-cards-parent">
          {categories.slice(0, 4).map((cat, i) => (
            <div className="col-lg-3 col-md-6 cate-card-main" key={i}>
              <div className="cate-card">
                <div className="row images-portion">
                  <div className="col-6 image-1">
                    <img src={`/assets/${cat.image}`} alt={cat.name} />
                  </div>
                  {/* <div className="col-6 image-2">
                     {cat.images.slice(1).map((img, idx) => ( 
                      <img src={`/assets/${cat.image}`} alt={cat.name} />
                     ))}
                  </div> */}
                </div>
                <div className="cate-title">
                  <h2>
                  <Link href={`/category/${cat.name}`}>{cat.name}</Link>
                  </h2>
                </div>
                <div className="cate-lisitng">
                  <span>{cat.listings} Listings</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          {categories.slice(4, 8).map((cat, i) => (
            <div className="col-lg-3 col-md-6 cate-card-main" key={i}>
              <div className="cate-card">
                <div className="row images-portion">
                  <div className="col-6 image-1">
                    <img src={`/assets/${cat.image}`} alt={cat.name} />
                  </div>
                  {/* <div className="col-6 image-2">
                    {cat.images.slice(1).map((img, idx) => (
                      <img src={`/assets/${cat.image}`} alt={cat.name} />
                     ))}
                  </div> */}
                </div>
                <div className="cate-title">
                  <h2>
                  <Link href={`/category/${cat.name}`}>{cat.name}</Link>
                  </h2>
                </div>
                <div className="cate-lisitng">
                  <span>{cat.count} Listings</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}