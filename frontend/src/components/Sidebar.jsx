export default function Sidebar({ side, open, options = [] }) {
  return (
    <div className={`sidebar ${side} ${open ? "open" : ""}`}>
      <ul>
        {options.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}