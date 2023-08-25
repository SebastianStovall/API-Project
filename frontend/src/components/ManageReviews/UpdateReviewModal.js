import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // import fontawesome
import { faStar } from "@fortawesome/free-solid-svg-icons"; // import the specific icon you want and make sure to npm install both and public html has font-awesome css import
import { editReviewThunk } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { getSpotById } from "../../store/spots";
import { getUserReviews } from "../../store/reviews";

export const UpdateReviewModal = ({review, spotId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState(0)
    const [highlight, setHighlight] = useState(0)
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        const errors = {}
        if(reviewText.length <= 9) errors.reviewText = "Review must have a minimum of 10 characters"
        if(reviewText.length > 255) errors.reviewText = "Review must not exceed 255 characters"
        if(rating === 0) errors.rating = "Please select a star rating"
        setFormErrors(errors)
    }, [rating, reviewText])

    useEffect(() => {
        setReviewText(review.review)
        setRating(review.stars)
        setHighlight(review.stars)
    }, [review.review, review.stars])


    const handleUpdateReview = (e) => {
        e.preventDefault()

        const reviewInfo = {
            review: reviewText,
            stars: rating
        }

        return dispatch(editReviewThunk(review.id, reviewInfo))
        .then(() => dispatch(getSpotById(spotId)))
        .then(() => dispatch(getUserReviews()))
        .then(closeModal)
        .catch(async (res) => console.log(res));
    }

    return (

        <div id="review-modal-main-container">
            <form onSubmit={handleUpdateReview}>
                <h2 className="review-header">How was your stay?</h2>
                {formErrors && reviewText !== "" && <span className="errors">{formErrors.reviewText}</span>}
                <textarea
                    className='review-textarea'
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder='Just a quick review.'
                />
                <div id="star-container">
                    <div className="stars">
                        <FontAwesomeIcon className={`single-star ${rating >= 1 ? "activestar" : ""}`} id={highlight >= 1 ? "highlight" : ""} icon={faStar} value={rating}
                        onClick={() => setRating(1)} onMouseMoveCapture={() => setHighlight(1)} onMouseLeave={() => setHighlight("")} />

                        <FontAwesomeIcon className={`single-star ${rating >= 2 ? "activestar" : ""}`} id={highlight >= 2 ? "highlight" : ""} icon={faStar} value={rating}
                        onClick={() => setRating(2)} onMouseMoveCapture={() => setHighlight(2)} onMouseLeave={() => setHighlight("")} />

                        <FontAwesomeIcon className={`single-star ${rating >= 3 ? "activestar" : ""}`} id={highlight >= 3 ? "highlight" : ""} icon={faStar} value={rating}
                        onClick={() => setRating(3)} onMouseMoveCapture={() => setHighlight(3)} onMouseLeave={() => setHighlight("")} />

                        <FontAwesomeIcon className={`single-star ${rating >= 4 ? "activestar" : ""}`} id={highlight >= 4 ? "highlight" : ""} icon={faStar} value={rating}
                        onClick={() => setRating(4)} onMouseMoveCapture={() => setHighlight(4)} onMouseLeave={() => setHighlight("")} />

                        <FontAwesomeIcon className={`single-star ${rating >= 5 ? "activestar" : ""}`} id={highlight >= 5 ? "highlight" : ""} icon={faStar} value={rating}
                        onClick={() => setRating(5)} onMouseMoveCapture={() => setHighlight(5)} onMouseLeave={() => setHighlight("")} />
                        <span className="star-text">Stars</span>
                    </div>
                </div>

                <div id="review-button-container">
                    <button className="review-submit-button" type="submit" disabled={Object.values(formErrors).length > 0}>Update your Review</button>
                </div>
            </form>
        </div>
    )

}
