import { useState, memo } from "react";

const faqItems = [
    { id: 1, question: "How do I create a new project?", answer: "Go to the Projects section and click on the 'New Project' button. Fill in the required details and submit." },
    { id: 2, question: "How can I connect with other community members?", answer: "Visit the Community section to browse members and use the 'Connect' button to send connection requests." },
    { id: 3, question: "What types of requests can I make?", answer: "You can request design consultations, pattern making, fabric sourcing, fittings, and more from our experts." },
    { id: 4, question: "How do I update my profile information?", answer: "Navigate to your Profile section and click the 'Edit Profile' button to modify your details." }
];

function SupportSection({ active }) {
    const [activeFAQ, setActiveFAQ] = useState(null);
    const toggleFAQ = (id) => setActiveFAQ(activeFAQ === id ? null : id);

    if (!active) return null;

    return (
        <div className="content-section active">
            <div className="card">
                <div className="card-header"><h3>Help & Support</h3></div>

                <div className="card-content">
                    {/* FAQ */}
                    <div className="section">
                        <div className="section-title">
                            <i className="fas fa-question-circle"></i>
                            <span>Frequently Asked Questions</span>
                        </div>

                        <div className="faq-list">
                            {faqItems.map((faq) => (
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

                    {/* Contact */}
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
    );
}

export default memo(SupportSection);

