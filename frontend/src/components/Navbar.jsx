import {Link} from "react-router-dom"
import { useSearch } from '../SearchContext'

export default function Navbar({ options = [] }) {
  const { searchTerm, setSearchTerm } = useSearch()

  return (
    <div className="navbar">
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <img src="src/assets/StudySyncLogo1.png" alt="StudySync Logo" />
          </div>
        </div>

        <div className="header-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input 
                placeholder="Search courses or groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div>

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


