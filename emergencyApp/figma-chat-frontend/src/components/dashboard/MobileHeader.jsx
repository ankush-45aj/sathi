import { memo } from "react";

function MobileHeader({
    user,
    notificationCount,
    mobileMenuOpen,
    setMobileMenuOpen,
    onNotificationClick,
    onProfileClick,
}) {
    return (
        <div className="mobile-header">
            <button
                className="menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>

            <div className="mobile-logo">
                <i className="fas fa-cut"></i>
                <span>𝓢𝓪𝓽𝓱𝓲 ✨</span>
            </div>

            <div className="mobile-actions">
                <button className="icon-button" onClick={onNotificationClick} aria-label="Notifications">
                    <i className="fas fa-bell"></i>
                    {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
                </button>

                <div className="mobile-user" onClick={onProfileClick} role="button">
                    <img src={user?.avatar} alt="User" />
                </div>
            </div>
        </div>
    );
}

export default memo(MobileHeader);
