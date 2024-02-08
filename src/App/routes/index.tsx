import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../../Game';

export default function RoutesProvider() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="" Component={Home} />
        </Routes>
      </div>
    </Router>
  );
}
