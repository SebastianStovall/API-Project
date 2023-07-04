import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import "./ReviewModal.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // import fontawesome
import { faStar } from "@fortawesome/free-solid-svg-icons"; // import the specific icon you want and make sure to npm install both and public html has font-awesome css import

export const ReviewModal = () => {
    const { closeModal } = useModal()
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState(0)
    const [highlight, setHighlight] = useState(0)
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        const errors = {}
        if(reviewText.length <= 9) errors.reviewText = "Review must have a minimum of 10 characters"
        setFormErrors(errors)
    }, [rating, reviewText])


    const handleReviewSubmit = () => {

    }

    return (

        <div id="review-modal-main-container">
            <form onSubmit={handleReviewSubmit}>
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
                    <button className="review-submit-button" disabled={Object.values(formErrors).length > 0}>Submit your Review</button>
                </div>
            </form>
        </div>
    )

}
