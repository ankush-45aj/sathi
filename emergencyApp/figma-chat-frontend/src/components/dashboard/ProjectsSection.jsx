import { memo } from "react";

const sampleProjects = [
    { id: 1, name: "Summer Collection", description: "Designing a new summer clothing line with sustainable materials.", progress: 75 },
    { id: 2, name: "Winter Jackets", description: "Premium winter outerwear collection for extreme conditions.", progress: 40 },
    { id: 3, name: "Accessories Line", description: "Complementary accessories for the main collections.", progress: 20 },
    { id: 4, name: "Eco-Friendly Sportswear", description: "Sustainable activewear made from recycled materials.", progress: 90 }
];

function ProjectsSection({ active }) {
    if (!active) return null;

    return (
        <div className="content-section active">
            <div className="card">
                <div className="card-header">
                    <h3>My Projects</h3>
                    <button className="btn btn-primary"><i className="fas fa-plus"></i> New Project</button>
                </div>

                <div className="projects-grid">
                    {sampleProjects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="project-header">
                                <div className="project-icon" style={{ backgroundColor: "#7165E3" }}>
                                    <i className="fas fa-project-diagram"></i>
                                </div>
                                <div className="project-actions">
                                    <button className="icon-button small" aria-label="Project actions">
                                        <i className="fas fa-ellipsis-v"></i>
                                    </button>
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
    );
}

export default memo(ProjectsSection);
