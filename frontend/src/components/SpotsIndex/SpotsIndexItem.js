import { Link } from "react-router-dom"
import "./SpotsIndexItem.css"

export const SpotsIndexitem = ({spot}) => {

    return (
        <Link to={`/spots/${spot.id}`} className="spot-link">
        <div id="single-spot-main-container">
            <img className="spot-preview-img" src={spot.previewImage} alt={spot.address} />
            <div id="single-spot-all-details-container">
                <div id="city-price-details">
                    <p>{`${spot.city}, ${spot.state}`}</p>
                    <p>{`$${spot.price}night`}</p>
                </div>
                <p>{spot.avgRating ? spot.avgRating : "New"}</p>
            </div>
        </div>
        </Link>
    )
}
