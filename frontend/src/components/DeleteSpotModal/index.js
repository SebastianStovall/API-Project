import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteSpot } from "../../store/spots"
import "./DeleteSpotModal.css"


export const DeleteSpotModal = ({spotId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDeleteSpot = () => {
        return dispatch(deleteSpot(spotId))
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
                <h3 className="delete-center-text">Are you sure you want to remove this spot from the listings?</h3>
                <div className="delete-buttons-container">
                    <button onClick={handleDeleteSpot} className="delete-spot-buttons yes">Yes (Delete Spot)</button>
                    <button onClick={handleCloseModal} className="delete-spot-buttons no">No (Keep Spot)</button>
                </div>
            </div>
        </div>
    )
}
