export default function SuggestedGroups() {
  const mockGroups = [
    "Study Group A",
    "Exam Prep Team",
    "Project Collaboration"
  ];

  return (
    <div className="suggestions">
      <h3>Suggested Groups</h3>

      {mockGroups.map((group, i) => (
        <div key={i} className="group-card">
          {group}
        </div>
      ))}
    </div>
  );
}