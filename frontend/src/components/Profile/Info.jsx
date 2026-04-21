

import '../../css/Profile.css'

export default function Info({firstName, lastName, email, major, gpa}){
    return(
        <section id='info-container'>
            <div className="info">
                <span>{`Name: ${firstName} ${lastName}`}</span>
                <span>{`Major: ${major}`}</span>
                <span>{`Gpa: ${gpa}`}</span>
            </div>
            <span>{`Email: ${email}`}</span>
        </section>
    )
}