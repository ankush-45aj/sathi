import { useState, memo } from "react";

const sampleServices = [
    { id: 1, name: "Pest Control", description: "Professional pest removal service", progress: 75, bookings: "115K", rating: 4.79, price: "¥1,098" },
    { id: 2, name: "Apartment Cleaning", description: "Deep cleaning for your apartment", progress: 40, bookings: "51K", rating: 4.80, price: "¥1,498" },
    { id: 3, name: "Bed Bugs Control", description: "Specialized bed bug elimination", progress: 20, bookings: "25K", rating: 4.77, price: "¥1,599" },
    { id: 4, name: "Bathroom Cleaning", description: "Intense bathroom deep cleaning", progress: 90, bookings: "29M", rating: 4.79, price: "¥499" }
];

const nearbyNeighbors = [
    { id: 1, name: "Rahul Sharma", service: "Plumbing Help", distance: "0.3km", time: "2 hours ago", avatar: "RS" },
    { id: 2, name: "Priya Patel", service: "Cooking Assistance", distance: "0.5km", time: "5 hours ago", avatar: "PP" },
    { id: 3, name: "Amit Kumar", service: "Grocery Pickup", distance: "0.7km", time: "Yesterday", avatar: "AK" }
];

const communityActivities = [
    { id: 1, user: "John Smith", action: "requested help with furniture assembly", time: "2 hours ago", avatar: "JS" },
    { id: 2, user: "Emma Johnson", action: "offered gardening services", time: "5 hours ago", avatar: "EJ" },
    { id: 3, user: "Michael Brown", action: "joined the neighborhood watch", time: "Yesterday", avatar: "MB" }
];

function DashboardSection({ active }) {
    const [checkboxes, setCheckboxes] = useState({});
    const handleCheckbox = (id) => setCheckboxes((p) => ({ ...p, [id]: !p[id] }));

    if (!active) return null;

    return (
        <div className="content-section active">
            {/* Welcome Header */}
            <div className="welcome-header">
                <h1>Welcome to Your Neighborhood</h1>
                <p>Connect with neighbors and access services right from your community</p>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: "rgba(113, 101, 227, 0.1)", color: "#7165E3" }}>
                        <i className="fas fa-hands-helping"></i>
                    </div>
                    <div className="stat-content"><h3>12</h3><p>Active Requests</p></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: "rgba(47, 198, 139, 0.1)", color: "#2FC68B" }}>
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="stat-content"><h3>8</h3><p>Completed</p></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: "rgba(255, 171, 67, 0.1)", color: "#FFAB43" }}>
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-content"><h3>4</h3><p>Pending</p></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: "rgba(67, 154, 240, 0.1)", color: "#439AF0" }}>
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-content"><h3>24</h3><p>Neighbors</p></div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="dashboard-columns">
                {/* Left Column */}
                <div className="dashboard-left">
                    {/* Nearby Neighbors */}
                    <div className="card">
                        <div className="card-header">
                            <h3>Nearby Neighbors</h3>
                            <button className="btn btn-outline">View All</button>
                        </div>
                        <div className="card-content">
                            {nearbyNeighbors.map((neighbor, idx) => (
                                <div
                                    className="checkbox-item"
                                    key={neighbor.id}
                                    style={{ backgroundColor: checkboxes[neighbor.id] ? "var(--highlight-bg)" : undefined }}
                                >
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            id={neighbor.id}
                                            checked={!!checkboxes[neighbor.id]}
                                            onChange={() => handleCheckbox(neighbor.id)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label htmlFor={neighbor.id} className="checkbox-label">
                                        <div className="neighbor-info">
                                            <span className="neighbor-name">{neighbor.name}</span>
                                            <span className="neighbor-service">{neighbor.service}</span>
                                        </div>
                                        <div className="neighbor-details">
                                            <span className="neighbor-distance">{neighbor.distance}</span>
                                            <span className="request-date">{neighbor.time}</span>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Service Progress */}
                    <div className="card">
                        <div className="card-header"><h3>Service Progress</h3></div>
                        <div className="card-content">
                            {sampleServices.map((service) => (
                                <div key={service.id} className="progress-item">
                                    <div className="progress-info">
                                        <h4>{service.name}</h4>
                                        <span>{service.progress}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${service.progress}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="dashboard-right">
                    {/* Community Activity */}
                    <div className="card">
                        <div className="card-header">
                            <h3>Community Activity</h3>
                            <button className="btn btn-outline">See All</button>
                        </div>
                        <div className="card-content">
                            {communityActivities.map((activity) => (
                                <div className="activity-item" key={activity.id}>
                                    <div className="activity-avatar" style={{ backgroundColor: "#7165E3" }}>
                                        {activity.avatar}
                                    </div>
                                    <div className="activity-details">
                                        <p><strong>{activity.user}</strong> {activity.action}</p>
                                        <span className="activity-time">{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Popular Services */}
                    <div className="card">
                        <div className="card-header">
                            <h3>Popular Services</h3>
                            <button className="btn btn-outline">Explore</button>
                        </div>
                        <div className="card-content popular-services">
                            {sampleServices.map((service) => (
                                <div key={service.id} className="service-item">
                                    <div className="service-info">
                                        <h4>{service.name}</h4>
                                        <div className="service-rating">
                                            <span className="stars">★ {service.rating}</span>
                                            <span className="bookings">({service.bookings})</span>
                                        </div>
                                    </div>
                                    <div className="service-price">{service.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(DashboardSection);