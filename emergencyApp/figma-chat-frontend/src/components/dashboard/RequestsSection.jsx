import { memo } from "react";

const sampleRequests = [
    { id: "REQ-7842", type: "Design Consultation", status: "Completed", date: "Oct 12, 2023" },
    { id: "REQ-7843", type: "Pattern Making", status: "In Progress", date: "Oct 14, 2023" },
    { id: "REQ-7844", type: "Fabric Sourcing", status: "Pending", date: "Oct 15, 2023" },
    { id: "REQ-7845", type: "Custom Fitting", status: "Scheduled", date: "Oct 16, 2023" }
];

function RequestsSection({ active }) {
    if (!active) return null;

    return (
        <div className="content-section active">
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
                            {sampleRequests.map((request) => (
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
    );
}

export default memo(RequestsSection);
