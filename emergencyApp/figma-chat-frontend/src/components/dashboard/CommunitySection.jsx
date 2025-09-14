import { memo } from "react";

const sampleCommunity = [
    { id: 1, name: "John Smith", role: "Fashion Designer", experience: "10+ years", avatar: "JS" },
    { id: 2, name: "Emma Johnson", role: "Textile Expert", experience: "8+ years", avatar: "EJ" },
    { id: 3, name: "Michael Brown", role: "Pattern Maker", experience: "12+ years", avatar: "MB" },
    { id: 4, name: "Sarah Williams", role: "Fashion Illustrator", experience: "6+ years", avatar: "SW" }
];

function CommunitySection({ active }) {
    if (!active) return null;

    return (
        <div className="content-section active">
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
                        {sampleCommunity.map((member) => (
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
    );
}

export default memo(CommunitySection);
