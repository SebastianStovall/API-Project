import { useParams } from "react-router-dom"

export const SpotDetails = ({spots}) => {

    const { spotId } = useParams()

    const spotToRender = spots.find((spot) => spot.id === Number(spotId))
    // console.log(spotToRender)

    return (
        <h2>this wont render anything why???????</h2>
    )
}
