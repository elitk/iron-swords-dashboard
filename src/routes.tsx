import Home from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import React from "react";

interface RouteConfig {
  path: string;
  component: React.FC;
}

const routeConfig: RouteConfig[] = [
  { path: "/", component: Home },
  { path: "/dashboard", component: Dashboard },
];

export default routeConfig;
