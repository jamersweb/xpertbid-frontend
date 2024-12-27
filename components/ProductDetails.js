import BidPage from "../components/bid";
import FavoriteIcon from "../components/toggleFavorite"
const ProductDetails = ({product}) => {
    //console.log(product[0]);
    return (
      <div className="product-details-brief-parent">
        <h2 className="product-heading">{product[0].title}</h2>
        <div className="owned-by-and-favoruite">
          <div className="owned">
            <img
              className="customer-profile"
              src={`http://127.0.0.1:8000${product[1].profile}`}
              alt={product[1].name}
            />
            <div className="customer-name">
              <span className="owner">Owned By</span>
              <p className="name">{product[1].name}</p>
            </div>
          </div>
          <div className="favourite">
          <FavoriteIcon auctionId={product[0].id} isFavorite={product[0].isFavorite} />
            
          </div>
        </div>
        
        <BidPage product={product[0]}/>
        
        
      </div>
    
  );
}  
export default ProductDetails;