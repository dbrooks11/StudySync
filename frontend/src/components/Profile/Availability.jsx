import { formatTime } from '../../util/datetimeConversion'


export default function Availability({availabilities = [], setProfile}) {

    const addAvailability = async(formData) => {

        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/availability/add`, {
                credentials: "include",
                method: "POST",
                body: formData
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error)
            }
            setProfile((profile) => {
                return {
                    ...profile,
                    'availability': data.availabilities
                }
            })
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }

    const deleteAvailability = async(availId, day) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/availability/delete/${availId}/${day}`, {
                credentials: "include",
                method: "DELETE",
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error)
            }
            setProfile((profile) => {
                return {
                    ...profile,
                    'availability': data.availabilities
                }
            })
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <section className='avail-container'>
                <div className='avail-header'>
                    <div>
                        <h3>Availability</h3>
                        <p className="avail-subtitle">Add your weekly free windows below - we'll use them to find groups that fit your schedule.</p>
                    </div>
                </div>
            <form className='avail-form' onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                addAvailability(formData);
            }}>
                <div>
                    <label htmlFor='day'>Day</label>
                    <input list='days' name='day' id='day'></input>
                    <datalist id="days">
                        <option value={'Monday'}></option>
                        <option value={'Tuesday'}></option>
                        <option value={'Wednesday'}></option>
                        <option value={'Thursday'}></option>
                        <option value={'Friday'}></option>
                        <option value={'Saturday'}></option>
                        <option value={'Sunday'}></option>
                    </datalist>
                </div>
                <div>
                    <label htmlFor='start-time'>Start Time:</label>
                    <input type='time' id='start-time' name='start_time' min={'00:00'} max={'24:00'}></input>
                </div>
                <div>
                    <label htmlFor='end-time'>End Time:</label>
                    <input type='time' id='start-time' name='end_time' min={'00:00'} max={'24:00'}></input>
                </div>
                <button type='submit'>+</button>
            </form>
            <div className='availabilities-container'>
                {availabilities.map(availability => {
                    return(
                        <div key={availability.avail_id} className='availabilities'>
                            <div>
                                <span>{availability.day_of_week}</span>
                                <div>
                                    <span>{formatTime(availability.start_time)}</span>
                                    <span>-</span>
                                    <span>{formatTime(availability.end_time)}</span>
                                </div>
                            </div>
                            <button 
                                type='button' 
                                onClick={() => deleteAvailability(availability.avail_id, availability.day_of_week)}
                            >
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}