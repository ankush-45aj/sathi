import { memo } from "react";

function Sidebar({
    user,
    activeSection,
    menuList,
    mobileMenuOpen,
    onMenuClick,
    onClose,
}) {
    return (
        <div className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <div className="logo">
                <i className="fas fa-cut"></i>
                <h1>𝓢𝓪𝓽𝓱𝓲 ✨</h1>
                <button className="close-menu" onClick={onClose} aria-label="Close">
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="menu-items">
                {menuList.map((item) => (
                    <div
                        key={item.key}
                        className={`menu-item${activeSection === item.key ? " active" : ""}`}
                        onClick={() => onMenuClick(item.key)}
                    >
                        <i className={`fas ${item.icon}`}></i>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="sidebar-footer">
                <div
                    className={`menu-item${activeSection === "profile" ? " active" : ""}`}
                    onClick={() => onMenuClick("profile")}
                >
                    <img src={user?.avatar} alt="User" className="user-avatar" />
                    <div className="user-details">
                        <span className="user-name">{user?.name}</span>
                        <span className="user-role">{user?.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Sidebar);
