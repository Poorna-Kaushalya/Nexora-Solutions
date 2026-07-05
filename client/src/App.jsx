import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";

import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-project" element={<AddProject />} />
      </Routes>
    </HashRouter>
  );
}

export default App;