import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Headers from "./components/Headers";


function App() {
  return (
    <Router>
      <div className="container">
        <Headers />
      </div>
    </Router>
  );
}

export default App;
