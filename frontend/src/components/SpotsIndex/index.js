import { SpotsIndexItem } from "./SpotsIndexItem"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getSpots } from "../../store/spots"
import "./SpotsIndex.css"

export const SpotsIndex = ({spots}) => {

    const dispatch = useDispatch()
    useEffect(() => { // this needed to be dispatched again because of manage spot page
        dispatch(getSpots())
    }, [dispatch])

    return (
            <div id="landing-page-main-spot-container">
                <div id="spots-list">
                    {spots.map((spot) => {
                        return <SpotsIndexItem spot={spot} key={spot.id}/>
                    })}
                </div>
            </div>
    )
}
