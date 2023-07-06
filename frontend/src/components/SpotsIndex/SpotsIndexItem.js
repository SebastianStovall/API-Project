import { Link } from "react-router-dom"
import "./SpotsIndexItem.css"
import { displayAsFloat } from "../../store/spots"

export const SpotsIndexItem = ({spot}) => {

    return (
        <div id="single-spot-main-container">
            <Link to={`/spots/${spot.id}`} className="spot-link" title={spot.name}>
            <img className="spot-preview-img" src={spot.previewImage} alt={spot.address}/>
            <div id="single-spot-all-details-container">
                <div id="city-price-details">
                    <p>{`${spot.city}, ${spot.state}`}</p>
                    <p>{`$${spot.price}night`}</p>
                </div>
                <p>{spot.avgRating ? `★${displayAsFloat(spot.avgRating)}` : "★New"}</p>
                {/* if theres a truthy value for avgRating in database, display it as a floating decimal if whole number, otherwise, if no value exists, render New */}
            </div>
            </Link>
        </div>
    )
}
