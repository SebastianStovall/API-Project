import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getUserReviews } from "../../store/reviews"
import "./ManageReviews.css"
import { formatDate } from "../SpotDetails/Reviews"

import OpenModalButton from "../OpenModalButton"
import { UpdateReviewModal } from "./UpdateReviewModal"
import { DeleteReviewModal } from "../DeleteReviewModal"

export const ManageReviews = () => {

    const dispatch = useDispatch()
    const userReviews = useSelector((state) => Object.values(state.reviews.userReviews))

    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])

    if(!userReviews.length) return null

    return (
        <div id="manage-reviews-main-component">
            <h3>Manage Reviews</h3>
            {userReviews.map((review) => {
                return <div key={review.id}>
                    <p>{review?.Spot?.name}</p>
                    <p>{formatDate(review?.createdAt)}</p>
                    <p>{review?.review}</p>
                    <div className="delete-review-style-button-reviews">
                        <OpenModalButton buttonText={'Update'} modalComponent={<UpdateReviewModal review={review} spotId={review?.spotId} />} />
                        <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteReviewModal reviewId={review.id} spotId={review?.spotId} />} />
                    </div>
                </div>
            })}
        </div>
    )
}
