import { useEffect, useState } from "react";
import "./Dashboard.css";
import ayushAvatar from "./ayush.jpg";

import MobileHeader from "../components/dashboard/MobileHeader";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import DashboardSection from "../components/dashboard/DashboardSection";
import ProjectsSection from "../components/dashboard/ProjectsSection";
import RequestsSection from "../components/dashboard/RequestsSection";
import CommunitySection from "../components/dashboard/CommunitySection";
import ProfileSection from "../components/dashboard/ProfileSection";
import SettingsSection from "../components/dashboard/SettingsSection";
import SupportSection from "../components/dashboard/SupportSection";

const menuList = [
    { key: "dashboard", icon: "fa-home", label: "Dashboard" },
    { key: "projects", icon: "fa-project-diagram", label: "Projects" },
    { key: "requests", icon: "fa-clipboard-list", label: "Requests" },
    { key: "community", icon: "fa-user-friends", label: "Community" },
    { key: "profile", icon: "fa-user", label: "Profile" },
    { key: "settings", icon: "fa-cog", label: "Settings" },
    { key: "support", icon: "fa-question-circle", label: "Help & Support" },
];

function Dashboard() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [activeSection, setActiveSection] = useState("dashboard");
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found ❌");
            return;
        }
        setTimeout(() => {
            setUser({
                name: "Aayush gore",
                email: "alex.johnson@example.com",
                avatar: ayushAvatar,
                _id: "user-12345",
                location: "New York, USA",
                role: "Professional Fashion Designer",
                bio: "Specialized in sustainable fashion and modern designs with 8 years of industry experience.",
            });
        }, 1000);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        return () => document.body.classList.remove("dark-mode");
    }, [darkMode]);

    const handleMenuClick = (key) => {
        setActiveSection(key);
        setMobileMenuOpen(false);
    };

    const handleNotificationClick = () => {
        setNotificationCount(0);
    };

    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    if (!user) return <div className="loading-spinner">Loading...</div>;

    return (
        <div className="container">
            <MobileHeader
                user={user}
                notificationCount={notificationCount}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                onNotificationClick={handleNotificationClick}
                onProfileClick={() => handleMenuClick("profile")}
            />

            {mobileMenuOpen && <div className="overlay" onClick={() => setMobileMenuOpen(false)}></div>}

            <Sidebar
                user={user}
                activeSection={activeSection}
                menuList={menuList}
                mobileMenuOpen={mobileMenuOpen}
                onMenuClick={handleMenuClick}
                onClose={() => setMobileMenuOpen(false)}
            />

            <div className="main-content">
                <Header
                    user={user}
                    activeSection={activeSection}
                    menuList={menuList}
                    notificationCount={notificationCount}
                    onNotificationClick={handleNotificationClick}
                    onProfileClick={() => handleMenuClick("profile")}
                />

                <DashboardSection active={activeSection === "dashboard"} />
                <ProjectsSection active={activeSection === "projects"} />
                <RequestsSection active={activeSection === "requests"} />
                <CommunitySection active={activeSection === "community"} />
                <ProfileSection active={activeSection === "profile"} user={user} />
                <SettingsSection active={activeSection === "settings"} darkMode={darkMode} setDarkMode={setDarkMode} />
                <SupportSection active={activeSection === "support"} />
            </div>
        </div>
    );
}

export default Dashboard;
