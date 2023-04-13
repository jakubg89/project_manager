import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'

import Login from './pages/Login'
import Register from './pages/Register'

import ProjectList from './pages/ProjectList'
import CreateProject from './pages/CreateProject'
import ProjectDetails from './pages/ProjectDetails'


import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">

          <Routes>
            <Route path="/" element={
                        <PrivateRoute>
                          <ProjectList />
                        </PrivateRoute>
            } />
            <Route path="/create-project" element={
                        <PrivateRoute>
                          <CreateProject />
                        </PrivateRoute>
            } />

            <Route path="/project-details" element={
                        <PrivateRoute>
                          <ProjectDetails />
                        </PrivateRoute>
            } />

            <Route path="/login" element={<Login />}/>
            <Route path='/register' element={<Register />} />

          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
