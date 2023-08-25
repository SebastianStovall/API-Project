import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getSpotReviews } from "../../store/reviews"
import { useParams } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import { DeleteReviewModal } from "../DeleteReviewModal"
import { UpdateReviewModal } from "../ManageReviews/UpdateReviewModal"
import "./Reviews.css"

export const formatDate = (createdAtTime) => { // use to format review.createdAt into a Month/Year format
    const date = new Date(createdAtTime);
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};

export const Reviews = ({user, spotOwner}) => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => Object.values(state.reviews.reviews))
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])

    if( reviews.length === 0 && (user !== null) && (user !== spotOwner) ) { // if no reviews, AND user is logged in AND current user is NOT spot owner, render this text
        return <p>Be the first to post a review</p>
    }

    return (
        <>
            {reviews
            .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by createdAt attribute. newest comments first
            .map((review) => (
                <div key={review?.id} className="single-review">
                    <p>{review?.User?.firstName}</p>
                    <p className="review-date">{formatDate(review?.createdAt)}</p>
                    <p>{review?.review}</p>
                    <span className="delete-review-style-button-reviews">
                        {console.log(user, review)}
                    {(user === review.User?.id || user === review?.userId) && ( <OpenModalButton buttonText={'Update'} modalComponent={<UpdateReviewModal review={review} spotId={review.spotId} />} /> ) }
                    {(user === review.User?.id || user === review?.userId) && ( <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteReviewModal reviewId={review.id} spotId={review.spotId} />} /> ) }
                    </span>
                </div>
            ))}
        </>
    )
}
