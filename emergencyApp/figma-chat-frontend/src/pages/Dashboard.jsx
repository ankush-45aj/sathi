import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "./Dashboard.css";

const menuList = [
    { key: "dashboard", icon: "fa-home", label: "Dashboard" },
    { key: "projects", icon: "fa-project-diagram", label: "Projects" },
    { key: "requests", icon: "fa-clipboard-list", label: "Requests" },
    { key: "community", icon: "fa-user-friends", label: "Community" },
    { key: "profile", icon: "fa-user", label: "Profile" },
    { key: "settings", icon: "fa-cog", label: "Settings" },
    { key: "support", icon: "fa-question-circle", label: "Help & Support" },
];

// Sample data for demonstration
const sampleRequests = [
    { id: "REQ-7842", type: "Design Consultation", status: "Completed", date: "Oct 12, 2023" },
    { id: "REQ-7843", type: "Pattern Making", status: "In Progress", date: "Oct 14, 2023" },
    { id: "REQ-7844", type: "Fabric Sourcing", status: "Pending", date: "Oct 15, 2023" },
    { id: "REQ-7845", type: "Custom Fitting", status: "Scheduled", date: "Oct 16, 2023" }
];

const sampleProjects = [
    { id: 1, name: "Summer Collection", description: "Designing a new summer clothing line with sustainable materials.", progress: 75 },
    { id: 2, name: "Winter Jackets", description: "Premium winter outerwear collection for extreme conditions.", progress: 40 },
    { id: 3, name: "Accessories Line", description: "Complementary accessories for the main collections.", progress: 20 },
    { id: 4, name: "Eco-Friendly Sportswear", description: "Sustainable activewear made from recycled materials.", progress: 90 }
];

const sampleCommunity = [
    { id: 1, name: "John Smith", role: "Fashion Designer", experience: "10+ years", avatar: "JS" },
    { id: 2, name: "Emma Johnson", role: "Textile Expert", experience: "8+ years", avatar: "EJ" },
    { id: 3, name: "Michael Brown", role: "Pattern Maker", experience: "12+ years", avatar: "MB" },
    { id: 4, name: "Sarah Williams", role: "Fashion Illustrator", experience: "6+ years", avatar: "SW" }
];

const faqItems = [
    { id: 1, question: "How do I create a new project?", answer: "Go to the Projects section and click on the 'New Project' button. Fill in the required details and submit." },
    { id: 2, question: "How can I connect with other community members?", answer: "Visit the Community section to browse members and use the 'Connect' button to send connection requests." },
    { id: 3, question: "What types of requests can I make?", answer: "You can request design consultations, pattern making, fabric sourcing, fittings, and more from our experts." },
    { id: 4, question: "How do I update my profile information?", answer: "Navigate to your Profile section and click the 'Edit Profile' button to modify your details." }
];

