import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { currentUser, isLoading } = useAuth();

    // Show loading state while checking authentication
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return currentUser ? children : null;
};

export default PrivateRoute;