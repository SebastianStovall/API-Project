import './CreateSpot.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createSpot } from '../../store/spots'
import { createSpotImage } from '../../store/spots'
import { useHistory } from 'react-router-dom'

export const CreateSpot = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    const [previewImg, setPreviewImg] = useState("")
    const [imageUrlOne, setImageUrlOne] = useState("")
    const [imageUrlTwo, setImageUrlTwo] = useState("")
    const [imageUrlThree, setImageUrlThree] = useState("")
    const [imageUrlFour, setImageUrlFour] = useState("")

    const [formErrors, setFormErrors] = useState({})

    const VALID_STATES = [
        "AL", "AK", "AZ", "AR", "CA", "CZ", "CO", "CT", "DE", "DC", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS",
        "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
        "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WI", "WY"
    ];

    useEffect(() => {
    }, [address, city, state, country, name, description, price])

    const isValidUrl = (url) => {
        return ( url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg") )
    }

    // deterine if all inputs excluding any image stuff is correct
    // if spot is good to go, dispatch the action (REMEMBER TO HARD CODE VALUES FOR LAT AND LNG)  --->  (IF SPOT NOT GOOD TO GO, render the errors required)
    // the thunk will return the new spot id
    // with the spot id, create 5 conditional checks to determine which images you'll need to create for the new spot (1 input will be preview image, other 4 will NOT be preview images)
    // HAVE A FUNCTION THAT DETERMINES IF THE INPUTS FOR IMAGES ARE A VALID URL
    // if( value !== null && isValidUrl(value) && ( IF DOING EDIT ---> look up that spot's details to see if it already has 5 images ) ) ---> dispatch(createSpotImage(newspotId, previewImgBoolean, url))
    // once images are added, return user to spot detail page

    const handleSubmit = async (e) => {
        e.preventDefault()

        const spot = {
            address,
            city,
            state,
            country,
            lat: 50.00, // hard code these since i dont have an api to dynamically get these
            lng: 50.00, // hard code these since i dont have an api to dynamically get these
            name,
            description,
            price: Number(price)
        }

        const response = await dispatch(createSpot(spot)) // attempt to create spot

        if (response.errors) {
            const errors = response.errors // main backend errors

            if(previewImg === "") errors.previewImg = 'Preview image is required'
            if( !(isValidUrl(previewImg)) ) errors.previewImgInvalid = "Image URL must end in .png, .jpg, or .jpeg"
            if( !(isValidUrl(imageUrlOne)) && imageUrlOne !== "" ) errors.imageUrlOne = "Image URL must end in .png, .jpg, or .jpeg"
            if( !(isValidUrl(imageUrlTwo)) && imageUrlTwo !== "" ) errors.imageUrlTwo = "Image URL must end in .png, .jpg, or .jpeg"
            if( !(isValidUrl(imageUrlThree)) && imageUrlThree !== "" ) errors.imageUrlThree = "Image URL must end in .png, .jpg, or .jpeg"
            if( !(isValidUrl(imageUrlFour)) && imageUrlFour !== "" ) errors.imageUrlFour = "Image URL must end in .png, .jpg, or .jpeg"
            setFormErrors(errors)
        } else { // response = spot id
            dispatch(createSpotImage(response, true, previewImg))
            if(isValidUrl(imageUrlOne)) dispatch(createSpotImage(response, false, imageUrlOne))
            if(isValidUrl(imageUrlTwo)) dispatch(createSpotImage(response, false, imageUrlTwo))
            if(isValidUrl(imageUrlThree)) dispatch(createSpotImage(response, false, imageUrlThree))
            if(isValidUrl(imageUrlFour)) dispatch(createSpotImage(response, false, imageUrlFour))

            history.push(`/spots/${response}`) // push to new spot page
        }


        // clear form values
        setAddress("")
        setCity("")
        setState("")
        setCountry("")
        setName("")
        setDescription("")
        setPrice("")
        setPreviewImg("")
        setImageUrlOne("")
        setImageUrlTwo("")
        setImageUrlThree("")
        setImageUrlFour("")
    }


    return (
        <div id='create-spot-form-container'>
            <form onSubmit={handleSubmit}>
                <h2>Create a new Spot</h2>
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

                <div id='spot-image-container'>
                    <div className='spotImage-header'>
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                    </div>
                    <div className='spot-image-input'>
                        <input
                            value={previewImg}
                            onChange={(e) => setPreviewImg(e.target.value)}
                            placeholder='Preview Image Url'
                        />
                        {formErrors && <span className='form-errors'>{formErrors.previewImg}</span>}
                        {formErrors && <span className='form-errors'>{formErrors.previewImgInvalid}</span>}
                    </div>
                    <div className='spot-image-input'>
                        <input
                            value={imageUrlOne}
                            onChange={(e) => setImageUrlOne(e.target.value)}
                            placeholder='Image Url'
                        />
                        {formErrors && <span className='form-errors'>{formErrors.imageUrlOne}</span>}
                    </div>
                    <div className='spot-image-input'>
                        <input
                            value={imageUrlTwo}
                            onChange={(e) => setImageUrlTwo(e.target.value)}
                            placeholder='Image Url'
                        />
                        {formErrors && <span className='form-errors'>{formErrors.imageUrlTwo}</span>}
                    </div>
                    <div className='spot-image-input'>
                        <input
                            value={imageUrlThree}
                            onChange={(e) => setImageUrlThree(e.target.value)}
                            placeholder='Image Url'
                        />
                        {formErrors && <span className='form-errors'>{formErrors.imageUrlThree}</span>}
                    </div>
                    <div className='spot-image-input'>
                        <input
                            value={imageUrlFour}
                            onChange={(e) => setImageUrlFour(e.target.value)}
                            placeholder='Image Url'
                        />
                        {formErrors && <span className='form-errors'>{formErrors.imageUrlFour}</span>}
                    </div>
                </div>

                <button type='submit'>Create Spot</button>

            </form>
        </div>
    )
}
