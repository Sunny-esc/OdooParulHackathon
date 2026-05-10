import { Routes, Route } from "react-router-dom";
import { useContext } from "react"; // Added this
import { AuthContext } from "./context/AuthContext"; // Added this

import Login from "./auth/login";
import Register from "./auth/register";

import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "../components/NavBar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <h2 className="text-lg text-indigo-600 mt-2">
          Hello, {user?.username || "User"}!
        </h2>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar must be OUTSIDE Routes */}
      <Navbar />

      <main className="container mx-auto">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Optional: Redirect root to login */}
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;