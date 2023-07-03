import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getSpotById } from "../../store/spots"
import { Reviews } from "./Reviews"
import "./SpotDetails.css"

export const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const targetSpot = useSelector((state) => state.spots.spotDetails)
    const getCurrentUser = useSelector((state) => state.session.user);
    // console.log("CURRENT USER INFO", getCurrentUser)

    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [spotId, dispatch])


    if( Object.values(targetSpot).length === 0 ) return null // if first render, return null
    const filteredSpotImages = targetSpot?.SpotImages?.filter((img) => img.preview === false) || [] // give all images beside the preview image

    return (
        <div id="main-spotDetails-container">
            <div id="spotDetails-headerInfo">
                <h2>{targetSpot.name}</h2>
                <p>{`${targetSpot.city}, ${targetSpot.state}, ${targetSpot.country}`}</p>
            </div>
            <div id="spotImages-container">
                {filteredSpotImages.map((img, index) => (
                    index === 0 ? ( <div className="main-img" key={img.id}> <img src="https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg" alt={img.id} /> </div> ) : null
                ))}
                <div id="normal-spotImgs-container">
                    {filteredSpotImages.map((img, index) => (
                        index !== 0 ? ( <div key={img.id} className="normal-spotImgs"> <img src="https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=1xw:0.84415xh;center,top" alt={img.id} /> </div> ) : null
                    ))}
                </div>
            </div>
            <div id="description-reserve-container">
                <div className="description-container">
                    <h3>Hosted By {targetSpot.Owner.firstName} {targetSpot.Owner.lastName}</h3>
                    <p>{targetSpot.description}</p>
                </div>
                <div className="reserve-container">
                    <div id="reserve-info-box">
                        <div>${targetSpot.price}night</div>
                        <div>★{targetSpot.avgStarRating} · {targetSpot.numReviews} reviews</div>
                    </div>
                    <button className="reserve-button">Reserve</button>
                </div>
            </div>
            <div id="review-container">
                <div>★{targetSpot.avgStarRating} · {targetSpot.numReviews} reviews</div>
                {getCurrentUser && <button className="create-review">Post Your Review</button>}
                {/* TODO --> add in functionality to determine if user is owner of spot (CANT POST REVIEW) OR user hasnt yet to post a review */}
                <div className="review-comment-section-container">
                    <Reviews spotId={spotId}/>
                </div>
            </div>
        </div>
    )
}
