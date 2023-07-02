import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getSpotById } from "../../store/spots"
import "./SpotDetails.css"

export const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const targetSpot = useSelector((state) => state.spots.spotDetails)

    const filteredSpotImages = targetSpot?.SpotImages?.filter((img) => img.preview === false) || [] // give all images beside the preview image

    // let previewImg = null
    // if( Object.values(targetSpot).length !== 0 ) {
    //     const findPreviewImg = targetSpot.SpotImages.filter((img) => img.preview === true)
    //     if(findPreviewImg.length > 0) previewImg = findPreviewImg[0].url // will always be at index 0 since theres only one preview image
    // }

    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [spotId, dispatch])

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
                {filteredSpotImages.map((img, index) => (
                    index !== 0 ? ( <div key={img.id} className="normal-spotImgs"> <img src="https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=1xw:0.84415xh;center,top" alt={img.id} /> </div> ) : null
                ))}
            </div>
            <div id="description-reserve-container">
            </div>
            <div id="review-container">
                <div className="review-title-container"></div>
                <div className="review-comment-section-container">
                    {/* < put comment component mapping here  > */}
                </div>
            </div>
        </div>
    )
}
