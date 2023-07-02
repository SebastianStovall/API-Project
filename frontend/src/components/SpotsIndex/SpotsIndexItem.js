import { Link } from "react-router-dom"
import "./SpotsIndexItem.css"

export const SpotsIndexItem = ({spot}) => {

    return (
        <div id="single-spot-main-container">
            <Link to={`/spots/${spot.id}`} className="spot-link" title={spot.name}>
            {/* <img className="spot-preview-img" src={spot.previewImage} alt={spot.address} /> */}
            <img className="spot-preview-img" src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"/>
            <div id="single-spot-all-details-container">
                <div id="city-price-details">
                    <p>{`${spot.city}, ${spot.state}`}</p>
                    <p>{`$${spot.price}night`}</p>
                </div>
                <p>{spot.avgRating ? spot.avgRating : "New"}</p>
            </div>
            </Link>
        </div>
    )
}
