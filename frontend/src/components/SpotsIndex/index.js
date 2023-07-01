import { useDispatch, useSelector } from "react-redux"
import { getSpots } from "../../store/spots"
import { useEffect } from "react"
import "./SpotsIndex.css"
import { SpotsIndexitem } from "./SpotsIndexItem"

export const SpotsIndex = () => {

    const dispatch = useDispatch()
    const spots = useSelector((state) => Object.values(state.spots.spots))

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <>
            <h1>SPOTS SHOULD APPEAR UNDER HERE</h1>
            <div>
                <div id="spots-list">
                    {spots.map((spot) => {
                        return <SpotsIndexitem spot={spot} key={spot.id}/>
                    })}
                </div>
            </div>
        </>
    )
}
