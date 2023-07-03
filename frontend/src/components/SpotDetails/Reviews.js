import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getSpotReviews } from "../../store/spots"

export const Reviews = ({spotId}) => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => Object.values(state.spots.reviews))

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])

    const formatDate = (createdAtTime) => { // use to format review.createdAt into a Month/Year format
        const date = new Date(createdAtTime);
        return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    };

    return (
        <>
            {reviews.map((review) => (
                <div key={review.id} className="single-review">
                    <p>{review.User.firstName}</p>
                    <p>{formatDate(review.createdAt)}</p>
                    <p>{review.review}</p>
                </div>
            ))}
        </>
    )
}
