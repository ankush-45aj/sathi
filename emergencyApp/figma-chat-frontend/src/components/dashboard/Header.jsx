import { memo } from "react";

function Header({
    user,
    activeSection,
    menuList,
    notificationCount,
    onNotificationClick,
    onProfileClick,
}) {
    const title = menuList.find((m) => m.key === activeSection)?.label || "Dashboard";
    return (
        <div className="header">
            <h2>{title}</h2>
            <div className="header-actions">
                <button className="icon-button" onClick={onNotificationClick} aria-label="Notifications">
                    <i className="fas fa-bell"></i>
                    {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
                </button>

                <div className="user-info" onClick={onProfileClick} role="button">
                    <img src={user?.avatar} alt="User" />
                    <span>{user?.name}</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
        </div>
    );
}

export default memo(Header);
