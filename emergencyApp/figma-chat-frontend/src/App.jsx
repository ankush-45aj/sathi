import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Loading wrapper to prevent flashing
function LoadingWrapper({ children }) {
  const { loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return children;
}

// Protected route
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

// Public route (redirect logged-in users)
function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/dashboard" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoadingWrapper>
          <Routes>
            <Route
              path="/login"
              element={<PublicRoute><Login /></PublicRoute>}
            />
            <Route
              path="/register"
              element={<PublicRoute><Register /></PublicRoute>}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </LoadingWrapper>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
