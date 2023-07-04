import { useHistory, Link } from "react-router-dom"
import { getAllUserSpots } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { displayAsFloat } from "../../store/spots"
import "./ManageSpots.css"


export const ManageSpots = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const allUserSpots = useSelector((state) => Object.values(state.spots.spots))

    useEffect(() => {
        dispatch(getAllUserSpots())
    }, [dispatch])

    return (
        <div id="manage-spots-main-container">
            <h2>Manage Your Spots</h2>
            <button onClick={() => history.push("/spots/new")} className="create-new-spot-button-user-page">Create a New Spot</button>

            <div>
                <div id="spots-list">
                    {allUserSpots.map((spot) => {
                    return <div id="single-spot-main-container" key={spot.id}>
                    <Link to={`/spots/${spot.id}`} className="spot-link" title={spot.name}>
                    {/* <img className="spot-preview-img" src={spot.previewImage} alt={spot.address} /> */}
                    <img className="spot-preview-img" src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" alt={spot.address}/>
                    <div id="single-spot-all-details-container">
                        <div id="city-price-details">
                            <p>{`${spot.city}, ${spot.state}`}</p>
                            <p>{`$${spot.price}night`}</p>
                        </div>
                        <p>{spot.avgRating ? `★${displayAsFloat(spot.avgRating)}` : "New"}</p>
                        {/* if theres a truthy value for avgRating in database, display it as a floating decimal if whole number, otherwise, if no value exists, render New */}
                    </div>
                    <div>
                        <button className="user-spots-update-button">Update</button>
                        <button className="user-spots-delete-button">Delete</button>
                    </div>
                    </Link>
                </div>
                    })}
                </div>
            </div>


        </div>
    )
}
