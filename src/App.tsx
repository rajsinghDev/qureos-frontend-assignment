import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FilterPage from "./pages/filter";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FilterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
