import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileRegistration from './profileRegistration';
import ProfileOption from './profileOption';
import Dashboard from './dashboard';
import DeleteProfile from './deleteProfile';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <div style={{ height: '100vh'}}>
      <Routes>
        <Route path="/" element={<ProfileRegistration />} />
        <Route path="/profileOption" element={<ProfileOption />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deleteProfile" element={<DeleteProfile />} />
      </Routes>
    </div>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
