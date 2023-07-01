import { useDispatch, useSelector } from "react-redux"
import { getSpots } from "../../store/spots"
import { useEffect } from "react"
import "./SpotsIndex.css"
// import SpotsItemIndex

export const SpotsIndex = () => {

    const dispatch = useDispatch()
    const spots = useSelector((state) => Object.values(state.spots.spots))

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <>
            <h1>SPOTS SHOULD APPEAR UNDER HERE</h1>
            <div>
                <div id="spots-list">
                    {spots.map((spot) => {
                        // < SPOT IMG spot={spot} key={spot.id} / >
                        return <div id="single-spot-main-container" key={spot.id}>
                            <img className="spot-preview-img" src={spot.previewImage} alt={spot.address} />
                            <div id="single-spot-all-details-container">
                                <div id="city-price-details">
                                    <p>{`${spot.city}, ${spot.state}`}</p>
                                    <p>{`$${spot.price}night`}</p>
                                </div>
                                <p>{spot.avgRating ? spot.avgRating : "New"}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}
