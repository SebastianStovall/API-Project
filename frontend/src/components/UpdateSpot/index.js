import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from 'react'
import { editSpot } from "../../store/spots"
import "./UpdateSpot.css"
import { useDispatch } from "react-redux"
import { getSpotById } from "../../store/spots"

export const UpdateSpot = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [formErrors, setFormErrors] = useState({})

    const VALID_STATES = [
        "AL", "AK", "AZ", "AR", "CA", "CZ", "CO", "CT", "DE", "DC", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS",
        "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
        "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WI", "WY"
    ];

    useEffect(() => {
        async function once () {
            const spotInfo = await dispatch(getSpotById(spotId))
            setAddress(spotInfo.address)
            setCity(spotInfo.city)
            setState(spotInfo.state)
            setCountry(spotInfo.country)
            setName(spotInfo.name)
            setDescription(spotInfo.description)
            setPrice(spotInfo.price)
        }
        once()
    }, [dispatch, spotId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const spotInfo = {
            address,
            city,
            state,
            country,
            lat: 50.00, // hard code these since i dont have an api to dynamically get these
            lng: 50.00, // hard code these since i dont have an api to dynamically get these
            name,
            description,
            price: Number(Math.abs(price).toFixed(2))
        }

        const response = await dispatch(editSpot(spotId, spotInfo)) // attempt to create spot

        if (response.errors) {
            const errors = response.errors // main backend errors
            setFormErrors(errors)
        } else {
            history.push(`/spots/${spotId}`)
        }

    }

    return (
        <div id='create-spot-form-container'>
            <form onSubmit={handleSubmit}>
                <h2>Update your Spot</h2>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>

                <div className='test-form'>
                    <label htmlFor="country">Country</label>
                    <input
                        id='country'
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Country'
                    />
                    {formErrors && <span className='form-errors'>{formErrors.country}</span>}
                </div>

                <div className='test-form'>
                    <label htmlFor='address'>Street Address</label>
                    <input
                        id='address'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Address'
                    />
                    {formErrors && <span className='form-errors'>{formErrors.address}</span>}
                </div>

                <div id='city-state-container'>
                    <div className='cityContainer'>
                        <label htmlFor='city'>City</label>
                        <input
                            id='city'
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='City'
                        />
                        {formErrors && <span className='form-errors'>{formErrors.city}</span>}
                    </div>
                    <div className='stateContainer'>
                        <label htmlFor='state'>State</label>
                        <select
                        id='state'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        >
                        <option value="">Select a state</option>
                        {VALID_STATES.map((stateAbbreviation, index) => (
                            <option key={index} value={stateAbbreviation}>
                                {stateAbbreviation}
                            </option>
                        ))}
                        </select>
                        {formErrors && <span className='form-errors'>{formErrors.state}</span>}
                    </div>
                </div>

                <div id='describe-your-place-container'>
                    <div className='describe-place-header'>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</p>
                    </div>
                    <div className='description-textarea-form-component'>
                        <textarea
                            className='desc-textarea'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Please write at least 30 characters'
                        />
                        {formErrors && <span className='form-errors'>{formErrors.description}</span>}
                    </div>
                </div>

                <div id='create-title-container'>
                    <div className='create-title-header'>
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    </div>
                    <div className='title-form-component'>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Name of your spot'
                        />
                        {formErrors && <span className='form-errors'>{formErrors.name}</span>}
                    </div>
                </div>

                <div id='price-container'>
                    <div className='price-header-info'>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    </div>
                    <div className='price-form-component'>
                        <label htmlFor='price'>$</label>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price per night (USD)'
                        />
                        {formErrors && <span className='form-errors'>{formErrors.price}</span>}
                    </div>
                </div>

                <div id="update-spot-button-container-edit-form">
                    <button type='submit'>Update Spot</button>
                </div>

            </form>
        </div>
    )
}
