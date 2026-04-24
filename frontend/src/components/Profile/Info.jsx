export default function Info({firstName, lastName, email, major, gpa}){
    return(
        <section id='info-container'>
            <div id="info-name">
                <span>{firstName} {lastName}</span>
            </div>
            <div id="info-fields">
                <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{email}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Major</span>
                    <span className="info-value">{major}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">GPA</span>
                    <span className="info-value">{gpa}</span>
                </div>
            </div>
        </section>
    )
}