function Dashboard() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [activeSection, setActiveSection] = useState("dashboard");
    const [darkMode, setDarkMode] = useState(false);
    const [checkboxes, setCheckboxes] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFAQ, setActiveFAQ] = useState(null);
    const [notificationCount, setNotificationCount] = useState(3);

    useEffect(() => {
        // Simulate user data fetch
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No token found ❌");
                return;
            }
            try {
                // In a real app, this would be an API call
                setTimeout(() => {
                    setUser({
                        name: "Alex Johnson",
                        email: "alex.johnson@example.com",
                        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                        _id: "user-12345",
                        location: "New York, USA",
                        role: "Professional Fashion Designer",
                        bio: "Specialized in sustainable fashion and modern designs with 8 years of industry experience."
                    });
                }, 1000);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching dashboard ❌");
            }
        };
        fetchUser();
    }, []);

    // Handle dark mode body class
    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        return () => document.body.classList.remove("dark-mode");
    }, [darkMode]);

    const handleMenuClick = (key) => {
        setActiveSection(key);
        setMobileMenuOpen(false);
    };

    const handleCheckbox = (id) => {
        setCheckboxes((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleFAQ = (id) => {
        setActiveFAQ(activeFAQ === id ? null : id);
    };

    const handleNotificationClick = () => {
        setNotificationCount(0);
        // In a real app, this would mark notifications as read
    };

    if (error) return <p style={{ color: "red", textAlign: "center", padding: "2rem" }}>{error}</p>;
    if (!user) return <div className="loading-spinner">Loading...</div>;

    return (
        <div className="container">
            {/* Mobile Header */}
            <div className="mobile-header">
                <button
                    className="menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
                </button>
                <div className="mobile-logo">
                    <i className="fas fa-cut"></i>
                    <span>Micro Help</span>
                </div>
                <div className="mobile-actions">
                    <button className="icon-button" onClick={handleNotificationClick}>
                        <i className="fas fa-bell"></i>
                        {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
                    </button>
                    <div
                        className="mobile-user"
                        onClick={() => handleMenuClick("profile")}
                    >
                        <img src={user.avatar} alt="User" />
                    </div>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="overlay"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
                <div className="logo">
                    <i className="fas fa-cut"></i>
                    <h1>Micro Help</h1>
                    <button
                        className="close-menu"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="menu-items">
                    {menuList.map((item) => (
                        <div
                            key={item.key}
                            className={`menu-item${activeSection === item.key ? " active" : ""}`}
                            onClick={() => handleMenuClick(item.key)}
                        >
                            <i className={`fas ${item.icon}`}></i>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
                <div className="sidebar-footer">
                    <div
                        className={`menu-item${activeSection === "profile" ? " active" : ""}`}
                        onClick={() => handleMenuClick("profile")}
                    >
                        <img src={user.avatar} alt="User" className="user-avatar" />
                        <div className="user-details">
                            <span className="user-name">{user.name}</span>
                            <span className="user-role">{user.role}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="header">
                    <h2>{menuList.find((m) => m.key === activeSection)?.label || "Dashboard"}</h2>
                    <div className="header-actions">
                        <button className="icon-button" onClick={handleNotificationClick}>
                            <i className="fas fa-bell"></i>
                            {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
                        </button>
                        <div
                            className="user-info"
                            onClick={() => handleMenuClick("profile")}
                        >
                            <img src={user.avatar} alt="User" />
                            <span>{user.name}</span>
                            <i className="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </div>

                {/* Dashboard Section */}
                <div className={`content-section${activeSection === "dashboard" ? " active" : ""}`}>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon" style={{ backgroundColor: "rgba(113, 101, 227, 0.1)", color: "#7165E3" }}>
                                <i className="fas fa-project-diagram"></i>
                            </div>
                            <div className="stat-content">
                                <h3>12</h3>
                                <p>Active Projects</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ backgroundColor: "rgba(47, 198, 139, 0.1)", color: "#2FC68B" }}>
                                <i className="fas fa-clipboard-check"></i>
                            </div>
                            <div className="stat-content">
                                <h3>8</h3>
                                <p>Completed</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ backgroundColor: "rgba(255, 171, 67, 0.1)", color: "#FFAB43" }}>
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className="stat-content">
                                <h3>4</h3>
                                <p>Pending</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ backgroundColor: "rgba(67, 154, 240, 0.1)", color: "#439AF0" }}>
                                <i className="fas fa-user-friends"></i>
                            </div>
                            <div className="stat-content">
                                <h3>24</h3>
                                <p>Connections</p>
                            </div>
                        </div>
                    </div>

                    <div className="cards-grid">
                        <div className="card">
                            <div className="card-header">
                                <h3>Nearly Requests</h3>
                                <button className="btn btn-outline">View All</button>
                            </div>
                            <div className="card-content">
                                {["object1", "object2", "object3"].map((id, idx) => (
                                    <div className="checkbox-item" key={id} style={{ backgroundColor: checkboxes[id] ? "var(--highlight-bg)" : undefined }}>
                                        <label className="checkbox-container">
                                            <input type="checkbox" id={id} checked={!!checkboxes[id]} onChange={() => handleCheckbox(id)} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor={id} className="checkbox-label">
                                            {idx === 0 ? "Community Design Review" : idx === 1 ? "Empress Collection Feedback" : "New Client Consultation"}
                                            <span className="request-date">{idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : "In 2 days"}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3>Recent Activity</h3>
                                <button className="btn btn-outline">See All</button>
                            </div>
                            <div className="card-content">
                                <div className="activity-item">
                                    <div className="activity-avatar" style={{ backgroundColor: "#7165E3" }}>JS</div>
                                    <div className="activity-details">
                                        <p><strong>John Smith</strong> commented on your project</p>
                                        <span className="activity-time">2 hours ago</span>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-avatar" style={{ backgroundColor: "#2FC68B" }}>EJ</div>
                                    <div className="activity-details">
                                        <p><strong>Emma Johnson</strong> liked your design</p>
                                        <span className="activity-time">5 hours ago</span>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-avatar" style={{ backgroundColor: "#FFAB43" }}>MB</div>
                                    <div className="activity-details">
                                        <p><strong>Michael Brown</strong> sent a connection request</p>
                                        <span className="activity-time">Yesterday</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Project Progress</h3>
                        </div>
                        <div className="card-content">
                            {sampleProjects.map(project => (
                                <div key={project.id} className="progress-item">
                                    <div className="progress-info">
                                        <h4>{project.name}</h4>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <div className={`content-section${activeSection === "projects" ? " active" : ""}`}>
                    <div className="card">
                        <div className="card-header">
                            <h3>My Projects</h3>
                            <button className="btn btn-primary"><i className="fas fa-plus"></i> New Project</button>
                        </div>
                        <div className="projects-grid">
                            {sampleProjects.map(project => (
                                <div key={project.id} className="project-card">
                                    <div className="project-header">
                                        <div className="project-icon" style={{ backgroundColor: "#7165E3" }}>
                                            <i className="fas fa-project-diagram"></i>
                                        </div>
                                        <div className="project-actions">
                                            <button className="icon-button small"><i className="fas fa-ellipsis-v"></i></button>
                                        </div>
                                    </div>
                                    <div className="project-content">
                                        <h4>{project.name}</h4>
                                        <p>{project.description}</p>
                                        <div className="project-progress">
                                            <div className="progress-info">
                                                <span>Progress</span>
                                                <span>{project.progress}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="project-footer">
                                            <div className="collaborators">
                                                <div className="avatar-group">
                                                    <div className="avatar" style={{ backgroundColor: "#7165E3" }}>AJ</div>
                                                    <div className="avatar" style={{ backgroundColor: "#2FC68B" }}>EJ</div>
                                                    <div className="avatar" style={{ backgroundColor: "#FFAB43" }}>MB</div>
                                                </div>
                                                <span>+2 others</span>
                                            </div>
                                            <button className="btn btn-outline">View Project</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Requests Section */}
                <div className={`content-section${activeSection === "requests" ? " active" : ""}`}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Recent Requests</h3>
                            <button className="btn btn-primary"><i className="fas fa-plus"></i> New Request</button>
                        </div>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Request ID</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sampleRequests.map(request => (
                                        <tr key={request.id}>
                                            <td>{request.id}</td>
                                            <td>{request.type}</td>
                                            <td>
                                                <span className={`status-badge ${request.status.toLowerCase().replace(" ", "-")}`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td>{request.date}</td>
                                            <td>
                                                <button className="btn btn-outline small">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Community Section */}
                <div className={`content-section${activeSection === "community" ? " active" : ""}`}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Community</h3>
                            <button className="btn btn-primary"><i className="fas fa-users"></i> Explore Groups</button>
                        </div>
                        <div className="section">
                            <div className="section-title">
                                <i className="fas fa-user-friends"></i>
                                <span>Community Members</span>
                            </div>
                            <div className="community-grid">
                                {sampleCommunity.map(member => (
                                    <div key={member.id} className="member-card">
                                        <div className="member-avatar" style={{ backgroundColor: "#7165E3" }}>
                                            {member.avatar}
                                        </div>
                                        <div className="member-info">
                                            <h4>{member.name}</h4>
                                            <p>{member.role}</p>
                                            <span className="experience">{member.experience} experience</span>
                                        </div>
                                        <div className="member-actions">
                                            <button className="btn btn-outline">Connect</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Section */}
                <div className={`content-section${activeSection === "profile" ? " active" : ""}`}>
                    <div className="card profile-card">
                        <div className="profile-header">
                            <img src={user.avatar} alt="Profile" className="profile-img" />
                            <div className="profile-actions">
                                <button className="btn btn-primary"><i className="fas fa-edit"></i> Edit Profile</button>
                                <button className="btn btn-outline"><i className="fas fa-share-alt"></i> Share</button>
                            </div>
                        </div>
                        <div className="profile-info">
                            <h3>{user.name}</h3>
                            <p className="profile-role">{user.role}</p>
                            <p className="profile-location"><i className="fas fa-map-marker-alt"></i> {user.location}</p>
                            <p className="profile-bio">{user.bio}</p>
                        </div>
                    </div>

                    <div className="cards-grid">
                        <div className="card">
                            <div className="card-header">
                                <h3>Profile Details</h3>
                            </div>
                            <div className="card-content">
                                <div className="detail-item">
                                    <span className="detail-label">Full Name</span>
                                    <span className="detail-value">{user.name}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Email</span>
                                    <span className="detail-value">{user.email}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">User ID</span>
                                    <span className="detail-value">{user._id}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Member Since</span>
                                    <span className="detail-value">January 2022</span>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3>Skills & Expertise</h3>
                            </div>
                            <div className="card-content">
                                <div className="skills-list">
                                    <span className="skill-tag">Fashion Design</span>
                                    <span className="skill-tag">Pattern Making</span>
                                    <span className="skill-tag">Textile Selection</span>
                                    <span className="skill-tag">Sustainable Fashion</span>
                                    <span className="skill-tag">CAD Design</span>
                                    <span className="skill-tag">Trend Analysis</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Section */}
                <div className={`content-section${activeSection === "settings" ? " active" : ""}`}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Application Settings</h3>
                        </div>
                        <div className="card-content">
                            <div className="setting-group">
                                <div className="section-title">
                                    <i className="fas fa-palette"></i>
                                    <span>Appearance</span>
                                </div>
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h4>Dark Mode</h4>
                                        <p>Switch between light and dark themes</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="setting-group">
                                <div className="section-title">
                                    <i className="fas fa-bell"></i>
                                    <span>Notifications</span>
                                </div>
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h4>Email Notifications</h4>
                                        <p>Receive updates via email</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h4>Push Notifications</h4>
                                        <p>Receive browser notifications</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="setting-group">
                                <div className="section-title">
                                    <i className="fas fa-lock"></i>
                                    <span>Privacy & Security</span>
                                </div>
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h4>Private Profile</h4>
                                        <p>Make your profile visible only to connections</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h4>Two-Factor Authentication</h4>
                                        <p>Add an extra layer of security to your account</p>
                                    </div>
                                    <button className="btn btn-outline">Enable</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className={`content-section${activeSection === "support" ? " active" : ""}`}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Help & Support</h3>
                        </div>
                        <div className="card-content">
                            <div className="section">
                                <div className="section-title">
                                    <i className="fas fa-question-circle"></i>
                                    <span>Frequently Asked Questions</span>
                                </div>
                                <div className="faq-list">
                                    {faqItems.map(faq => (
                                        <div key={faq.id} className={`faq-item ${activeFAQ === faq.id ? "active" : ""}`}>
                                            <div className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                                                <span>{faq.question}</span>
                                                <i className={`fas ${activeFAQ === faq.id ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                            </div>
                                            {activeFAQ === faq.id && (
                                                <div className="faq-answer">
                                                    <p>{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="section">
                                <div className="section-title">
                                    <i className="fas fa-life-ring"></i>
                                    <span>Contact Support</span>
                                </div>
                                <p>If you need further assistance, our support team is available 24/7.</p>
                                <div className="contact-options">
                                    <button className="btn btn-primary"><i className="fas fa-envelope"></i> Email Support</button>
                                    <button className="btn btn-outline"><i className="fas fa-phone"></i> Call Support</button>
                                    <button className="btn btn-outline"><i className="fas fa-comment"></i> Live Chat</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;