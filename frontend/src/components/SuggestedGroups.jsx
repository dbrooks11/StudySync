export default function SuggestedGroups() {
    const mockGroupsA = [
        "Study Group A",
        "Exam Prep Team",
        "3 Members"
    ];
    const mockGroupsB = [
        "Study Group B",
        "Homework Collabs",
        "6 Members"
    ];
    const mockGroupsC = [
        "Study Group C",
        "Answer Sheet Sharing",
        "29 Members"
    ];

    const groups = [mockGroupsA, mockGroupsB, mockGroupsC];

    return (
        <div className="suggestions">
            <h3>Suggested Groups</h3>

            <div className="group-container">
                {groups.map((group, i) => (
                <div key={i} className="group-card">
                    {group.map((item, j) => (
                    <div key={j} className="group-line">
                        {item}
                    </div>
                    ))}
                </div>
                ))}
            </div>
        </div>
    );
}