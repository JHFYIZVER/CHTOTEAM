import React from "react";
import { Route, Routes } from "react-router-dom";
import { authRouts, privateRoutes, publicRoutes } from "../../routs";

const AppRouter = () => {
  const isAuth: boolean = false;
  return (
    <>
      <Routes>
        {isAuth &&
          authRouts.map(({ path: path, Component: Component }) => {
            return <Route key={path} path={path} element={<Component />} />;
          })}
        {publicRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
    </>
  );
};

export default AppRouter;
