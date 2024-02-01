import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../../home";
import Test from "../../test";

export default function RoutesProvider() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='' Component={Home} />
                    <Route path='/test' Component={Test} />
                </Routes>
            </div>
        </Router>
    )
}