import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import MyTrips from "./pages/MyTrips";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import ItineraryView from "./pages/ItineraryView";
import CitySearch from "./pages/CitySearch";
import ActivitySearch from "./pages/ActivitySearch";
import Budget from "./pages/Budget";
import Packing from "./pages/Packing";
import SharedItinerary from "./pages/SharedItinerary";
import Profile from "./pages/Profile";
import Journal from "./pages/Journal";

import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Box minH="100vh" bg="bg">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-trip" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
          <Route path="/trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
          <Route path="/itinerary-builder" element={<ProtectedRoute><ItineraryBuilder /></ProtectedRoute>} />
          <Route path="/itinerary-view" element={<ProtectedRoute><ItineraryView /></ProtectedRoute>} />
          <Route path="/cities" element={<ProtectedRoute><CitySearch /></ProtectedRoute>} />
          <Route path="/activities" element={<ProtectedRoute><ActivitySearch /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
          <Route path="/packing" element={<ProtectedRoute><Packing /></ProtectedRoute>} />
          <Route path="/shared-itinerary" element={<ProtectedRoute><SharedItinerary /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Box>
    </Layout>
  );
}

export default App;
