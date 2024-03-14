import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import routeConfig from "./routes";

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {routeConfig.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={React.createElement(route.component)}
            />
          ))}
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
