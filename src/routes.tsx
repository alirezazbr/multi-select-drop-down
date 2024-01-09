import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Landing = lazy(() => import("./pages/Landing/Landing"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

export default AppRoutes;
