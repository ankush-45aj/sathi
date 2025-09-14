import { memo } from "react";

function ProfileSection({ active, user }) {
    if (!active) return null;

    return (
        <div className="content-section active">
            <div className="card profile-card">
                <div className="profile-header">
                    <img src={user?.avatar} alt="Profile" className="profile-img" />
                    <div className="profile-actions">
                        <button className="btn btn-primary"><i className="fas fa-edit"></i> Edit Profile</button>
                        <button className="btn btn-outline"><i className="fas fa-share-alt"></i> Share</button>
                    </div>
                </div>

                <div className="profile-info">
                    <h3>{user?.name}</h3>
                    <p className="profile-role">{user?.role}</p>
                    <p className="profile-location"><i className="fas fa-map-marker-alt"></i> {user?.location}</p>
                    <p className="profile-bio">{user?.bio}</p>
                </div>
            </div>

            <div className="cards-grid">
                <div className="card">
                    <div className="card-header"><h3>Profile Details</h3></div>
                    <div className="card-content">
                        <div className="detail-item"><span className="detail-label">Full Name</span><span className="detail-value">{user?.name}</span></div>
                        <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{user?.email}</span></div>
                        <div className="detail-item"><span className="detail-label">User ID</span><span className="detail-value">{user?._id}</span></div>
                        <div className="detail-item"><span className="detail-label">Member Since</span><span className="detail-value">January 2022</span></div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header"><h3>Skills & Expertise</h3></div>
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
    );
}

export default memo(ProfileSection);
