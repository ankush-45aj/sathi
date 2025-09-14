import { memo } from "react";

function SettingsSection({ active, darkMode, setDarkMode }) {
    if (!active) return null;

    return (
        <div className="content-section active">
            <div className="card">
                <div className="card-header"><h3>Application Settings</h3></div>

                <div className="card-content">
                    {/* Appearance */}
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
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Notifications */}
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

                    {/* Privacy & Security */}
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
    );
}

export default memo(SettingsSection);
