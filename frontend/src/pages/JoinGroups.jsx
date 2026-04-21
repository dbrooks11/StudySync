import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
// Add styling import here

export default function JoinGroups() {
    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);
    const [availableGroups, setAvailableGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAvailableGroups();
    }, []);

    const fetchAvailableGroups = async () => {
        try {
            // Fetch student's availability: To be updated with correct logic when availability is implemented
            const availabilityResponse = await fetch('/profile/availability', {});
            if (!availabilityResponse.ok) throw new Error('Failed to fetch availability'); //ATM this will fail 100% until implementation
            const availability = await availabilityResponse.json();

            // Fetch study groups
            const groupsResponse = await fetch('/groups');
            if (!groupsResponse.ok) throw new Error('Failed to fetch groups');
            const allGroups = await groupsResponse.json();

            // Filter groups
            const filteredGroups = filterGroupsByAvailability(allGroups, availability);
            setAvailableGroups(filteredGroups);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filterGroupsByAvailability = (groups, availability) => {
        return groups.filter(group => {
            const meetingDate = new Date(group.meeting_time);
            const dayOfWeek = meetingDate.toLocaleLowerCase('en-US', { weekday: 'long' });
            const meetingTime = meetingDate.toTimeString().slice(0, 5);

            return availability.some(slot => {
                if (slot.day_of_week.toLowerCase() !== dayOfWeek) return false;
                return meetingTime >= slot.start_time && meetingTime <= slot.end_time;
            });
        });
    };

    const handleJoinGroup = async (groupId) => {
        try {
            const response = await fetch(`/groups/${groupId}/join`, {
                method: 'POST',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to join group');

            // Remove the group or update UI, alert will ensure the user sees the message. It must be clicked off from.
            setAvailableGroups(prev => prev.filter(group => group.group_id !== groupId));
            alert('Successfully joined the group!');
        } catch (err) {
            alert('Error joining group: ' + err.message);
        }
    };

    if (loading) return <div>Loading available groups...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="app">
            <Header
                onLeftToggle={() => setLeftOpen(!leftOpen)}
                onRightToggle={() => setRightOpen(!rightOpen)}
            />

            <Sidebar
                side="left"
                open={leftOpen}
                options={["Join Group", "Create Group", "Joined Groups"]}
            />
            <Sidebar
                side="right"
                open={rightOpen}
                options={["Enrolled courses", "Availability", "Profile"]}
            />

            <main className="main">
                <h2>Available Study Groups</h2>
                {availableGroups.length === 0 ? (
                    <p>No groups available matching your current availability. Try updating your availability settings, or try again later.</p>
                ) : (
                    <div className="group-container">
                        {availableGroups.map(group => (
                            <div key={group.group_id} className="group-card">
                                <h3>{group.group_name}</h3>
                                <p><strong>Course:</strong> {group.course_code} - {group.course_name}</p>
                                <p><strong>Location:</strong> {group.location || 'TBD'}</p>
                                <p><strong>Meeting Time:</strong> {new Date(group.meeting_time).toLocaleString()}</p>
                                <p><strong>Members:</strong> {group.current_size}/{group.max_size}</p>
                                <p><strong>Host:</strong> {group.host_name}</p>
                                <button
                                    onClick={() => handleJoinGroup(group.group_id)}
                                    disabled={group.current_size >= group.max_size}
                                    className="join-button"
                                >
                                    {group.current_size >= group.max_size ? 'Full' : 'Join Group'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}