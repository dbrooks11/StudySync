import {Link} from "react-router-dom"

export default function Navbar({ options = [] }) {
  return (
    <div>
      <header className="header">
            

            <div className="logo-container">
                <div className="logo">
                    <img src="src/assets/StudySyncLogo1.png" alt="StudySync Logo" />
                </div>
            </div>
            
            
        </header>
      <div className="sidebar">
        <ul>
          {options.map((item, i) => (
            <Link key={i} to={item.route} id="route">{item.title}</Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
