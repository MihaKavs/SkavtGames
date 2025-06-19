/**
 * AppRouter component sets up the main routing structure for the application using React Router.
 *
 * - `/login`: Renders the Login component.
 * - `/dashboard`: Renders the App component wrapped in PrivateRoute, restricting access to authenticated users.
 * - `/site/:site`: Renders the App component for a specific site parameter.
 * - `/`: Renders the App component as the default route.
 *
 * @component
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/games/:game" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
