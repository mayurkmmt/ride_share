import { Route, Routes } from "react-router";
import DashBoard from "../pages/Dashboard";
import Login from "../pages/Login";
import DefaultLayout from "../layout/DefaultLayout";
import SplashScreen from "../pages/SplashScreen";
import ProtectedRoute from "../layout/ProtectedRoute";

const RoutesList = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route element={<ProtectedRoute authRequired={false} />}>
          <Route index element={<SplashScreen />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashBoard />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <main className="bg-theme h-full">
            <h1 className="text-3xl">404 Not Found</h1>
          </main>
        }
      />
    </Routes>
  );
};

export default RoutesList;
