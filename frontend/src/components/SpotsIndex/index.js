import { SpotsIndexitem } from "./SpotsIndexItem"
import "./SpotsIndex.css"

export const SpotsIndex = ({spots}) => {

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
