import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import routeConfig from "./routes";
import { AlarmsProvider, } from "./context/AlarmsContext";

const App: React.FC = () => {
  return (
    <AlarmsProvider>
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
    </AlarmsProvider>
  );
};

export default App;
