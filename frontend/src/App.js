import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'

import Headers from "./components/Headers"

import Login from './pages/Login'
import Register from './pages/Register'
// import HomePage from './pages/HomePage'
import ProjectList from './pages/ProjectList'


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
            <Route path="/login" element={<Login />}/>
            <Route path='/register' element={<Register />} />

          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
