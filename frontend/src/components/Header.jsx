export default function Header({onLeftToggle, onRightToggle}){
    return(
        <header className="header">
            <button onClick={onLeftToggle}>☰</button>

            <div className="logo">
                <img src="src/assets/StudySyncLogo1.png" alt="StudySync Logo" />
            </div>
            
            <button onClick={onRightToggle}>☰</button>
        </header>
    );
}