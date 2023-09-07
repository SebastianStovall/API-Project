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
                    {spots.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map((spot) => {
                        return <SpotsIndexItem spot={spot} key={spot.id}/>
                    })}
                </div>
                <footer>
                    <div id='footer-container'>
                        <div id='footer-title'>
                            <a href="https://github.com/SebastianStovall" target="blank"> <i class="fab fa-github"></i> <span className="label">GitHub</span> </a>
                        </div>
                            <ul id="footer-list">
                                <li>
                                    <a href="https://www.linkedin.com/in/sebastian-stovall-a17a8a211/" target="blank">  <i class="fab fa-linkedin"></i> <span className="label">LinkedIn</span> </a>
                                </li>
                            </ul>
                    </div>
                </footer>
            </div>
    )
}
