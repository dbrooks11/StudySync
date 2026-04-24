import {Link} from "react-router-dom"


export default function Navbar({ options = [] }) {
  return (
    <div className = "navbar">
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
            <li key={i}>
              <Link to={item.route} id="route">
                <i className={item.icon} style={{ color: item.color }} />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
