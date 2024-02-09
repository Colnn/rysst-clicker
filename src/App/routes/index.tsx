import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../../Game';
import Donut from '../../Donut';

export default function RoutesProvider() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="" Component={Home} />
          <Route path="/donut" Component={Donut} />
        </Routes>
      </div>
    </Router>
  );
}
