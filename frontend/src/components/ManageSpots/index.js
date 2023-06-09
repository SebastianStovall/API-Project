import { useHistory, Link } from "react-router-dom"
import { getAllUserSpots } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { DeleteSpotModal } from "../DeleteSpotModal"
import OpenModalButton from "../OpenModalButton"
import "./ManageSpots.css"


export const ManageSpots = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const allUserSpots = useSelector((state) => Object.values(state.spots.spots))

    useEffect(() => {
        dispatch(getAllUserSpots())
    }, [dispatch])

    if (allUserSpots.length === 0) return <h1><Link exact to="/spots/new">Create a new Spot</Link></h1>

    return (
        <div id="manage-spots-main-container">
            <h2>Manage Your Spots</h2>
            <button onClick={() => history.push("/spots/new")} className="create-new-spot-button-user-page">Create a New Spot</button>

            <div>
                <div id="spots-list">
                    {allUserSpots
                    .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((spot) => {
                    return <div id="single-spot-main-container" key={spot.id}>
                    <Link to={`/spots/${spot.id}`} className="spot-link" title={spot.name}>
                    {/* <img className="spot-preview-img" src={spot.previewImage} alt={spot.address} /> */}
                    <img className="spot-preview-img" src={spot.previewImage} alt={spot.address}/>
                    <div id="single-spot-all-details-container">
                        <div id="city-price-details">
                            <p>{`${spot.city}, ${spot.state}`}</p>
                            <p>{`$${spot.price}night`}</p>
                        </div>
                        <p>{spot.avgRating ? `★${Number(spot.avgRating).toFixed(1)}` : "New"}</p>
                        {/* if theres a truthy value for avgRating in database, display it as a floating decimal if whole number, otherwise, if no value exists, render New */}
                    </div>
                    </Link>
                    <div className="update-delete-buttons-gap">
                        <button className="user-spots-update-button" onClick={() => history.push(`/spots/${spot.id}/edit`)}>Update</button>
                        {/* <button className="user-spots-delete-button">Delete</button> */}
                        <span className="delete-button-modal-display">
                        <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteSpotModal spotId={spot.id} />} />
                        </span>
                    </div>
                </div>
                    })}
                </div>
            </div>


        </div>
    )
}
