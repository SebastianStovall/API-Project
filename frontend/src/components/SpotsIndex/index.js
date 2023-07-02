import { SpotsIndexItem } from "./SpotsIndexItem"
import "./SpotsIndex.css"

export const SpotsIndex = ({spots}) => {

    return (
            <div>
                <div id="spots-list">
                    {spots.map((spot) => {
                        return <SpotsIndexItem spot={spot} key={spot.id}/>
                    })}
                </div>
            </div>
    )
}
