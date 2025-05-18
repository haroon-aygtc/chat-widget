import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import WidgetManagement from "./components/widgets/WidgetManagement";
import UserManagement from "./components/user-management/UserManagement";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/widgets" element={<WidgetManagement />} />
          <Route path="/ai-models" element={<Home />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/analytics" element={<Home />} />
          <Route path="/settings" element={<Home />} />

          {/* Add this before any catchall route */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
