import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Headers from "./components/Headers";


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="container">
          <Headers />
          <Routes>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
