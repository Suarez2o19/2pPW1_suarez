import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Jonas from "./pages/Jonas";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import John from "./pages/John";
import Menu from "./pages/Menu";
import Paises from "./pages/Paises";
import Ciudades from "./pages/Ciudades";
import ReporteCiudadesPorPais from "./pages/CiudadesPorPais";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />, // Agrupa rutas protegidas
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/jonas",
        element: <Jonas />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/menu/Paises",
        element: <Paises />,
      },
      {
        path: "/menu/Ciudades",
        element: <Ciudades />,
      },
      {
        path: "/menu/Reportes",
        element: <ReporteCiudadesPorPais />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
