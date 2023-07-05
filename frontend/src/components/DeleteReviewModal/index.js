import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteSpotReview } from "../../store/reviews"
import { getSpotById } from "../../store/spots"
import './DeleteReviewModal.css'

export const DeleteReviewModal = ({reviewId, spotId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDeleteReview = () => {
        dispatch(deleteSpotReview(reviewId))
        dispatch(getSpotById(spotId))
        .then(closeModal)
        .catch(async (res) => console.log(res));
    }

    const handleCloseModal = () => {
        closeModal()
    }

    return (
        <div id="delete-modal-main-container">
            <div className="delete-modal-content-container">
                <h2 className="delete-center-text">Confirm Delete</h2>
                <h3 className="delete-center-text">Are you sure you want to delete this review?</h3>
                <div className="delete-buttons-container">
                    <button onClick={handleDeleteReview} className="delete-spot-buttons yes">Yes (Delete Review)</button>
                    <button onClick={handleCloseModal} className="delete-spot-buttons no">No (Keep Review)</button>
                </div>
            </div>
        </div>
    )
}
