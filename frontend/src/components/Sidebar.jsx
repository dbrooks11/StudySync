import {Link} from "react-router-dom"

export default function Sidebar({ side, open, options = [] }) {
  return (
    <div className={`sidebar ${side} ${open ? "open" : ""}`}>
      <ul>
        {options.map((item, i) => (
          <Link key={i} to={item.route} id="route">{item.title}</Link>
        ))}
      </ul>
    </div>
  );
}