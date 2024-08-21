import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/LoginPage';
import Signup from './pages/SignUpPage/SignUpPage';
import Welcome from './pages/WelcomePage/WelcomePage';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/welcome"
          element={
            <PrivateRoute>
              <Welcome />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;