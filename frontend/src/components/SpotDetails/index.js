import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getSpotById } from "../../store/spots"
import { Reviews } from "./Reviews"
import { displayAsFloat } from "../../store/spots"
import { getUserReviews } from "../../store/reviews"
import OpenModalButton from "../OpenModalButton"
import { ReviewModal } from "../ReviewModal"
import "./SpotDetails.css"

export const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const history = useHistory()
    const targetSpot = useSelector((state) => state.spots.spotDetails)
    const getCurrentUser = useSelector((state) => state.session.user);
    const userReviews = useSelector((state) => Object.values(state.reviews.userReviews))

    const doesUserHaveComment = userReviews.filter((review) => review.spotId === Number(spotId)) // see if user already has a comment for the spot
    const userId = getCurrentUser ? getCurrentUser.id : null // get the current user's id

    useEffect(() => {
        dispatch(getSpotById(spotId))
        dispatch(getUserReviews())
    }, [spotId, dispatch])


    if( Object.values(targetSpot).length === 0 ) return null // if this is the first render, return null
    const filteredSpotImages = targetSpot.SpotImages.filter((img) => img.preview === false) || [] // give all spot images beside the preview image
    const filteredSpotImagesPreview = targetSpot.SpotImages.filter((img) => img.preview === true) || [] // gives back the preview image

    let userCanPost = false
    if( userId !== null && (targetSpot.Owner.id !== userId) && (doesUserHaveComment.length === 0) ) { // if user does not own spot AND user is signed in AND user does not have a comment, then user CAN post
        userCanPost = true
    }


    return (
        <div id="main-spotDetails-container">
            <div id="spotDetails-headerInfo">
                <h2 className="spotDetails-spotName">{targetSpot.name}</h2>
                <p className="spotDetails-city-state-country-text">{`${targetSpot.city}, ${targetSpot.state}, ${targetSpot.country}`}</p>
            </div>
            <div id="spotImages-container">
                {filteredSpotImagesPreview.map((img) => (
                    <div className="main-img" key={img.id}> <img src={img.url} alt={img.id} /> </div>
                ))}
                {/* render the preview spot image in large container on left */}
                <div id="normal-spotImgs-container">
                    {filteredSpotImages.map((img) => (
                        <div key={img.id} className="normal-spotImgs"> <img src={img.url} alt={img.id} /> </div>
                    ))}
                    {/* render all other images on display grid on right */}
                </div>
            </div>
            <div id="description-reserve-container">
                <div className="description-container-spot-details">
                    <h3 className="hosted-by-text">Hosted By {targetSpot.Owner.firstName} {targetSpot.Owner.lastName}</h3>
                    <p>{targetSpot.description}</p>
                </div>
                <div className="reserve-container">
                    <div id="reserve-info-box">
                        <div className="spotDetail-price-night-container">
                            <div className="spotDetails-price-text">${targetSpot.price}</div>
                            <span className="night-text">night</span>
                        </div>
                        <div>{targetSpot.numReviews === 1 ? `★${displayAsFloat(targetSpot.avgStarRating)} · ${targetSpot.numReviews} review` :
                            targetSpot.avgStarRating ? `★${displayAsFloat(targetSpot.avgStarRating)} · ${targetSpot.numReviews} reviews`
                            :  `★ New `}
                        </div>
                    </div>
                    <button className="reserve-button" onClick={() => history.push(`/spots/${spotId}/bookings`)}>Reserve</button>
                </div>
            </div>
            <div id="review-container">
                <div className="average-reviews-info-reviewSection">{targetSpot.numReviews === 1 ? `★${displayAsFloat(targetSpot.avgStarRating)} · ${targetSpot.numReviews} review` :
                    targetSpot.avgStarRating ? `★${displayAsFloat(targetSpot.avgStarRating)} · ${targetSpot.numReviews} reviews`
                    :  `★ New `}
                </div>
                <span className="post-your-review-style-button">
                    { userCanPost && ( <OpenModalButton buttonText={'Post Your Review'} modalComponent={<ReviewModal spotId={spotId}/>} /> )}
                </span>
                {/* Notice the "Post Your Review" button which is only visible for logged-in users on a Spot's Detail Page if the user didn't post a review for that Spot yet and the user isn't the creator of the spot. */}
                <div className="review-comment-section-container">
                    <Reviews user={userId} spotOwner={targetSpot.Owner.id}/>
                </div>
            </div>
        </div>
    )
}
